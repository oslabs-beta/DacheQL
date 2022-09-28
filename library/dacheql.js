// export {};

// const fetch = require('node-fetch');

// class DacheQL {
  
//   constructor(redisClient, origin) {
//     this.client = redisClient;
//     this.client.connect();
//     this.client.on('error', (err) => console.log('Redis Client Error', err));
//     this.cacheMiddleware = async (req, res) => {
//       // Fetch Request to return response from /transversal endpoint
//       const request = async (endpoint, queryString) => {
//         const res = await fetch(endpoint, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//           },
//           body: JSON.stringify({
//             query: queryString,
//           }),
//         })
//           .then((res) => res.json())
//           .then((data) => data);
//         return res;
//       };

//       // Throw error is req.body.query is undefined
//       if (req.body.query === '' || req.body.query === 'undefined' || req.body.query === null)
//         return res.status(400).json({
//           Error: 'GraphQL query is empty. Please use an appropriate query string.',
//         });

//       // Set Query string key for Redis
//       const query = `"query": ${JSON.stringify(req.body.query)}}`;

//       // Get cached data & checking if key/value exists
//       const cache = JSON.parse(await this.get(query));

//       // If cache does not exist
//       if (!cache) {
//         const data = await request(`/graphql`, req.body.query);
//         await this.set(query, JSON.stringify(data));
//         return res.status(200).json(data);
//       } else {
//         // If cache exists
//         return res.status(200).json({ cache: cache });
//       }
//     };
//   }

//   // Set key & value in Redis
//   async set(name, data) {
//     try {
//       await this.client.set(name, data);
//     } catch (err) {
//       console.log('Data save failed in redis...', err);
//     }
//   }

//   // Get key & value in Redis
//   async get(name) {
//     try {
//       const data = await this.client.get(name);
//       return data;
//     } catch (err) {
//       console.log('Failed to retrieve data from redis...', err);
//     }
//   }
// }

// module.exports = DacheQL;