const merge = require("webpack-merge");
const common = require("./webpack.common");

// prod build - merges with common
module.exports = merge(common, {
	mode: "production"
});
