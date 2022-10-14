const { Pool, Client } = require('pg');



const pool = new Pool({
  host: 'database-1.cvaifkhdgcwh.us-east-1.rds.amazonaws.com',
  port: 5432,
  user: 'dacheql',
  database: 'dacheql',
  password: 'addy19compsci',
});

pool.connect((err) => {
  if (err) {
    console.log('error: ', err);
    return err;
  }

  console.log('it worked');
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

