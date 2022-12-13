// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { seeMovielistFunction, saveToDataBase, searchSectionFunction } from "./myFunctions.js";

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
    searchSectionFunction(db);
})









