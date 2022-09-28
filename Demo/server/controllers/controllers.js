const redisController = {};
import redis from '../server';
import { graphql } from 'graphql';

const getData = async (req, res, next) => {
  let cacheEntry = await redis.get(`data:${req.body.query}`);

  if(cacheEntry){
    cacheEntry = JSON.parse(cacheEntry);
    return next({...cacheEntry, 'source' : 'data from cache'});
  }

  const apiResponse = await graphql(req.body.query);
  redis.set(`data:${req.body.query}`, JSON.stringify(apiResponse.data), 'EX', 10000);
    
  return next({...apiResponse.data, 'source': 'data from the API'});
};

module.exports = redisController;