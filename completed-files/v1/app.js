'use strict';

const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('movies.db');

// const db = new sqlite3.Database('movies.db', (err) => {
//   if (err) {
//     console.error('Error connecting to the database: ', err);
//   } else {
//     console.log('Connection to the database successful!');
//   }
// });

db.all('SELECT * FROM Movies', [], (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
