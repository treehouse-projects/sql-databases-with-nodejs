'use strict';

class Repository {
  constructor(db) {
    this.db = db;
  }

  getMovies() {
    return this.db.all(`
      SELECT id, title, runtime, releaseDate, isAvailableOnVHS
      FROM Movies
      ORDER BY title;
    `);
  }

  getMovie(id) {
    return this.db.get(`
      SELECT id, title, runtime, releaseDate, isAvailableOnVHS
      FROM Movies
      WHERE id = ?;
    `, id);
  }

  async createMovie({
    title,
    runtime,
    releaseDate,
    isAvailableOnVHS,
  }) {
    await this.db.run(`
      INSERT INTO Movies
        (title, runtime, releaseDate, isAvailableOnVHS, createdAt, updatedAt)
      VALUES
        (?, ?, ?, ?, datetime('now'), datetime('now'));
    `,
    title,
    runtime,
    releaseDate,
    isAvailableOnVHS);

    const { id } = await this.db.get(`
      SELECT last_insert_rowid() as id;
    `);

    return this.getMovie(id);

    // return new Promise((resolve, reject) => {
    //   this.db.run(`
    //     INSERT INTO Movies
    //       (title, runtime, releaseDate, isAvailableOnVHS, createdAt, updatedAt)
    //     VALUES
    //       (?, ?, ?, ?, datetime('now'), datetime('now'));
    //   `, [
    //     movie.title,
    //     movie.runtime,
    //     movie.releaseDate,
    //     movie.isAvailableOnVHS,
    //   ], (err) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       this.db.all(`
    //         SELECT last_insert_rowid() as id;
    //       `, [], (err, data) => {
    //         if (err) {
    //           reject(err);
    //         } else {
    //           resolve(this.getMovie(data[0].id));
    //         }
    //       });
    //     }
    //   });
    // });
  }

  updateMovie(movie) {
    return this.db
      .run(`
        UPDATE Movies SET
          title = ?,
          runtime = ?,
          releaseDate = ?,
          isAvailableOnVHS = ?,
          updatedAt = datetime('now')
        WHERE id = ?;
      `,
      movie.title,
      movie.runtime,
      movie.releaseDate,
      movie.isAvailableOnVHS,
      movie.id);
  }

  deleteMovie(id) {
    return this.db
      .run(`
        DELETE FROM Movies
        WHERE id IN
          (SELECT id FROM Movies WHERE id = ? LIMIT 1);
      `, id);
  }
}

module.exports = Repository;
