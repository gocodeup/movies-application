"use strict";

// this is going to be the function to search and populate the main page//

import sayHello from './hello';
sayHello('World');

const {getMovies} = require('./api.js');

const omdbKey = "aefabb3f";

	let input = $('#searchText');
	$('#btn1').on("click", function () {
		$('#row1').empty();
		$('#row2').empty();
		$('#row3').empty();
		fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&s=${input.val()}&type=movie`)
			.then(response => response.json())
			.then((data) => {
				let movies = data.Search
				console.log(movies)


				// Adds posters, Titles, and Tiny Buttons to Main page //
			for (var i = 0; i < 3; i++) {
				$(`<div class="col-4 movieTitle" data-target="movieModal"><img class="posterImage" src="${movies[i].Poster}"/><br><span class="apiMovieTitle">${movies[i].Title}<br><button id="btn-${[i]}" type="button" class="button" data-target="#movieModal" data-toggle="modal"></button></span></div>`).appendTo("#row1");
			}
			for (var i = 3; i < 6; i++) {
				$(`<div class="col-4 movieTitle" data-target="movieModal"><img class="posterImage" src="${movies[i].Poster}"/><br><span class="apiMovieTitle">${movies[i].Title}<br><button id="btn-${[i]}" type="button" class="button" data-target="#movieModal" data-toggle="modal"></button></span></div>`).appendTo("#row2");
			}
			for (var i = 6; i < 9; i++) {
				$(`<div class="col-4 movieTitle" data-target="movieModal"><img class="posterImage" src="${movies[i].Poster}"/><br><span class="apiMovieTitle">${movies[i].Title}<br><button id="btn-${[i]}" type="button" class="button" data-target="#movieModal" data-toggle="modal"></button></span></div>`).appendTo("#row3");
			}


			// Adds Modal Functionality to tbe Buttons //
				//A look here would obviously be much cleaner, but I can't figure that out //
				$('#btn-0').on("click", function () {
					$('#modalBody').empty();
					$('#movieModalLongTitle').empty();
					fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${movies[0].Title}`)
						.then(response => response.json())
						.then((data) => {
							let plot = data.Plot
							$('#modalBody').html(plot.toString())
							$('#movieModalLongTitle').html(movies[0].Title + ' - ' + '(' + movies[0].Year + ')')
						})
				})
					$('#btn-1').on("click", function () {
						$('#modalBody').empty();
						$('#movieModalLongTitle').empty();
						fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${movies[1].Title}`)
							.then(response => response.json())
							.then((data) => {
								let plot = data.Plot
								$('#modalBody').html(plot.toString())
								$('#movieModalLongTitle').html(movies[1].Title + ' - ' + '(' + movies[1].Year + ')')
							})
					})
					$('#btn-2').on("click", function () {
						$('#modalBody').empty();
						$('#movieModalLongTitle').empty();
						fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${movies[2].Title}`)
							.then(response => response.json())
							.then((data) => {
								let plot = data.Plot
								$('#modalBody').html(plot.toString())
								$('#movieModalLongTitle').html(movies[2].Title + ' - ' + '(' + movies[2].Year + ')')
							})
					})
					$('#btn-3').on("click", function () {
						$('#modalBody').empty();
						$('#movieModalLongTitle').empty();
						fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${movies[3].Title}`)
							.then(response => response.json())
							.then((data) => {
								let plot = data.Plot
								$('#modalBody').html(plot.toString())
								$('#movieModalLongTitle').html(movies[3].Title + ' - ' + '(' + movies[3].Year + ')')
							})
					})
					$('#btn-4').on("click", function () {
						$('#modalBody').empty();
						$('#movieModalLongTitle').empty();
						fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${movies[4].Title}`)
							.then(response => response.json())
							.then((data) => {
								let plot = data.Plot
								$('#modalBody').html(plot.toString())
								$('#movieModalLongTitle').html(movies[4].Title + ' - ' + '(' + movies[4].Year + ')')
							})
					})
					$('#btn-5').on("click", function () {
						$('#modalBody').empty();
						$('#movieModalLongTitle').empty();
						fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${movies[5].Title}`)
							.then(response => response.json())
							.then((data) => {
								let plot = data.Plot
								$('#modalBody').html(plot.toString())
								$('#movieModalLongTitle').html(movies[5].Title + ' - ' + '(' + movies[5].Year + ')')
							})
					})
					$('#btn-6').on("click", function () {
						$('#modalBody').empty();
						$('#movieModalLongTitle').empty();
						fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${movies[6].Title}`)
							.then(response => response.json())
							.then((data) => {
								let plot = data.Plot
								$('#modalBody').html(plot.toString())
								$('#movieModalLongTitle').html(movies[6].Title + ' - ' + '(' + movies[6].Year + ')')
							})
					})
					$('#btn-7').on("click", function () {
						$('#modalBody').empty();
						$('#movieModalLongTitle').empty();
						fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${movies[7].Title}`)
							.then(response => response.json())
							.then((data) => {
								let plot = data.Plot
								$('#modalBody').html(plot.toString())
								$('#movieModalLongTitle').html(movies[7].Title + ' - ' + '(' + movies[7].Year + ')')
							})
					})
					$('#btn-8').on("click", function () {
						$('#modalBody').empty();
						$('#movieModalLongTitle').empty();
						fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${movies[8].Title}`)
							.then(response => response.json())
							.then((data) => {
								let plot = data.Plot
								$('#modalBody').html(plot.toString())
								$('#movieModalLongTitle').html(movies[8].Title + ' - ' + '(' + movies[8].Year + ')')
							})
					})

				})
			})

