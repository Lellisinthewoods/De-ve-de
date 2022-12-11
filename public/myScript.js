// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

console.log(app, db);

let movieTitle = document.querySelector(`#movieTitle`);
let movieGenre = document.querySelector(`#movieGenre`);
let movieDate = document.querySelector(`#movieDate`);
let saveBTN = document.querySelector(`#saveButton`);

saveBTN.addEventListener(`click`, ()=>{
    saveToDataBase(movieTitle.value, movieGenre.value, movieDate.value)
})

async function saveToDataBase(movieTitle, movieGenre, movieDate) {
    await addDoc(collection(db, 'DE-VE-DE-DB'), { // Lägger till en ny todo i vår databas i vår collection todos
        title: movieTitle,
        genre: movieGenre,
        released: movieDate
    });
}