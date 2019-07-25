# Async / Await

## Why?

## How to use them

Usage of `async / await` is tricky at first. Especially if you look at it from a "techie" perspective. By that I mean think about from a logical, real world standpoint.

### Understanding the flow

Consider the following block:

```js
fetch("/a/sweet/url)
  .then(sweetUrlResponse => const whatIWant = sweetUrlResponse.json())
    .then(console.log("This is what I wanted from the server: ", whatIWant);
  .catch(error => console.error("The error given by the server is: ", error));
```

The above code's happy path is that it:

- Sends a `get` request to `/a/sweet/url`, which returns a promise
- Calls `.json()` on the response from the url, which returns another promise
- `console.log`'s the result

What is the happy doesn't work? The catch is there to save the day.

### What is each part doing?

The `.then()` functions are waiting for the previous block to finish. There is no set time, it's just whenever the previous code is done executing.
This is also known as when the promise resolves.

Notice how we are waiting for the code to finish? Me too! That is wild.

So now that we've established that we're waiting for the code to finish, why don't we `await` the code.

```js
const fetchTheData = async () => {
  const sweetUrlResponse = await fetch("/a/sweet/url);
}
```