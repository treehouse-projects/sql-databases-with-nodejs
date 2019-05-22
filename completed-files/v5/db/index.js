'use strict';

const sqlite3 = require('sqlite3');
const Database = require('./database.js');
const Repository = require('./repository.js');

const db = new sqlite3.Database('movies.db');

// const db = new sqlite3.Database('movies.db', (err) => {
//   if (err) {
//     console.error('Error connecting to the database: ', err);
//   } else {
//     console.log('Connection to the database successful!');
//   }
// });

const repository = new Repository(new Database(db));

module.exports = {
  repository,
};
