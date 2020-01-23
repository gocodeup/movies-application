const {OMDB_API_KEY} = require('./keys.js');
const {THE_MOVIE_DB_API_KEY} = require('./keys.js');
module.exports = {
    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());
        },
    getOMDB: (inputMovieTitle) => {
        let searchParams = '';
        inputMovieTitle = inputMovieTitle.toLowerCase();
        if (inputMovieTitle.split(" ").length > 1) {
            let titleArr = inputMovieTitle.split(" ");
            let finalStr = '';
            let outputArr = [];
            titleArr.forEach(element => {
                outputArr.push(element + '+');
            });
            let outputStr = outputArr.join('');
            finalStr = outputStr.substring(0, outputStr.length - 1);
            console.log(finalStr);
            searchParams = finalStr;
        } else if (inputMovieTitle.split(" ").length === 1) {
            searchParams = inputMovieTitle;
        }
        http://www.omdbapi.com/?apikey=[yourkey]&
       return fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchParams}`)
           .then((response) => response.json());
   },
    searchTheMovieDBID: (inputMovieTitle) => {
        // https://api.themoviedb.org/3/search/movie?api_key={key}&language=en-US&query=Star%20Wars&page=1&include_adult=false
        let searchParams = '';
        inputMovieTitle = inputMovieTitle.toLowerCase();
        if (inputMovieTitle.split(" ").length > 1) {
            let titleArr = inputMovieTitle.split(" ");
            let finalStr = '';
            let outputArr = [];
            titleArr.forEach(element => {
                outputArr.push(element + '%20');
            });
            let outputStr = outputArr.join('');
            finalStr = outputStr.substring(0, outputStr.length - 3);
            console.log(finalStr);
            searchParams = finalStr;
        } else if (inputMovieTitle.split(" ").length === 1) {
            searchParams = inputMovieTitle;
        }
        // https://api.themoviedb.org/3/search/movie?api_key={key}&language=en-US&query=Star%20Wars&page=1&include_adult=false
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${THE_MOVIE_DB_API_KEY}&language=en-US&query=${searchParams}&page=1&include_adult=false`)
            .then((response) => response.json());
    },
    searchMovie: (inputObj) => {
        let movieID = inputObj['id'];
        https://api.themoviedb.org/3/movie/${movieID}?api_key=${THE_MOVIE_DB_API_KEY}&language=en-US
        return fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${THE_MOVIE_DB_API_KEY}&language=en-US`)
            .then((response) => response.json());
    },
    updateCRUDyDB: (inputObj) => {
        let data = {
            title: inputObj['title'],
            overview: inputObj['overview'],
            genre: inputObj["genres"][0]["name"]
        };
        // let data = {username: inputObj}
        return fetch(`/api/movies`,  {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
    }
};





