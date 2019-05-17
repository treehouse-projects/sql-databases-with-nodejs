'use strict';

const { repository } = require('./db');

(async () => {
  try {
    const movies = await repository.getMovies();
    console.log(movies);

    const movie = await repository.getMovie(1);
    console.log(movie);

    const newMovie = await repository.createMovie({
      title: 'New Movie',
      runtime: 90,
      releaseDate: '2000-01-01',
      isAvailableOnVHS: true,
    });
    console.log(newMovie);
  } catch (error) {
    console.error(error);
  }
})();
