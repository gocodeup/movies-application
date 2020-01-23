const OMDB_API_KEY = require('./keys.js');
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
       return fetch(`http://www.omdbapi.com/?t=${searchParams}&apikey=${OMDB_API_KEY}`)
           .then((response) => response.json());
   }
};





