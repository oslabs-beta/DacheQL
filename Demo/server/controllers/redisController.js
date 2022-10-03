function dacheQL({ redis } = {}, cache = {}){
  if(redis){
    return async function redisCache(req, res, next) {
      // console.log(req.body);
      try{
        if(req.method === 'GET'){
          Object.defineProperty(res.locals, 'cached', {
            enumerable: false,
            writable: false,
            configurable: false,
            value: true,
          });
          const query = await redis.get(req.body.query, (err,data) => {
            if(err) throw err;
            else return next();
          });
          // console.log('query', query);
          if(!query){
            return res.sendStatus(303);
          }
          req.method = 'POST';
          req.body = JSON.parse(query);
          console.log('got the key in redis');
          return next();
        }
        if(req.method === 'POST'){
          console.log('setting the key in redis');
          console.log('req.body.query', req.body.query);
          // const fetchedData = fetch('http://localhost:3000/graphql', {
          //   method: 'POST', 
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Accept': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     query: req.body.query,
          //   })
          // })
          //   .then((res) => {
          //     return res.json();
          //   });
          // console.log('fetchedData', fetchedData);
          const obj = await redis.SETEX(req.body.query, 3600, 'testing');
          
          console.log('response:', obj);
         
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