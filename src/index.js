/**
 * es6 modules and imports
 */
// axios is a libary, much like jQuery. It handles `fetching` in addition to other things.
// Check out the docs for a better explanation.
import axios from "axios";
/**
 * require style imports
 */
// adding async before the function declaration denotes that we will be doing something that requires us to wait on another proccess
const fetchMovies = async () => {
	// this is a try / catch block.
	// It allows us to do something that may or may not work, and still be covered either way.
	// We `try` something such as reaching out to a databse, or google maps api, and `catch` any errors that may occur in the process.
	try {
		// `await` can only be used inside of `async` functions.
		// we add `await` before something that will be asynchronus. Something that we have to wait on, before the program can continue executing.
		const movies = await axios.get("/api/movies");
		console.log("Here are all the movies:", movies);
		// this uses object destructuring to access the properties of each movie
		// the syntax below is the same as saying movie.title, movie.rating and movie.id
		movies.data.forEach(({ title, rating, id }) => {
			// this is string interpolation, or "back ticks". It allows us to escape the normal string and write JS inside of the "${}"
			console.log(`id#${id} - ${title} - rating: ${rating}`);
		});
		// the `error` argument is the system describing what went wrong
	} catch (error) {
		console.error(
			"Oh no! Something went wrong.\nCheck the console for details."
		);
		console.log("The error from the try / catch block is: ", error);
	}
};

// this is calling the async function to run immediately on page load.
fetchMovies();

// if the instant running isn't what we want, we can make that call on a button click, after a certain perioud of time, or even on a timer.

// **** timer *****
// setInterval(async () => {
// 	fetchMovies();
// }, 1000 * 5); // this is running the fetchMovies function every 5 seconds
