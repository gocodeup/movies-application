const {OMDB_API_KEY} = require('./keys.js');
const {THE_MOVIE_DB_API_KEY} = require('./keys.js');
const {RAPID_API_MOVIE_DB_API_KEY} = require('./keys');
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
    updateCRUDyDBFromTheMovieDB: (inputObj, rating) => {
        let data = {
            title: inputObj['title'],
            overview: inputObj['overview'],
            genre: inputObj["genres"][0]["name"],
            rating: rating
        };
        // let data = {username: inputObj}
        return fetch(`/api/movies`, {
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
    },
    updateCRUDyDBFromUser: (data) => {
        return fetch(`/api/movies`, {
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
    },
    refreshMovies: () => {
        $('#main-container').html(`<h1 id="loading-h1">Loading...</h1>`);
        return fetch('/api/movies')
            .then(response => response.json())
            .then((movies) => {
                let i = 1
                $('#loading-h1').remove();
                movies.forEach(({Title, Overview, Year, Rated, Genre, Image, Website, imdbRating, Rating, id}) => {
                    $('#main-container').append(`<div class="movie-container" id="movie-container-${i}">${Title}, ${Overview}, ${Year}, ${Rated}, ${Genre}, ${Image}, ${Website}, ${imdbRating}, ${Rating}, ${id}</div>`)
                    i++;
                });
            })
    },
    searchRapidApiMovieDB: (inputMovieTitle) => {
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
        return fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&s=${searchParams}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": RAPID_API_MOVIE_DB_API_KEY
            }
        })
            .then(response => response.json())
            // .then(response => {
            //     console.log(response);
            // })
            .then(response => response['Search'])
            .catch(err => {
                console.log(err);
            });
    },
    getRapidApiMovieID: (searchResultArr, userConfirmed) => {
        let output;
        searchResultArr.forEach(result => {
            if (result['Title'] === userConfirmed) {
                console.log(result['imdbID']);
                output = result["imdbID"];
            }
        })
        return output
    },
    idSearchRapidApiMovieDB: (movieID) => {
        "https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json"
        return fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${movieID}&r=json`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": RAPID_API_MOVIE_DB_API_KEY
            }
        })
            .then(response => response.json())
            .catch(err => {
                console.log(err);
            });
    },
    updateCRUDyDBFromRapid: (inputObj, rating) => {
        let data = {
            Title: inputObj['Title'],
            Overview: inputObj['Plot'],
            Year: inputObj['Year'],
            Rated: inputObj['Rated'],
            Genre: inputObj['Genre'],
            Image: inputObj['Poster'],
            Website: inputObj['Website'],
            imdbRating: inputObj['imdbRating'],
            Rating: rating
        };
        // let data = {username: inputObj}
        return fetch(`/api/movies`, {
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
    },

};





