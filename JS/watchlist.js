import Movie from './movieConstructor.js'
import {watchlistMsg} from './utils.js'

const movieWatchlist = JSON.parse(localStorage.getItem('watchlist')) || []
const watchlistContainer = document.getElementById('watchlist-results-container')

// Render the watchlist from localStorage

function renderWatchlist(){
    let watchlistHtml = ''
    if (movieWatchlist.length > 0){
        watchlistHtml = movieWatchlist
        .map((movie) => new Movie(movie).getMovieHtml(true))
        .join('')
    } else {
        watchlistHtml = `
                <div id="add-movie-msg-container">
                    <p class="watchlist-no-results-msg">Your watchlist is looking a little empty...</p>
                    <a href="index.html">
                    <button id="main-watchlist-btn" onclick="window.location.href='index.html'">
                            <img id="plus-icon" src="/Images/plus-icon.png">
                            Let's add some movies!
                    </button>
                </div>`
    }
    watchlistContainer.innerHTML = watchlistHtml
    removeFromWatchlist()
}

// removies movie from watchlist

function removeFromWatchlist(){
    const watchlistBtns = document.getElementsByClassName('watchlist-btn-class')
    for (let btn of watchlistBtns){
        btn.addEventListener('click', (event) => {
            const movie = movieWatchlist.filter(
                (movie) => movie.imdbID === event.target.dataset.imdbid)[0]
            if (movieWatchlist.find((movieToRemove) => movieToRemove === movie)){
                movieWatchlist.shift(movie)
                localStorage.setItem('watchlist', JSON.stringify(movieWatchlist))
                renderWatchlist()
                
                watchlistMsg(false)
            }
        })
    }
}

renderWatchlist()