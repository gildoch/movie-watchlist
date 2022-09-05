const watchlistContainer =document.getElementById('watchlist-movies');
const myLocalDB = JSON.parse(localStorage.getItem("myMovies"));
let removeButtons = document.getElementsByClassName('btn-removeMovie');

console.log(myLocalDB)
/*Watchlist */

function renderWatchlist (){
    if(myLocalDB === null){
        watchlistContainer.innerHTML =`
        <div class="empty-page-placeholder">
            <p>Your watchlist is looking a little empty...</p>
            <a class="search-movies-link" href="./index.html">
                <img src="./assets/Icon-2.png" />
                <span>Let’s add some movies!</span>
            </a>
      </div>
        `
    }else {
        watchlistContainer.innerHTML = "";
        for (let i = 0; i < myLocalDB.length; i++) {        
            watchlistContainer.innerHTML += `
            <div class="movie-card">
            <img class="poster-image" src="${myLocalDB[i].Poster}" alt="" />
            <div class="movie-info">
                <div class="top">
                    <h2>${myLocalDB[i].Title}</h2>
                    <p>⭐</p>
                  
                </div>
                <div class="description">
                    <p>${myLocalDB[i].Runtime}</p>
                    <p>${myLocalDB[i].Genre}</p>
                    <div class="btn-wrapper">
                        <img src="./assets/Icon-1.png" />
                        <button class="btn-removeMovie">Remove</button>
                    </div>
                </div>
                <p>${myLocalDB[i].Plot}</p>
            </div>
        </div>    
        `;
    }
    }
}

renderWatchlist();

 for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener('click', ()=>{
        let newWatchlist = myLocalDB.splice(i,1); 
        localStorage.setItem ("myMovies",JSON.stringify(myLocalDB));
        renderWatchlist();

    })
    
} 