const fetch = require('node-fetch');

function dacheQL({ redis } = {}, endpoint = '', TTL){
  //if the user is using redis
  if(redis){
    return async function redisCache(req, res, next) {
      try{
        if(req.method === 'POST'){
          //check to see if the query is already in redis
          const query = await redis.get(req.body.query);
           
          //if the query is not in redis, follow this control flow
          if(!query){
            // console.log('setting the key in redis');
            // console.log('req.body.query', req.body.query);
            //fetch the graphql response to the user's specified endpoint
            const fetchedData = await fetch(endpoint, {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: req.body.query,
              })
            })
              .then((res) => {
              // console.log('res',res);
                return res.json();
              })
              .then((data) => {
              // console.log('data: ', JSON.stringify(data));
                return JSON.stringify(data);
              })
              .catch((err) => console.log('err in fetch server'));
           
            // console.log('response:', fetchedData);
            //set the key as the query in Redis with the value as the GraphQL response
            const obj = await redis.SETEX(req.body.query, TTL, fetchedData);
            // console.log('response:', obj);
          }
        }
        return next();
      } catch(err) {
        return next({
          message: ('err occurred', err),
          log: `err occurred in redis controller ${err}`,
          status: 400
        });
      }
    };
  }
}
  
  
module.exports = dacheQL;