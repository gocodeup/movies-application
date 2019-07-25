# Async / Await

## Why?

Promises are often very messy inside of JavaScript code. .`then` is often hard to read, and even worse are callbacks. THe introduction of async / await was driven by the need to have a clear, legible understanding of what the flow of the function is.

More info can be found at:

- [JavaScript info](https://javascript.info/async-await)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Hacker noon tutorial](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9)

## How to use them

Usage of `async / await` is tricky at first. Especially if you look at it from a "techie" perspective. By that I mean think about from a logical, real world standpoint.

### Understanding the flow

Consider the following block:

```js
fetch("/a/sweet/url)
  .then(sweetUrlResponse => console.log("This is what I wanted from the server: ", sweetUrlResponse);
  .catch(error => console.error("The error given by the server is: ", error));
```

The above code's happy path is that it:

- Sends a `get` request to `/a/sweet/url`, which returns a promise
- Uses `.then` to `console.log`'s the result

What is the happy doesn't work? The catch is there to save the day.

### What is each part doing?

The `.then()` functions are waiting for the previous block to finish. There is no set time, it's just whenever the previous code is done executing.
This is also known as when the promise resolves.

Notice how we are waiting for the code to finish? Me too! That is wild.

So now that we've established that we're waiting for the code to finish, why don't we `await` the code.

```js
const fetchTheData = async () => {
  const sweetUrlResponse = await fetch("/a/sweet/url");
  console.log("The info from the request is: ", sweetUrlResponse);
}
```

Above we have an `async` function. We know it's `async` because inside of the function, we are reaching out to a url. We don't know how long the url will take to respond, and the rest of our code relies on it's response.

To use `await`, it **HAS TO BE** used inside of a function marked with `async`.

Inside of the function, we know that the fetching is the thing that doens't have a set time to finish. So we have to (a)wait on it.

The result of us (a)waiting for the function to finish, is the variable. So `sweetUrlResponse` is what the `fetch()` returns.

This is the same as the following, non `async` code:

```js
// this would be the async function in the previous example
const doSomeInsaneStuff = () => {
  return 1 + 1; // what would be returned by the server
};

const doSomeReallyReallyInsaneStuff = () => {
  // we would normally be awaiting the result of this function
  const insaneStuff = doSomeInsaneStuff(); // insane stuff === 2
};
```

### Awaiting muliple things inside one function

Sometimes one function has multiple intances of `async` behavior. Common examples are password hashing, and storage / retrial from a database.

Let's do a simple example.

```js
const changeSomeonesName = async name => {
  let user = await fetch("/api/great/url/fetching/users");
  user.name = name;
  const postOptions = {
    method: "POST",
    body: JSON.stringify(user)
  }
  await fetch("/api/great/url/changing/users", postOptions);
}
```

Here we fetch a user from the database, change their name, and then store them again.

2 `async` behaviors that we need to (a)wait.

1. Fetching
2. Storing

With the use of `async` and `await`, it's no problem.

## Try / Catch

The concept of try / catch is relatively new to JS. This will be used quite a bit when we get to Java, so it's good to get some exposure here.

### Syntax

The syntax is rather straightforward. We try to do something, and if at any point, that operation fails, the catch block is executed instead.

```js
try {
  // trying to do something that might fail
} catch (error) {
 // action to take if it fails
}
```

### Usage

We can use try / catch anywhere, and for anything. However, it's primarily for connection based actions such as reaching out to an API such as Google Maps, a database, or otherwise.

### How it relates to aync / await

You'll notice that in the previous example, the `.catch()` is never used. The lack of error handling would present a **huge** issue.

So we can use the try catch as our `.catch()`

```js
const fetchTheData = async () => {
  const sweetUrlResponse = await fetch("/a/sweet/url");
  console.log("The info from the request is: ", sweetUrlResponse);
  return sweetUrlResponse;
}
try {
  // trying to do something that might fail
  const someSweetData = await fetchTheData();
  console.log("someSweetData is: ", someSweetData)
} catch (error) {
 // action to take if it fails
 console.error("Oops! Something went wrong. The description is: ", error)
}
```

Here we have an action that will be resolved either way. Without the net in place, it's possible the program will just fail outright and stop running. That's the worst case scenario, and we want to have a safeguard in place to prevent that.