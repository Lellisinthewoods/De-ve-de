import { collection, addDoc, getDocs, deleteDoc, doc, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

/*this module contains the basic functions (save, delete, & display movies, plus 
add-to-deleted-movies) of my code and the variables they use.
The functions I use for the website's Search-page are in the module "mySearchFunctions".
This is because this is an added feature to the original site, and the two functions it contains
work independently from the functions below.*/

let movielistSection = document.querySelector(`#movielist`); //ul-element in HTML (in section)
let mainElem = document.querySelector(`main`); //main-element in HTML
let navElem = document.querySelector(`nav`); //nav-element in HTML

async function saveToDataBase(movieTitle, movieGenre, movieDate, db) { //saves user input to database
    await addDoc(collection(db, 'DE-VE-DE-DB'), {
        title: movieTitle,
        genre: movieGenre,
        released: movieDate
    });
}

async function seeMovielistFunction(db, chooseCollection){ //displays movie list from database
    navElem.style.display="none";
    mainElem.style.display="none";
    movielistSection.style.display="flex";
    movielistSection.innerHTML='';
    let movieIndex = 0;
    const movielist = await getDocs(collection(db,`${chooseCollection}`));
    movielist.forEach(movie => {
        const listElem = `
        <li>${movie.data().title.toUpperCase()}</li>
        <li>${movie.data().genre}</li>
        <li>${movie.data().released}</li>
        <button ID="deleteButton${movieIndex}">Ta bort!</button><br>`;
        movielistSection.insertAdjacentHTML(`beforeend`, listElem);
        let deleteBTNS = document.querySelectorAll(`#deleteButton${movieIndex}`);
        if(chooseCollection == `DE-VE-DE-DB`)
        {
        deleteBTNS.forEach(btn => {
            btn.addEventListener(`click`, () =>{
                console.log(btn)
                deleteMovieFunction(movie.id, movie.data(), db);
            })
        })
        movieIndex++;
    }
        else{
            deleteBTNS.forEach(btn => {
                btn.style.display='none';
            })
        }

    });
}

async function deleteMovieFunction(movieID, movieData, db){ //deletes movies from database
    await deleteDoc(doc(db, 'DE-VE-DE-DB', movieID));
    addMovieToWatched(movieData, db)
    seeMovielistFunction(db, `DE-VE-DE-DB`);
}

async function addMovieToWatched(movieData, db){ //adds deleted movies to new collection
    let movieTitle = movieData.title;
    let movieGenre = movieData.genre;
    let movieDate = movieData.released;
    await addDoc(collection(db, 'MOVIES'),{
        title: movieTitle,
        genre: movieGenre,
        released: movieDate
    });
}

export{saveToDataBase, seeMovielistFunction }
