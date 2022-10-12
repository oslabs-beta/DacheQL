const path = require('path');
// const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema.js');
import express, { Request, Response, NextFunction }  from 'express';
import { ErrObject } from '../../types';
const cors = require('cors');
const redis = require('redis');
const dacheQL = require('../server/controllers/redisController.js');


const PORT = process.env.PORT || 3000;

// const REDIS_PORT = process.env.PORT || 6379;
// const client = redis.createClient(REDIS_PORT);
// client.connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(cors());

app.use(express.static(path.resolve(__dirname, "../../dist")));

// app.get('/', (req: Request, res: Response) => {
//   console.log('getting index.html');
//   return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
// });
app.get('/*', (req: Request, res: Response) => {
  return res.sendFile(path.resolve(__dirname, "../../dist"), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
app.use('/graphql', dacheQL({}, 50, 'https://dacheql2.herokuapp.com/graphql2', 300), expressGraphQL({
  schema: schema,
  graphiql: true,
}), (req: Request, res: Response) => {
  return res.sendStatus(200)
});


app.use(`https://dacheql2.herokuapp.com/graphql2`, expressGraphQL({
  schema: schema,
  graphiql: true,
}));

app.use((req: Request, res: Response) => res.status(404).send('Cannot get route'));

app.use((err: ErrObject, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return next(res.status(errorObj.status).json(errorObj.message));
});

app.listen(PORT,  () => console.log(`listening on port ${PORT}...`));

export default app;