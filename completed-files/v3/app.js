'use strict';

const { repository } = require('./db');

(async () => {
  try {
    const movies = await repository.getMovies();
    console.log(movies);

    const movie = await repository.getMovie(1);
    console.log(movie);
  } catch (error) {
    console.error(error);
  }
})();
