module.export =  function expressDacheQL({ redis } = {}, cache = {}) {
  // This function has two modes: one if a Redis cache is used, and the other if not.
  if (redis) {
    return async function redisHandler(req, res, next) {
      try {
        if (req.method === 'GET') {
          // Setting this value on res.locals tells the httpCache() function to set cache control headers on the response object.
          Object.defineProperty(res.locals, 'cacheable', {
            enumerable: false,
            writable: false,
            configurable: false,
            value: true,
          });

          // If a GET request was sent with DacheQL, the URL will have a 'hash' property in the query string.
          // If the query string has no 'hash' property, simply call the next piece of middleware.

          // if (Object.hasOwn(req.query, 'hash')) {
          //   // Try to retrieve a persisted query from the cache.
          //   const query = await redis.get(req.query.hash);
          //   if (!query) {
          //     // Status code 303 asks the client to make a followup HTTP request with the query included.
          //     return res.sendStatus(303);
          //   }

          //   delete req.query.hash; // After retrieving the persisted query we don't need the hash anymore.
          req.method = 'POST'; // Change the request method POST to account for situations where subsequent middleware functions expect a POST method.
          req.body = JSON.parse(req.query);
          // }
          return next();
        }
        // If a POST request was sent with DacheQL, cache the query and its associated hash.
        // If a POST request was not sent with DacheQL, simply call the next piece of middleware.
        // if (req.method === 'POST') {
        //   // Check for a hash in the request.
        //   if (Object.hasOwn(req.query, 'hash')) {
        //     // if the hash is found, reformat the query to a string depending on its current data type and saving the hash along with its query string as a key-value pair in Redis cache
        //     const query = typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
        //     await redis.set(req.query.hash, query);
        //   }
        // }
        return next();
      } catch (e) {
        return next(e);
      }
    };
  }
  // If a Redis cache is not used, return a function depending on current request method.
  return function cacheHandler(req, res, next) {
    try {
      // If the request was a GET, try to find the query string from cache object from the query hash
      if (req.method === 'GET') {
        Object.defineProperty(res.locals, 'cacheable', {
          enumerable: false,
          writable: false,
          configurable: false,
          value: true,
        });
        if (Object.hasOwn(req.query, 'hash')) {
          const query = cache[req.query.hash];
          // If there is no persisted query found return 303 status and make another request as a POST
          if (!query) {
            return res.sendStatus(303);
          }
          delete req.query.hash;
          req.method = 'POST';
          req.body = query;
        }
        return next();
      }
      // if the hash is found, save the hash along with its query string as a key-value pair in cache object
      if (req.method === 'POST') {
        if (Object.hasOwn(req.query, 'hash')) {
          cache[req.query.hash] = req.body;
        }
      }
      return next();
    } catch (e) {
      return next(e);
    }
  };
};

/**
 * @param {Object} req - A Node.js request object.
 * @param {string} key - A string index of the property to remove from the URL search parameter string. In our case, 'hash'.
 * @returns {Object} - An object containing the value of the property removed from the URL, along with the rest of the search params as a searchParams object (these remain in the URL).
 */

// This function gets the hashed GraphQL query from the request object's query string, then deletes that property from the query string.
// If you're unfamiliar with the Node.js url module, see this section of the Node.js documentation:
// https://nodejs.org/dist/latest-v16.x/docs/api/url.html#url-strings-and-url-objects

function strip(req, key) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { searchParams } = url;
  const hash = searchParams.get(key);
  url.searchParams.delete(key);
  req.url = `${url.pathname}${url.search}${url.hash}`;
  return { searchParams, hash };
}

// Variable value tracks whether Redis connection has ever failed.
let redisFailed = false;

/**
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} [opts] - An object providing the settings, which defaults to empty object.
 * @param {Object} [cache]  - An object to use as cache, which defaults to empty object.
 * @param {function} [callback] - a callback which takes an error and/or data and is called when error/data is found.
 * @returns {Promise} - A Promise which resolves with the value of whatever the callback returns, or rejects with the reason of whatever the callback throws.
 * There are two ways access the data this function provides:
 *    1. You can pass it a callback. The callback is passed two arguments, (error, data), where data is a GraphQL query document.
 *    2. You can also use .then() chaining or async/await.
 */

function defaultCallback(err, data) {
  if (err) {
    throw err;
  }
  return data;
}

// Once-ify setting up the error event listener on the Redis client. <-- This comment is bad. Will fix.
let errorListenerIsSetUp = false;

module.export =  async function nodeDacheQL(req, res, opts = {}, cache = {}, callback = defaultCallback) {
  // Verify Redis connection has never failed, if truthy default to cache.
  if (redisFailed) {
    delete opts.redis;
  }
  const { redis } = opts;
  // Deconstruct hash and search parameters from reconstructed URL.
  const { searchParams, hash } = strip(req, 'hash');
  try {
    // If Redis Client object exists, use it as our cache.
    if (redis) {
      if (!errorListenerIsSetUp) {
        redis.on('error', () => {
          redisFailed = true;
        });
        errorListenerIsSetUp = true;
      }
      if (req.method === 'GET') {
        if (hash) {
          const query = await redis.get(hash); // What happens if there's a Redis error? How do we switch over to the server memory?
          if (!query) {
            // Status code 303 asks the client to make a followup HTTP request with the query included.
            res.statusCode = 303;
            res.send();
            throw new URIError(); // Break
          }
          return callback(null, JSON.parse(query));
        }
        // The searchParams.entries returns an iterator, which we then turn into a regular JS Object.
        // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
        return callback(null, Object.fromEntries(searchParams.entries()));
      }
      if (req.method === 'POST') {
        // Construct the request body from the readable stream.
        const query = await (() => (
          new Promise((resolve) => {
            const buffers = [];
            req.on('data', (chunk) => {
              buffers.push(chunk);
            });
            req.on('end', () => {
              resolve(Buffer.concat(buffers).toString());
            });
          })))();

        if (hash) {
          await redis.set(hash, query);
        }
        return callback(null, JSON.parse(query));
      }
      return callback();
    }
    // If Redis Client does NOT exist...
    if (req.method === 'GET') {
      if (hash) {
        if (!cache[hash]) {
          // Status code 303 asks the client to make a followup HTTP request with the query included.
          res.statusCode = 303;
          res.send();
          throw new URIError(); // Break
        }
        return callback(null, cache[hash]);
      }
      // The searchParams.entries returns an iterator, which we then turn into a regular JS Object.
      // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
      return callback(null, Object.fromEntries(searchParams.entries()));
    }
    if (req.method === 'POST') {
      // Construct the request body from the readable stream.
      const query = await (() => (
        new Promise((resolve) => {
          const buffers = [];
          req.on('data', (chunk) => {
            buffers.push(chunk);
          });
          req.on('end', () => {
            resolve(Buffer.concat(buffers).toString());
          });
        })
      ))();

      if (hash) {
        cache[hash] = query;
      }
      return callback(null, JSON.parse(query));
    }
    return callback();
  } catch (err) {
    if (!(err instanceof URIError)) {
      return callback(err);
    }
    return undefined;
  }
};

module.export  = function graphqlHTTPCache(customHeaders) {
  const defaultHeaders = {
    'Cache-Control': 'max-age=5',
  };

  const finalHeaders = { ...defaultHeaders, ...customHeaders };

  return function setHeaders(req, res, next) {
    if (Object.hasOwn(res.locals, 'cacheable')) {
      res.set(finalHeaders);
    }
    return next();
  };
};

