import { collection, addDoc, getDocs, deleteDoc, doc, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

let movielistSection = document.querySelector(`#movielist`); //ul-element in HTML (in section)
let articleElem = document.querySelector(`article`); //article-element in HTML
let mainElem = document.querySelector(`main`); //main-element in HTML
let navElem = document.querySelector(`nav`); //nav-element in HTML
let foundMovie;

async function saveToDataBase(movieTitle, movieGenre, movieDate, db) {
    await addDoc(collection(db, 'DE-VE-DE-DB'), {
        title: movieTitle,
        genre: movieGenre,
        released: movieDate
    });
}

async function seeMovielistFunction(db, chooseCollection){
    navElem.style.display="none";
    mainElem.style.display="none";
    movielistSection.style.display="flex";
    movielistSection.innerHTML='';
    let movieIndex = 0;
    const movielist = await getDocs(collection(db,`${chooseCollection}`));
    movielist.forEach(movie => {
        console.log(movie.id)
        console.log(movie.data().title)
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

async function addMovieToWatched(movieData, db){
    console.log(movieData);
    let movieTitle = movieData.title;
    let movieGenre = movieData.genre;
    let movieDate = movieData.released;
    await addDoc(collection(db, 'MOVIES'),{
        title: movieTitle,
        genre: movieGenre,
        released: movieDate
    });
}

async function deleteMovieFunction(movieID, movieData, db){
    await deleteDoc(doc(db, 'DE-VE-DE-DB', movieID));
    addMovieToWatched(movieData, db)
    seeMovielistFunction(db);
}

function searchSectionFunction(db) {
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
        console.log(usermovie)
        console.log("Du söker efter en film!")
        searchMovielistFunction(usermovie, db);
    })
}

async function searchMovielistFunction(usermovie, db){
    const movielist = await getDocs(collection(db,`DE-VE-DE-DB`));
    let movieBool = true;
    movielist.forEach(movie => {
        let currentmovie = movie.data().title.toUpperCase();
        console.log(currentmovie)
        if((usermovie == currentmovie) && (movieBool == true))
        {
            console.log(movie.data())
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
