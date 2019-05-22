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

    newMovie.title = 'Updated Movie Title';
    await repository.updateMovie(newMovie);

    const updatedNewMovie = await repository.getMovie(newMovie.id);
    console.log(updatedNewMovie);

    await repository.deleteMovie(newMovie.id);

    // await Promise.all([
    //   repository.deleteMovie(17),
    //   repository.deleteMovie(18),
    //   repository.deleteMovie(19),
    // ]);

    // const movies = await repository.getMovies();
    // console.log(movies);
  } catch (error) {
    console.error(error);
  }
})();
