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
				// any file that ends with '.js'
				test: /\.js$/,
				// except those in "node_modules"
				exclude: [path.resolve(__dirname, "node_modules")],
				loader: "babel-loader",
				query: {
					presets: ["@babel/env"] // transform with babel/env which allows for the most current js syntax
				}
			}
		]
	},
	devServer: {
		// the dev server is serving the public folder, which contains index.html.
		// This is just like opening up html in the browser how we've normally done it, with the inclusipon of "hot reloading"
		// Hot reloading refreshes and re-bundles the code each time changes are detected in the src/ directory.
		contentBase: path.join(__dirname, "public"),
		port: 1313,
		compress: true,
		watchContentBase: true,
		// send requests that start with "/api" to our api server
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				pathRewrite: { "^/api": "" }
			}
		}
	}
};
