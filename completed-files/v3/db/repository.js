'use strict';

class Repository {
  constructor(db) {
    this.db = db;
  }

  getMovies() {
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT id, title, runtime, releaseDate, isAvailableOnVHS
        FROM Movies
        ORDER BY title
      `, [], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  getMovie(id) {
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT id, title, runtime, releaseDate, isAvailableOnVHS
        FROM Movies
        WHERE id = ?
      `, [id], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = Repository;
