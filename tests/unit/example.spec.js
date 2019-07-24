/*
  This is the Jest syntax of testing. Full description can be found in the README.md  
*/

// describe is the parent folder of your test cases. Think of it as a description of the tests you'll run
// it takes 2 arguments, the name of the test ( string ), and the function it will run
describe("Example test syntax", () => {
	// `it` is similiar to `describe`, but is more fine grained. It is a singular test, with a single outcome
	// `it` has the same 2 arguments as describe
	it("Doesn't blow up", () => {
		// `expect` is the "assertion" part of the process. It will always result in true or false,
		//otherwise the test wouldn't know it passed or failed.
		expect(1 + 1).toBe(2); // `toBe` is the standard expectation expression. It is similiar to `===`
	});
});
