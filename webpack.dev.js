const merge = require("webpack-merge");
const common = require("./webpack.common");

// dev build - merges with common
module.exports = merge(common, {
	mode: "development",
	// other configuration options for development can be placed here such as:
	devtool: "source-map" // allows us to see how the transpiled js relates to the untranspiled js
});
