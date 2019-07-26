import React, { useEffect, useState } from "react";
import "../css/style.css";
import { getMovies } from "../api";
import Movie from "../components/Movie";

export default function App() {
	const [movies, setMovies] = useState([]);

	useEffect(async () => {
		const movies = await getMovies();
		setMovies(movies);
	}, []);

	return (
		<div>
			<h1>Movies!</h1>
			<div className="content-container">
				<h3>Here are some movies</h3>
			</div>
			<div className="container">
				<div>
					{movies.map(movie => (
						<Movie {...movie} />
					))}
				</div>
			</div>
		</div>
	);
}
