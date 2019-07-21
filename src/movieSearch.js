"use strict";

// this is going to be the function to search and populate the main page//

import sayHello from './hello';
sayHello('World');


const {getMovies} = require('./api.js');






const omdbKey = "aefabb3f";
// var searchedMovie;
$('#btn-1').on("click", function () {
	let input = $('#searchText');
	return fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&s=${input.val()}&type=movie`)
		.then(results => results.json())
		.then(data => console.log(data))
		.then(function (data) {
			const movies = data;
			for (let movie of Array.from(movies)) {
				return movie.title
			}
		})
})
