import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import process from 'process';
import { graphqlHTTP } from 'express-graphql';
import { expressDacheQL } from './controllers/queryController.js';
import { graphqlHTTPCache} from './controllers/graphqlHTTP.js';
import schema from'./schema/schema.js';

const PORT = 3000;

const app = express();

const folderPath = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.resolve(folderPath, '../dist')));

app.get('/', (req, res) => {
  console.log('getting index.html');
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/graphql', expressDacheQL({}), graphqlHTTPCache(), graphqlHTTP({
  schema: schema,
  graphiql: true
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


export default app;