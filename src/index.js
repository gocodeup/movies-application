/**
 * The following codeblock uses es6 modules and the import syntax.
 * `imports` cannot be used unless you use Babel and Webpack. Take a look at the docs to learn more.
 *
 * axios is a standard and popular libary, much like jQuery. It handles `fetching` in addition to other things related to http requests.
 * Check out the docs for a better explanation.
 * Below, we are importing the axios library for use in this file. It's very similiar to copying the axios source code into this file, and that is
 * what webpack does. It makes the library available to us, through the word `axios`.
 * This is the same as doing: `const axios = require("axios")`
 **/

import axios from "axios";

// adding async before the function declaration denotes that we will be doing something that requires us to wait on another proccess
const fetchMovies = async () => {
	// this is a try / catch block.
	// It allows us to do something that may or may not work, and still be covered either way.
	// We `try` something such as reaching out to a databse, or google maps api, and `catch` any errors that may occur in the process.
	try {
		// `await` can only be used inside of `async` functions.
		// we add `await` before something that will be asynchronus.
		// Asynchronus meaning that we have to wait on it to finish, before the program can continue executing.
		// Assigning the constant `movies` to be the result of awaiting a get request to `/api/movies`
		const movies = await axios.get("/api/movies");
		console.log("Here are all the movies:", movies.data); // the data property is unique to axios, and contains the array of movies we asked the db for
		// this uses object destructuring to access the properties of each movie
		// the syntax below is the same as saying movie.title, movie.rating and movie.id
		movies.data.forEach(({ title, rating, id }) => { // https://java.codeup.com/javascript-ii/es6/#object-destructuring
			// this is string interpolation, or "back ticks". It allows us to escape the normal string and write JS inside of the "${}"
			console.log(`id#${id} - ${title} - rating: ${rating}`); //https://java.codeup.com/javascript-ii/es6/#template-strings
		});
		// the `error` argument is the system describing what went wrong
	} catch (error) {
		console.error("The error from the try / catch block is: ", error);
	}
};

// this is calling the async function to run immediately on page load.
fetchMovies();

// if the instant running isn't what we want, we can make that call on a button click, after a certain perioud of time, or even on a timer.

// **** timer *****
// setInterval(async () => {
// 	await fetchMovies();
// }, 1000 * 5); // this is running the fetchMovies function every 5 seconds
