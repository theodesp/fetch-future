# [![Fetch-Future](logo.png)](#fetch-future)

> Use fetch as a Monadic Future

# What? Fetch the future?
No just use fetch that returns a Future instead of a promise.


-   **Minimal:** just `fetch()` with headers and text/json/xml responses
-   **Modern:** written in ES2015
-   **Cancellable** you can cancel the fetch once dispatched
-   **Add your own Future** you can add your own Future Library as long as it implements the 
-   **Monadic** 

> 🤔 **What's Not there?**
>
> -   Uses simple Arrays instead of Iterables
> -   No streaming, just Futurizes existing XMLHttpRequest response bodies


For more information about Futures see:
* [Comparison of Futures to Promises](https://github.com/fluture-js/Fluture/wiki/Comparison-to-Promises)

Usage
> yarn install https://github.com/theodesp/fetch-future
> yarn add fluture // or data.task or ramda-fantasy


Example
-------

Fetch some objects from an api

```js
import { fetchF } from 'fetch-future';
import Future from 'fluture';

const fetch = fetchF(Future);

fetch('https://jsonplaceholder.typicode.com/posts')
  .chain(res => res.json()) // json() is also a Future!
  .fork(console.error, console.log) // Future Fantasy!
```

Cancel a future!

```js
import { fetchF } from 'fetch-future';
import Future from 'fluture';

const fetch = fetchF(Future);

const future = fetch('https://jsonplaceholder.typicode.com/posts')
  .chain(res => res.json()) // json() is also a Future!
  .fork(console.error, console.log) // Future  to be resolved!
  
future(); // Cancels by calling the future!
```

## Fetch Caveats
* By default, fetch **won't send or receive any cookies** from the server, resulting in unauthenticated 
requests if the site relies on maintaining a user session.

```js
fetch('/posts', {
  credentials: 'include'
});
```

* The Promise returned from fetch() won't reject on HTTP error status 
even if the response is an HTTP 404 or 500. 
Instead, it will resolve normally, and it will only reject 
on network failure or if anything prevented the request from completing.

## API

```hs
fetchF :: Constructor -> CPS -> ( (input, options) -> Future )
```

## License

MIT © [theodesp](https://theodesp.github.io)