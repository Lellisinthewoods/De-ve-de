import { collection, addDoc, getDocs, deleteDoc, doc, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

function myHello(){
    console.log("Vad fin du är idag!")
}

async function movielistFunction(db){
    let movielistSection = document.querySelector(`#movielist`);
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
        <button ID="deleteButton${movieIndex}">Sett!</button><br>`;
        movielistSection.insertAdjacentHTML(`beforeend`, listElem);
        let deleteBTNS = document.querySelectorAll(`#deleteButton${movieIndex}`);
        deleteBTNS.forEach(btn => {
            btn.addEventListener(`click`, () =>{
                console.log(btn)
                deleteMovieFunction(movie.id, movie.data(), db);
            })
        })
        movieIndex++;
    });
}

async function addMovieToWatched(movieData, db){
    console.log(movieData);
    let movieTitle = movieData.title;
    let movieGenre = movieData.genre;
    let movieDate = movieData.released;
    debugger;
    await addDoc(collection(db, 'MOVIES'),{
        title: movieTitle,
        genre: movieGenre,
        released: movieDate
    });
}

async function deleteMovieFunction(movieID, movieData, db){
    await deleteDoc(doc(db, 'DE-VE-DE-DB', movieID));
    addMovieToWatched(movieData, db)
    movielistFunction(db);
}

export{myHello, movielistFunction}
