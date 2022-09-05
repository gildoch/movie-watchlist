const searchInput = document.getElementById("search-input");
const moviesContainer = document.getElementById("movies");


function searchMovie() {
    moviesContainer.innerHTML = "";
    fetch(`http://www.omdbapi.com/?s=${searchInput.value}&apikey=91a4b86f`)
        .then((res) => {
            if (!res.ok) {
                throw Error("Erro ao buscar filmes");
            }

            return res.json();
        })
        .then((data) => {
            const arrayOfMovies = [];
            for (let i = 0; i < data.Search.length; i++) {
                fetch(`http://www.omdbapi.com/?i=${data.Search[i].imdbID}&apikey=91a4b86f`)
                    .then(res => {
                        if (!res.ok) {
                            throw Error("Erro ao buscar filmes");
                        }

                        return res.json();
                    })
                    .then(data => {
                        arrayOfMovies.push(data)
                        moviesContainer.innerHTML += `
                    <div class="movie-card">
                        <img class="poster-image" src="${data.Poster}" alt="" />
                        <div class="movie-info">
                            <div class="top">
                                <h2>${data.Title}</h2>
                                <p>⭐</p>
                                <p>${data.Ratings[0].Value}</p>
                            </div>
                            <div class="description">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <div class="btn-wrapper">
                                    <img src="./assets/Icon-2.png" />
                                    <button class="btn-addMovie">Watchlist</button>
                                </div>
                            </div>
                            <p>${data.Plot}</p>
                        </div>
                    </div>        
                    `;
                        /* handler add to watchlist */
                        let addButtons = document.getElementsByClassName('btn-addMovie');
                        for (let i = 0; i < addButtons.length; i++) {
                            addButtons[i].addEventListener('click', () => {
                                console.log(arrayOfMovies[i])
                                const myLocalDB = JSON.parse(localStorage.getItem("myMovies"));
                                if (myLocalDB === null) {
                                    localStorage.setItem("myMovies", JSON.stringify([arrayOfMovies[i]]))
                                } else {

                                    for (let j = 0; j < myLocalDB.length; j++) {
                                        if (arrayOfMovies[i].imdbID === myLocalDB[j].imdbID) {
                                            console.log("Filme ja existente")
                                            break
                                        } else {
                                            localStorage.setItem("myMovies", JSON.stringify([...myLocalDB, arrayOfMovies[i]]))
                                        }

                                    }

                                }

                            })

                        }
                    }).catch(err => {
                        console.log(err)
                    })
            }
        }).catch(err => {
            moviesContainer.innerHTML = `
            <div class="empty-page-placeholder"">
                <p>Unable to find what you’re looking for. Please try another search.</p>
            </div>
        `;
        });
}

document.getElementById("search-btn").addEventListener("click", searchMovie);
