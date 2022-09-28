const redisController = {};
// import redis from '../server';
// import { graphql } from 'graphql';
const Redis = require('ioredis');
const schema = require('../schema/schema');
const expressGraphQL = require('express-graphql').graphqlHTTP;

const redis = new Redis({
  'port': 6379,
  'host': '127.0.0.1'
});

redisController.getData = async (req, res, next) => {
  console.log('inside the redis controller middleware');
  let cacheEntry = await redis.get(`data:${req.body.query}`);
  console.log('cacheEntry', cacheEntry);
  if(cacheEntry){
    cacheEntry = JSON.parse(cacheEntry);
    return next({...cacheEntry, 'source' : 'data from cache'});
  }
  console.log('req.body.query', req.body.query);
  const apiResponse = await expressGraphQL({
    schema: schema,
    graphiql: true,
  });
  redis.set(`data:${req.body.query}`, JSON.stringify(apiResponse.data), 'EX', 10000);
    
  return next({...apiResponse.data, 'source': 'data from the API'});
};

module.exports = redisController;