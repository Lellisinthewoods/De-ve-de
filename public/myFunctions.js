import { collection, addDoc, getDocs, deleteDoc, doc, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

/*this module contains my own functions and the variables they need to work.
there are 6 functions. if I were to add more functions, I would add another module 
and divide between the functions that call firestore and the functions that don't.
This way I don't need to call firebase functions in every module.*/

let movielistSection = document.querySelector(`#movielist`); //ul-element in HTML (in section)
let articleElem = document.querySelector(`article`); //article-element in HTML
let mainElem = document.querySelector(`main`); //main-element in HTML
let navElem = document.querySelector(`nav`); //nav-element in HTML
let foundMovie; //ul-area in HTML that gets defined in the searchSectionFunction.

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
        <button ID="deleteButton${movieIndex}">Sett!</button><br>`;
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

async function deleteMovieFunction(movieID, movieData, db){ //deleted movies from database
    await deleteDoc(doc(db, 'DE-VE-DE-DB', movieID));
    addMovieToWatched(movieData, db)
    seeMovielistFunction(db, `DE-VE-DE-DB`);
}

function searchSectionFunction(db) { //displays the section where the user can search for saved movies
    navElem.style.display=`none`;
    mainElem.style.display=`none`;
    articleElem.innerHTML=`
    <p>Du kan enbart söka på sparade filmer</p><br>
    <input ID="searchMovieInput" type="text" placeholder="Sök med titel...">
    <button ID="searchMovieButton">Sök!</button>
    <ul ID="foundMovie"></ul>
    `;
    let searchMovieInput = document.querySelector(`#searchMovieInput`)
    let searchMovieButton = document.querySelector(`#searchMovieButton`)
    foundMovie = document.querySelector(`#foundMovie`);
    searchMovieButton.addEventListener(`click`,()=>{
        let usermovie = (searchMovieInput.value.toUpperCase());
        searchMovielistFunction(usermovie, db);
    })
}

async function searchMovielistFunction(usermovie, db){ //searches through the database with saved movies
    const movielist = await getDocs(collection(db,`DE-VE-DE-DB`));
    let movieBool = true;
    movielist.forEach(movie => {
        let currentmovie = movie.data().title.toUpperCase();
        console.log(currentmovie)
        if((usermovie == currentmovie) && (movieBool == true))
        {
            foundMovie.innerHTML = `
            <li>${currentmovie}</li>
            <li>${movie.data().genre}</li>
            <li>${movie.data().released}</li>
            `;
            movieBool = false;
        }
        else if (movieBool == true)
        {
            foundMovie.innerHTML = `Filmen "${usermovie}" hittades inte.`;
        }
    });
}

export{saveToDataBase, seeMovielistFunction, searchSectionFunction}
