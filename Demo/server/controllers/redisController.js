/* eslint-disable indent */
const fetch = require('node-fetch');
const { graphql } = require('graphql');

function dacheQL({ redis } = {}){
  if(redis){
    return async function redisCache(req, res, next) {
      // console.log(req.body);
      try{
        // if(req.method === 'GET'){
        //   Object.defineProperty(res.locals, 'cached', {
        //     enumerable: false,
        //     writable: false,
        //     configurable: false,
        //     value: true,
        //   });
        //   const query = await redis.get(req.body.query, (err,data) => {
        //     if(err) throw err;
        //     else return next();
        //   });
        //   // console.log('query', query);
        //   if(!query){
        //     return res.sendStatus(303);
        //   }
        //   req.method = 'POST';
        //   req.body = JSON.parse(query);
        //   console.log('got the key in redis');
        //   return next();
        // }
        if(req.method === 'POST'){
          const query = await redis.get(req.body.query);
          // console.log('query', query);
          if(!query){
            console.log('setting the key in redis');
          console.log('req.body.query', req.body.query);
          // let fetchedData;
          const fetchedData = await fetch('http://localhost:3000/graphql2', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              query: req.body.query,
            })
          })
          // console.log('right after fetch',fetchedData);
          // .then(res => res.json())
          // .then(data => fetchedData = data)
          .then((res) => {
            console.log('res',res);
            return res.json();
          })
          .then((data) => {
            console.log('data: ', JSON.stringify(data));
            return JSON.stringify(data);
          })
            .catch((err) => console.log('err in fetch server'));
         
          // console.log('response:', fetchedData);
          const obj = await redis.SETEX(req.body.query, 10000, fetchedData);
          console.log('response:', obj);
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

function httpCache(customHeaders) {
  const defaultHeaders = {
    'Cache-Control': 'max-age=10',
  };

  const finalHeaders = { ...defaultHeaders, ...customHeaders };

  return function setHeaders(req, res, next) {
    if (Object.hasOwn(res.locals, 'cached')) {
      res.set(finalHeaders);
    }
    return next();
  };
}

module.exports = {dacheQL, httpCache};