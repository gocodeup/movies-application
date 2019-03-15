"use strict";



module.exports = {
    getRating: (stars) => {
        switch (stars) {
            case "5 Stars":
                return 5;
            case "4 Stars":
                return 4;
            case "3 Stars":
                return 3;
            case "2 Stars":
                return 2;
            case "1 Star":
                return 1;
            default:
                return "undefined"
        }
    }
};

module.exports = {
    addMovie: ({title, rating}) => {
        let newMovie = { title, rating };
        fetch('./api/movies', {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"},
            body: JSON.stringify(newMovie)})
            .then(response => JSON.stringify(response));
    }
    addMovie(newMovie);
};