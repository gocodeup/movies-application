
const {RAPID_API_MOVIE_DB_API_KEY} = require('./keys');
module.exports = {
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
    readFromCRUDyDB: (inputTitle, inputRating, inputGenre, inputID) => {
        $('#main-container').html(`<h1 id="loading-h1">Loading...</h1>`);
        return fetch('/api/movies')
            .then(response => response.json())
            .then((movies) => {
                let filteredArr = [];
                let i = 1;
                let filteredParamArr = [];
                let inputParamArr = [
                    {Title: inputTitle}, {Rating: inputRating}, {Genre: inputGenre}, {id: inputID}
                ];
                inputParamArr.forEach(param => {
                    console.log(param);
                    console.log(Object.values(param));
                    let paramArr = Object.values(param);
                    let testParam = paramArr.join('');
                    if (testParam !== '') {
                        filteredParamArr.push(param);
                    }
                });
                let filteredMoviesArr = [];
                filteredParamArr.forEach(param => {
                    let paramKey = Object.keys(param).join('');
                    let paramValue = Object.values(param).join(' ');
                    movies.filter(movie => {
                        for (const property in movie) {
                            console.log(paramKey);
                            console.log(paramValue);
                            console.log(property);
                            console.log(movie[`${property}`])
                            if (property === paramKey && movie[`${property}`] === paramValue) {
                                console.log("In if");
                                filteredMoviesArr.push(movie);
                            }
                        }
                    })
                })
                console.log(filteredMoviesArr);
                return filteredMoviesArr;
            })
        // $('#loading-h1').remove();
        // filteredArr.forEach(({Title, Overview, Year, Rated, Genre, Image, Website, imdbRating, Rating, id}) => {
        //     $('#main-container').append(`<div class="movie-container" id="movie-container-${i}">${Title}, ${Overview}, ${Year}, ${Rated}, ${Genre}, ${Image}, ${Website}, ${imdbRating}, ${Rating}, ${id}</div>`)
        //     i++;
        // });
    }
};





