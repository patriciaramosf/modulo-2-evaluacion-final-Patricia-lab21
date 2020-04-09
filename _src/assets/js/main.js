'use strict';
const asideFav= document.querySelector('.aside_favourites');
const listFav = document.querySelector('.listFav');
const listMovies = document.querySelector('.listMovies');
const input = document.querySelector('.input');
const button = document.querySelector('.button');
const baseUrl = `https://api.tvmaze.com/search/shows?q=`;
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
        addListeners() 
        }
        
    }
/* Encontrar listeners para añadir favoritos */
function addListeners(){
    const totalLis = document.querySelectorAll('.myLi');
    for(let li of totalLis){
        li.addEventListener('click', addFavs);
    }
}

/* save in LocalStorage */
function setLocalStorage(){
    localStorage.setItem('myFavourites', JSON.stringify(selectedMovies));
}

/* red my LocalStorage, lee los valores que haya dentro de mi array */
function readLocalStorage(){
    let localFavourites = JSON.parse(localStorage.getItem('myFavourites'));
    if(localFavourites !== null){
        return localFavourites;
    }else{
    return localFavourites = [];/* para que no aparezca mi lista de favoritos mal, mejor que salga vacía */
}
}

function getFavouriteObject(id){
    return totalMovies.find(movie => movie.show.id === parseInt(id))

}

/* Guardar en favoritos con cada click */
function addFavs(event){
    event.currentTarget.classList.remove('normalColor');
    event.currentTarget.classList.add('favColor');
    const currentLi = event.currentTarget.id
    const object = getFavouriteObject(currentLi);
    if(selectedMovies.indexOf(object.show)=== -1){ /* indexOf(currentLi */
        selectedMovies.push(object.show);
        setLocalStorage();
        printFavourites(selectedMovies);
        console.log(selectedMovies)
     }else{
        alert('This film is alredy your favourite');
        
    }

}


function printFavourites(arr){
    listFav.innerHTML = '';
    for(let myFav of arr){
        if(myFav.image!==null){
        listFav.innerHTML+= `<li class ="myFavouriteLi" id=${myFav.id}><img src=${myFav.image.medium}><span class="spanFavouriteLi"></span><button type="button" class="button__remove">Borrar</button><span class="spanFavouriteLi"><h3 class="titleMovieFavourite">${myFav.name}</h3></li>`
        asideFav.classList.remove('hidden');
        }else{
            listFav.innerHTML+= `<li class ="myFavouriteLi" id=${myFav.id}><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"><span class="spanFavouriteLi"></span><button id=${myFav.id} type="button" class="button__remove">Borrar</button><span class="spanFavouriteLi"><h3 class="titleMovieFavourite">${myFav.name}</h3></li>`  
            asideFav.classList.remove('hidden');
        }
    }
   addRemoveListeners();
}


function addRemoveListeners(){
    const myButtons = document.querySelectorAll('.button__remove')
    for(let remove of myButtons){
        remove.addEventListener('click', removeFavourite);
        
    }
}
function removeFavourite(event){
    let fullElementId = event.currentTarget.parentElement.id;
    const findMovie= selectedMovies.findIndex(movies => parseInt(movies.id) === parseInt(fullElementId));
    selectedMovies.splice(findMovie, 1);
    setLocalStorage();
    printFavourites(selectedMovies);
}

printFavourites(selectedMovies);
button.addEventListener('click', startPage);
