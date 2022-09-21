// function dacheQL(endpoint, options) {
//   if(!Object.hasOwn(options, 'body')) {
//     return fetch(endpoint, options);
//   }
// }
const uncacheable = { mutation: true, subscription: true };

function dacheQL(endpoint, options) {
  // If the body is undefined then let the request pass through as is
  if (!Object.hasOwn(options, 'body')) {
    return fetch(endpoint, options);
  }
  // Check if operation type is uncacheable, if so pass through as is
  const { query } = JSON.parse(options.body);
  // console.log('options: ', options);
  // console.log('query: ', query);
  // console.log('typoeof: ', typeof query);
  // const stringedQuery = JSON.stringify(query);
  // console.log('stringedQuery: ', stringedQuery);
  const operationType = query.split('{')[0].trim();
  console.log('operationType: ', operationType);
  console.log('typeOf ', typeof operationType);
  if (Object.hasOwn(uncacheable, operationType)) {
    return fetch(endpoint, options);
  }
  // Reconstruct request as a GET request to make response HTTP cacheable
  // Hash body to store with URL constraint
  // const newOpts = { ...options, method: 'GET' };
  // const HASH = sha1(newOpts.body);
  // delete newOpts.body;
  // // Construct new Promise to allow wrapper function to behave as a normal fetch
  // return new Promise((resolve, reject) => {
  //   fetch(`${endpoint}/?hash=${HASH}`, newOpts)
  //     .then((data) => {
  //       // Status 303 indicates that hash is not found in server cache
  //       // Upon receipt, send original request as follow-up
  //       if (data.status === 303) {
  //         fetch(`${endpoint}/?hash=${HASH}`, options)
  //           .then((res) => resolve(res))
  //           .catch((altErr) => reject(altErr));
  //       } else {
  //         resolve(data);
  //       }
  //     })
      // .catch((err) => {
      //   reject(err);
      // });
//   });
}
  
const querySelect = {
    films:
    `{
      films {
        _id
        title
        episode_id
        director
        producer
        opening_crawl
      }
    }`,
  //   planets:
  //   `{
  //     planets {
  //       _id
  //       name
  //       rotation_period
  //       orbital_period
  //       diameter
  //       climate
  //       gravity
  //       terrain
  //       surface_water
  //       population
  //     }
  // }`
};

dacheQL('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: querySelect.films,
    })
});