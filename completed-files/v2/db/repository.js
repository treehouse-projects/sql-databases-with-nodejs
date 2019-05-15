'use strict';

class Repository {
  constructor(db) {
    this.db = db;
  }

  getMovies(cb) {
    this.db.all('SELECT * FROM Movies', [], cb);
  }
}

module.exports = Repository;
