import {query, collection, where, getDocs} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"; //importera från firebase

/*This module contains the sections I use to let the user search for movie titles.
searchSectionFunction gives us the look of the search-page, including the input-area and button.
searchMovielistFunction searches for the movie and displays the result on the website.
These functions are largely independent from the other functions, which is why I put them
in the same module. 
The downside to this is that some of the variables used below are defined twice, once in this module
and once in the module "myFunctions".*/

let articleElem = document.querySelector(`article`); //article-element in HTML
let foundMovie; //ul-area in HTML. Gets defined in the searchSectionFunction.
let mainElem = document.querySelector(`main`); //main-element in HTML
let navElem = document.querySelector(`nav`); //nav-element in HTML

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

    foundMovie.innerHTML='';
    const movielistQuery = query(collection(db, 'DE-VE-DE-DB'), where('title', '==', usermovie));
    console.log(movielistQuery)

    const result = await getDocs(movielistQuery);
    console.log(result)
    let resultMovie = {};
    let resultMovieList = [];
    result.forEach((movie) => {
        resultMovie = (movie.data());
        resultMovieList.push(resultMovie)
    })

    if((resultMovie.title==undefined)){
        foundMovie.innerHTML = `Filmen "${usermovie}" hittades inte.`;
    }
    else 
    {
        for (let i = 0; i < resultMovieList.length; i++) 
        {
            console.log(resultMovieList[i].genre)
            let foundMovieElem = `
            <li>${resultMovieList[i].title}</li>
            <li>${resultMovieList[i].genre}</li>
            <li>${resultMovieList[i].released}</li><br>
            `;
            foundMovie.insertAdjacentHTML(`beforeend`, foundMovieElem);
        }
    }
}

export { searchSectionFunction };