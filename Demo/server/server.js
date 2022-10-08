const path = require('path');
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema.js');
const cors = require('cors');
const redis = require('redis');
const dacheQL = require('./controllers/redisController');
const fetch = require('node-fetch');


const PORT = 3000;

const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);
client.connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(cors());

app.get('/', (req, res) => {
  console.log('getting index.html');
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/graphql', dacheQL({}, 2, 'http://localhost:3000/graphql2', 300), expressGraphQL({
  schema: schema,
  graphiql: true,
}));

app.use('/graphql2', expressGraphQL({
  schema: schema,
  graphiql: true,
}));

app.use((req, res) => res.status(404).send('Cannot get route'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT,  () => console.log(`listening on port ${PORT}...`));

module.exports = app;