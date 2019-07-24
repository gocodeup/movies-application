// This file does the same thing as index.js, but utilizing promises and the native fetch api

/**
 * es6 modules and imports
 */
import sayHello from "./hello";
sayHello("World");
/**
 * require style imports
 */
const { getMovies } = require("./api.js");

getMovies()
	.then(movies => {
		console.log("Here are all the movies:");
		movies.forEach(({ title, rating, id }) => {
			console.log(`id#${id} - ${title} - rating: ${rating}`);
		});
	})
	.catch(error => {
		console.log("Oh no! Something went wrong: ", error);
	});
