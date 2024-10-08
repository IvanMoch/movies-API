//import mysql from 'mysql2/promise'
//import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '../config.mjs'
import { pool } from '../db.mjs'

/*const config = {
  port: DB_PORT,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
}*/

//const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ offset = 0, limit = null } = {}) {
  try {
    if (limit !== null) {
      const [movies] = await pool.query('SELECT BIN_TO_UUID(id) as id, title, director, duration, poster, rate FROM movies.movie LIMIT ? OFFSET ?', [limit, offset]);
      return movies;
    }

    const [movies] = await pool.query(`
      SELECT BIN_TO_UUID(id) as id, title, director, duration, poster, rate 
      FROM movie`);
    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}


  static async getNumberRows() {
    const [data] = await pool.query('SELECT count(*) as count from movies.movie')
    if (data) {
      return data[0].count
    }
    return false
  }
  
  static async getBydID({ id }) {


    const [movie] = await pool.query(`select BIN_TO_UUID(id) as id, title, director, duration, poster, rate from movie where bin_to_uuid(id) = ? `, [id])
    if (movie.length == 0) {
      return false
    }
    return {result: 'Successfully', data: movie[0]}
    
  }

  static async createMovie({ newMovie, genres }) {
    const [data] = await pool.query('SELECT UUID() as uuid')
    let id

    if (data.length > 0) {
      id = data[0].uuid
    }

    const movie = {
      id,
      ...newMovie.data
    }

    await pool.query(`
      insert into movie(id,title,director,duration,poster,rate)
      values(UUID_TO_BIN(?),?,?,?,?,?)`, [movie.id, movie.title, movie.director, movie.duration, movie.poster, movie.rate])
    
    genres.forEach(async (element) => {
      
      const [data] = await pool.query(`select id as genreID from genre where name = ? `, [element])

      await pool.query(` insert into movie_genres values (UUID_TO_BIN(?),?)`,[id,data[0].genreID])
   });
    
    
    return movie
  }

  static async updateMovie({ newData, id }) {



  const [movie] = await pool.query(`select BIN_TO_UUID(id) as id, title, director, duration, poster, rate from movie where BIN_TO_UUID(id) = ? `, [id])    
    if (movie[0]) {
      const modifiedMovie = {
        ...movie[0],
        ...newData.data
      }
      await pool.query(`
      update movie
      set title = ?, director = ?, duration = ?, poster = ?, rate = ?
      where BIN_TO_UUID(id) = ?`, [modifiedMovie.title, modifiedMovie.director, modifiedMovie.duration, modifiedMovie.poster, modifiedMovie.rate, id])
      
      return {result: "Successfully", modifiedMovie}
    } else {
      return {result: "Error", message: `The movie with ID ${id} does not exist`}
    }


    
  }

  static async getByGenre({ genre }) {
    const [data] = await pool.query(` select id as genreID from genre where name = ? `, [genre])

    const [movies] = await pool.query(`
      select BIN_TO_UUID(id) as id, title, director, duration, poster, rate from movie m 
      join movie_genres mg on mg.movie_id = m.id and mg.genre_id = ?
      `, [data[0].genreID])
    
    if (movies) {
      return movies
    } else {
      return false
    }
  }
}