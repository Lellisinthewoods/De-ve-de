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
let movielistBTN = document.querySelector(`#movielistButton`);
let movielistSection = document.querySelector(`#movielist`);

saveBTN.addEventListener(`click`, ()=>{
    saveToDataBase(movieTitle.value, movieGenre.value, movieDate.value)
})

movielistBTN.addEventListener(`click`, ()=>{
    movielistFunction();
})

async function saveToDataBase(movieTitle, movieGenre, movieDate) {
    await addDoc(collection(db, 'DE-VE-DE-DB'), {
        title: movieTitle,
        genre: movieGenre,
        released: movieDate
    });
}

async function movielistFunction(){
    movielistSection.innerHTML='';
    const movielist = await getDocs(collection(db,'DE-VE-DE-DB'));
    let movieIndex = 0;
    movielist.forEach(movie => {
        console.log(movie.id)
        console.log(movie.data().title)
        const listElem = `
        <li>${movie.data().title}</li>
        <li>${movie.data().genre}</li>
        <li>${movie.data().released}</li>
        <button ID="deleteButton${movieIndex}">Ta bort film</button><br>`;
        movielistSection.insertAdjacentHTML(`beforeend`, listElem);
        let deleteBTNS = document.querySelectorAll(`#deleteButton${movieIndex}`);
        deleteBTNS.forEach(btn => {
            btn.addEventListener(`click`, () =>{
                deleteMovieFunction(movie.id);
            })
        })
        movieIndex++;
    });
}

async function deleteMovieFunction(movieID){
    console.log(movieID);
    await deleteDoc(doc(db, 'DE-VE-DE-DB', movieID));
    movielistFunction();
}