// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { seeMovielistFunction, saveToDataBase, } from "./myFunctions.js";
import { searchSectionFunction } from "./mySearchFunctions.js";

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

/*this module contains the main contact with the HTML document (aka the start-page). 
The click events call functions from the modules containing the functions.
This makes my code easier to read and manage at first glance.*/

let movieTitle = document.querySelector(`#movieTitle`); //input
let movieGenre = document.querySelector(`#movieGenre`); //input
let movieDate = document.querySelector(`#movieDate`); //input
let saveBTN = document.querySelector(`#saveButton`); //button
let movielistBTN = document.querySelector(`#movielistButton`); //button
let deletedMovielistBTN = document.querySelector(`#deletedMovielistButton`); //button
let searchSectionButton = document.querySelector(`#searchSectionButton`); //button
let movieSavedText = document.querySelector(`#movieSavedText`) //text underneath save button

saveBTN.addEventListener(`click`, ()=>{
    saveToDataBase(movieTitle.value.toUpperCase(), movieGenre.value, movieDate.value, db)
    movieSavedText.style.display=`flex`;
    movieSavedText.innerText =`${movieTitle.value} sparades!`;
})

movielistBTN.addEventListener(`click`, ()=>{
    seeMovielistFunction(db, `DE-VE-DE-DB`);
})

deletedMovielistBTN.addEventListener(`click`, ()=>{
    seeMovielistFunction(db, `MOVIES`);
})

searchSectionButton.addEventListener(`click`, ()=>{
    searchSectionFunction(db);
})









