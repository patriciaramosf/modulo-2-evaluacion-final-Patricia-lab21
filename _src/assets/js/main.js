'use strict';
const listFav = document.querySelector('.listFav');
const listMovies = document.querySelector('.listMovies');
const input = document.querySelector('.input');
const buttonMaria = document.querySelector('.button');
const baseUrl = `http://api.tvmaze.com/search/shows?q=`;
let totalMovies = null;
let selectedMovies = readLocalStorage();

function startPage(){
    fetch(baseUrl+input.value)
    .then(response => response.json())
    .then(data => {
        totalMovies = data;
        printFilms(totalMovies);
      });
}

function printFilms(arr){
    listMovies.innerHTML='';
    for(let movie of arr){
        if(movie.show.image===null){
            listMovies.innerHTML += `<li class ="myLi normalColor" id=${movie.show.id}><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"><span class="spanLi"></span><h3 class="titleMovie">${movie.show.name}</h3></li>`
        }else{
            listMovies.innerHTML += `<li class ="myLi normalColor" id=${movie.show.id}><img src=${movie.show.image.medium}><span class="spanLi"><h3 class="titleMovie">${movie.show.name}</h3></li>`
        }
        }
        addListeners()  
    }
/* Encontrar listeners para añadir favoritos */
function addListeners(){
    const totalLis = document.querySelectorAll('.myLi');
    for(let li of totalLis){
        li.addEventListener('click', addFavs);
    }
}
/* Guardar en favoritos con cada click */
function addFavs(event){
    event.currentTarget.classList.remove('normalColor');
    event.currentTarget.classList.add('favColor');
    const currentLi = event.currentTarget.id
    const object = getFavouriteObject(currentLi);
    if(selectedMovies.indexOf(currentLi)=== -1){
        selectedMovies.push(object.show);
        setLocalStorage();
        printFavourites(selectedMovies);
    }else{
        alert('This film is alredy your favourite');
    }

}


/* save in LocalStorage */
function setLocalStorage(favourites){
    localStorage.setItem('myFavourites', JSON.stringify(selectedMovies));
}

/* red my LocalStorage, lee los valores que haya dentro de mi array */
function readLocalStorage(){
    let localFavourites = JSON.parse(localStorage.getItem('myFavourites'));
    if(localFavourites !== null){
        return localFavourites;
    }else{
    return localFavourites = [];
}
}
function getFavouriteObject(id){
    return totalMovies.find(movie => movie.show.id === parseInt(id))

}

function printFavourites(arrFav){
    listFav.innerHTML = '';
    for(let myFav of arrFav){
        listFav.innerHTML+= `<li class ="myFavouriteLi" id=${myFav.id}><img src=${myFav.image.medium}><span class="spanFavouriteLi"><h3 class="titleMovieFavourite">${myFav.name}</h3></li>`
    }
}


button.addEventListener('click', startPage);

