import { collection, addDoc, getDocs, deleteDoc, doc, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

let movielistSection = document.querySelector(`#movielist`);

async function saveToDataBase(movieTitle, movieGenre, movieDate, db) {
    await addDoc(collection(db, 'DE-VE-DE-DB'), {
        title: movieTitle,
        genre: movieGenre,
        released: movieDate
    });
}

async function seeMovielistFunction(db, chooseCollection){
    movielistSection.innerHTML='';
    const movielist = await getDocs(collection(db,`${chooseCollection}`));
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

export{saveToDataBase, seeMovielistFunction}
