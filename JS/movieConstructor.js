class Movie {
    constructor(data){
        Object.assign(this, data)
    }

    getMovieHtml(isWatchlist){
        const {Poster, Title, imdbRating, Runtime, Genre, imdbID, Plot} = this
        const posterSrc = Poster !== "N/A" ? Poster : "/Images/blank-movie-poster.jpg"
        return `
            <div id="movie-container">
                <img id="movie-poster" class="movie-poster-class" src=${posterSrc}>
                <div class="movie">          
                    <div class="movie-header">
                        <h3 id="movie-title">${Title}</h3>
                        <img id="star-icon" src="/Images/star-icon.png">
                        <h6 id="movie-rating">${imdbRating}</h6>
                    </div>
                    <div class="movie-details">
                        <h6 id="movie-length">${Runtime}</h6>
                        <h6 id="movie-genre">${Genre}</h6>
                        <button id="watchlist-btn" class="watchlist-btn-class" 
                            data-imdbid="${imdbID}">
                            <img id="plus-icon" src="/Images/${isWatchlist ? "remove-icon" : "plus-icon"}.png" data-imdbid="${imdbID}">
                            ${isWatchlist ? "Remove" : "Watchlist"}
                        </button>
                    </div>
                    <div class="movie-description">
                        <p>${Plot}</p>
                    </div>
                </div>
            </div>`
    }
}
   
export default Movie