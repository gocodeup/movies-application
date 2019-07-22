"use strict";

// this is going to be the function to search and populate the main page//

import sayHello from './hello';
sayHello('World');

const {getMovies} = require('./api.js');

const omdbKey = "aefabb3f";



let input = $('#searchText');
$('#btn-1').on("click", function () {
	$('#row1').empty();
	$('#row2').empty();
	$('#row3').empty();
	fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&s=${input.val()}&type=movie`)
		.then(response => response.json())
		.then((data) => {
			let movies = data.Search
			// console.log(movies)

			for (var i = 0; i < 3; i++) {
				$(`<div class="col-4 movieTitle" data-target="movieModal"><img class="posterImage" src="${movies[i].Poster}"/><br><span class="apiMovieTitle">${movies[i].Title}<button id="btn-${[i]}" type="button" class="button" data-target="#movieModal" data-toggle="modal"></button></span></div>`).appendTo("#row1");
			}
			for (var i = 3; i < 6; i++) {
				$(`<div class="col-4 movieTitle" data-target="movieModal"><img class="posterImage" src="${movies[i].Poster}"/><br><span class="apiMovieTitle">${movies[i].Title}<button id="btn-${[i]}" type="button" class="button" data-target="#movieModal" data-toggle="modal"></button></span></div>`).appendTo("#row2");
			}
			for (var i = 6; i < 9; i++) {
				$(`<div class="col-4 movieTitle" data-target="movieModal"><img class="posterImage" src="${movies[i].Poster}"/><br><span class="apiMovieTitle">${movies[i].Title}<button id="btn-${[i]}" type="button" class="button" data-target="#movieModal" data-toggle="modal"></button></span></div>`).appendTo("#row3");
			}

		})

})




	// let input = $('#searchText');
	// $('#btn-1').on("click", function () {
	// 	return fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&s=${input.val()}&type=movie`)
	// 		.then(response => response.json())
	// 		.then((data) => {
	// 			let movies = console.log(data)
	// 			return movies
	// 		})

		// .then(console.log(movies))

		// .then(() => {
		// 	for (let movie of movies) {
		// 		return movie.Title
		// 		console.log(movie.Title)
		// 	}
		// })



	// .then(function (data) {
	// 	const movies = data;
	// 	for (let movie of Array.from(movies)) {
	// 		return movie.title
	// 	}
	// })