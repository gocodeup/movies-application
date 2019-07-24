// for resolving the absolute path to our project
const path = require("path");

module.exports = {
	entry: ["babel-polyfill", "./src/index.js"],
	// needed to utilize async & await / promises
	// where our app "starts"

	// where to put the transpiled javascript
	// this file is READ ONLY!!
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
