// for resolving the absolute path to our project
const path = require("path");

module.exports = {
	entry: ["babel-polyfill", "./src/index.js"], // change to ./src/promises.js to use that version
	// needed to utilize async & await / promises
	// where our app "starts"

	// where to put the transpiled javascript
	// this file is READ ONLY!!
	// The block belows says, find the absolute path of the public folder, and stick a file called main.js in it.
	// index.html is looking for a main.js file in the script tag
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "main.js"
	},

	target: "web", // builds with the intention of running on a website
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},
			{
				// any file that ends with '.js'
				test: /\.js$/,
				// except those in "node_modules"
				exclude: [path.resolve(__dirname, "node_modules")],
				loader: "babel-loader",
				query: {
					presets: ["@babel/env", "@babel/preset-react"] // transform with babel/env which allows for the most current js syntax
				}
			}
		]
	}
};
