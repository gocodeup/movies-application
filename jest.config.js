module.exports = {
	moduleFileExtensions: ["js", "json"],
	transform: {
		"^.+\\.jsx?$": "babel-jest"
	},
	transformIgnorePatterns: ["/node_modules/"],
	testMatch: [
		"**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
	],

	testURL: "http://localhost/"
};
