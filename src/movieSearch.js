"use strict";

// this is going to be the function to search and populate the main page//

import sayHello from './hello';
sayHello('World');

const {getMovies} = require('./api.js');






const omdbKey = "aefabb3f";
// var searchedMovie;

// let movies;
let moviesArr = [];


let input = $('#searchText');
$('#btn-1').on("click", function () {
	return fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&s=${input.val()}&type=movie`)
		.then(response => response.json())
		.then(data => {
			const movies = document.createElement('div');
				data.forEach(movie => {
					movies.innerHTML +=
						`title: ${movie.Title}`
				})
			$('title').append(movies)
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