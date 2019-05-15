'use strict';

const { repository } = require('./db');

repository.getMovies((err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
