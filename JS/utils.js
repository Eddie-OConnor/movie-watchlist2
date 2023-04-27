// upon search - hides the initial "start exploring" and film icon, shows load graphic

function toggleDisplay(){
    document.getElementById('welcome-msg').classList.toggle('hidden')
    document.getElementById('load-graphic').classList.toggle('hidden')     
}

// delivers pop up message to user confirming movie has been added to watchlist

function watchlistMsg(isAdded){
    const message = document.createElement('div');
    isAdded ? message.innerHTML = 'Added to watchlist!' : 
        message.innerHTML = 'Removed from watchlist!' 
    message.id = "watchlist-confirm"
    document.body.appendChild(message);

    setTimeout(() => {
    document.body.removeChild(message);
    }, 1000);
}

// same function as above except message for duplicate movie being added to watchlist

function duplicateMovieMsg(){
    const message = document.createElement('div');
    message.innerHTML = 'Movie already in watchlist!'
    message.id = "watchlist-confirm"
    document.body.appendChild(message);

    setTimeout(() => {
    document.body.removeChild(message);
    }, 1000);
}

export {toggleDisplay, watchlistMsg, duplicateMovieMsg}