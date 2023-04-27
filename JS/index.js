import Movie from './movieConstructor.js'
import {toggleDisplay, watchlistMsg, duplicateMovieMsg} from './utils.js'

const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const searchForm = document.getElementById('search-form')

const searchResults = document.getElementById('results-container')
let searchResultArray = []

const movieWatchlist = JSON.parse(localStorage.getItem('watchlist')) || []

searchForm.addEventListener('submit', async function(event){
    event.preventDefault()
    const searchText = searchInput.value
    toggleDisplay()
    searchResultArray = await getMovieData(searchText)
    renderSearchResults()
    searchForm.reset()
})

// API call function

async function getMovieData(searchText){
    let searchResultData = []
    const res = await fetch 
        (`https://www.omdbapi.com/?s=${searchText}&apikey=83ab7c1e&type=movie`)
    const data = await res.json()
    if (data.Response === "True"){
        for (let movie of data.Search){
            const res = await fetch 
                (`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=83ab7c1e&type=movie&plot=short`)
            const data = await res.json()
            searchResultData.push(data)
        }
    }
    return searchResultData
}

// Render the results of the API call

function renderSearchResults(){
    let searchResultsHtml = ''
    if (searchResultArray.length > 0){
        searchResultsHtml = searchResultArray
            .map((movie) => new Movie(movie).getMovieHtml())
            .join('')
    } else {
         searchResultsHtml = `
            <p class="no-results-msg" id="no-results-msg"> Unable to find what your're looking for. Please try another search.</p>`       
    }
    searchResults.innerHTML = searchResultsHtml
    addToWatchlist()
}

// Add to watchlist and store in localStorage

function addToWatchlist(){
    const watchlistBtns = document.getElementsByClassName('watchlist-btn-class')
    for (let btn of watchlistBtns){
        btn.addEventListener('click', (event) => {
            const movie = searchResultArray.filter(
                (movie) => movie.imdbID === event.target.dataset.imdbid)[0]
            if (movieWatchlist.find((movieToWatch) => movieToWatch.imdbID === movie.imdbID)){
                duplicateMovieMsg()
            } else {
                movieWatchlist.unshift(movie)
                localStorage.setItem('watchlist', JSON.stringify(movieWatchlist))
                watchlistMsg(true)
            }   
        })
    }
}