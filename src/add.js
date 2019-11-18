function addMovie(title){
    return fetch('https://api.themoviedb.org/3/search/movie?api_key=fa451fae68a99b5a7395924b21e6394e&query=' + title)
        .then(response => response.json());
}

module.exports = addMovie;