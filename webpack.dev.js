const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

// dev build - merges with common
module.exports = merge(common, {
	mode: "development",
	// other configuration options for development can be placed here such as:
	devtool: "source-map", // allows us to see how the transpiled js relates to the un-transpiled js
	devServer: {
		// the dev server is serving the public folder, which contains index.html.
		// This is just like opening up html in the browser how we've normally done it, with the inclusion of "hot reloading"
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
});
