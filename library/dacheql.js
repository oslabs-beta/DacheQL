
// const undacheable = {mutation: true, subscription: true};

// function DacheQL(endpoint, options) {
//   // if(options) console.log(Object.hasOwn(options, 'body'));
//   // if (Object.hasOwn(options, 'body') == false) {
//   //   return fetch(endpoint, options);
//   // }
//   const { query } = JSON.parse(options.body); 
//   //turning the query into an array at the start of object, and then removing the white space between 
//   //where the bracket was and the property
//   console.log('in dacheql, query:', JSON.parse(options.body));
//   let operationType;
//   if (query) {
//     operationType = query.split('{')[0].trim();
//   }
  
//   console.log('in dacheql, slit:', operationType);
//   if (Object.hasOwn(undacheable, operationType)) { // checking if undacheable is own property of operationType
//     return fetch(endpoint, options);
//   }
  
//   // const newOpts = { ...options, method: 'POST' };
//   const newOpts = operationType;
//   return new Promise((resolve, reject) => {
//     fetch(endpoint, newOpts)
//       .then((data) => {
//         // Status 303 indicates that hash is not found in server cache
//         // Upon receipt, send original request as follow-up
//         console.log('data in dacheql',data);
//         if (data.status === 303) {
//           fetch(endpoint, options)
//             .then((res) => resolve(res))
//             .catch((altErr) => reject(altErr));
//         } else {
//           resolve(data);
//         }
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// export default DacheQL;
/**
* @module dacheQL
*/

// Uncacheable GraphQl operation types - dacheQL will pass unaffected
const uncacheable = { mutation: true, subscription: true };

/**
* @param {string} endpoint - the string representing the endpoint the client would like to query.
* @param {Object} options - options object corresponding to the fetch API specification.
* @returns {Promise} - promise that resolves to the value returned either from the cache or the server,
* or terminates in an error, unless the error is that the server does not recognize our query param,
* in which case the promise does not resolve until a second fetch is sent and returned.
*/

function dacheQL(endpoint, options) {
  // If the body is undefined then let the request pass through as is
  // if (!Object.hasOwn(options, 'body')) {
  //   return fetch(endpoint, options);
  // }
  // Check if operation type is uncacheable, if so pass through as is
  const query = options.body.query;
  let operationType;
  if (query) {
    operationType = query.split('{')[0].trim();
  }
  console.log('in dacheql, slit:', operationType);
  // if (Object.hasOwn(uncacheable, operationType)) {
  //   return fetch(endpoint, options);
  // }
  // Reconstruct request as a GET request to make response HTTP cacheable
  // Hash body to store with URL constraint
  // const newOpts = { ...options, method: 'GET' };
  // const HASH = newOpts.body;
  // delete newOpts.body;
  // Construct new Promise to allow wrapper function to behave as a normal fetch
  return new Promise((resolve, reject) => {
    fetch(`${endpoint}`)
      .then((data) => {
        // Status 303 indicates that hash is not found in server cache
        // Upon receipt, send original request as follow-up
        // if (data.status === 303) {
        //   fetch(`${endpoint}/?${HASH}`, options)
        //     .then((res) => resolve(res))
        //     .catch((altErr) => reject(altErr));
        // } else {
        //   resolve(data);
        // }
        console.log('data in dacheql',data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default dacheQL;