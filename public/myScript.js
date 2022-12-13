// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { seeMovielistFunction, saveToDataBase } from "./myFunctions.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzQd55qHikQyVvg_6O8bdI2pimvWIH0JU",
    authDomain: "de-ve-de-f3dce.firebaseapp.com",
    projectId: "de-ve-de-f3dce",
    storageBucket: "de-ve-de-f3dce.appspot.com",
    messagingSenderId: "526174611407",
    appId: "1:526174611407:web:0eef41332a0845deeb54ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let movieTitle = document.querySelector(`#movieTitle`); //input
let movieGenre = document.querySelector(`#movieGenre`); //input
let movieDate = document.querySelector(`#movieDate`); //input
let saveBTN = document.querySelector(`#saveButton`); //button
let movielistBTN = document.querySelector(`#movielistButton`); //button
let deletedMovielistBTN = document.querySelector(`#deletedMovielistButton`); //button
let searchSectionButton = document.querySelector(`#searchSectionButton`); //button
let articleElem = document.querySelector(`article`); //article-element in HTML
let mainElem = document.querySelector(`main`); //main-element in HTML
let foundMovie;
//lägg in articleFooter och en tillbaka-länk!

saveBTN.addEventListener(`click`, ()=>{
    saveToDataBase(movieTitle.value, movieGenre.value, movieDate.value, db)
})

movielistBTN.addEventListener(`click`, ()=>{
    seeMovielistFunction(db, `DE-VE-DE-DB`);
})

deletedMovielistBTN.addEventListener(`click`, ()=>{
    seeMovielistFunction(db, `MOVIES`);
})

searchSectionButton.addEventListener(`click`, ()=>{
    console.log(`du vill söka efter en film!`)
    searchSectionFunction();
})

function searchSectionFunction() {
    mainElem.style.display=`none`;
    articleElem.innerHTML=`
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
        searchMovielistFunction(usermovie);
    })
    //sökfunktionen går igenom SPARADE FILMER dvs DE-VE-DE-DB
}

async function searchMovielistFunction(usermovie){
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







