import mysql from 'mysql2/promise'
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '../config.mjs'

const config = {
  port: DB_PORT,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
}

const connection = await mysql.createConnection(config)

export class MovieModel{
    static async getAll() {
        const [movies] = await connection.query('select BIN_TO_UUID(id) as id, title, director, duration, poster, rate from movies.movie ')
        return movies
    }
  
  static async getBydID({ id }) {

    const [movie] = await connection.query('select BIN_TO_UUID(id) as id, title, director, duration, poster, rate from movies.movie where BIN_TO_UUID(id) = ? ', [id])
    
    if (movie.length == 0) {
      return false
    }
    return {result: 'Successfully', data: movie[0]}
    
  }

  static async createMovie({ newMovie }) {
    const [uuidResult] = await connection.query('select UUID() uuid')
    const [{ uuid }] = uuidResult
    const movie = {
      id: uuid,
      ...newMovie.data
    }

    await connection.query(`
      insert into movies.movie(id,title,director,duration,poster,rate)
      values(UUID_TO_BIN(?),?,?,?,?,?)`, [movie.id, movie.title, movie.director, movie.duration, movie.poster, movie.rate])
    
    return movie
  }

  static async updateMovie({ newData, id }) {

  const [movie] = await connection.query('select BIN_TO_UUID(id) as id, title, director, duration, poster, rate from movies.movie where BIN_TO_UUID(id) = ? ', [id])    
    if (movie[0]) {
      const modifiedMovie = {
        ...movie[0],
        ...newData.data
      }
    await connection.query(`
      update movies.movie
      set title = ?, director = ?, duration = ?, poster = ?, rate = ?
      where BIN_TO_UUID(id) = ?`, [modifiedMovie.title, modifiedMovie.director, modifiedMovie.duration, modifiedMovie.poster, modifiedMovie.rate, id])
      
      return {result: "Successfully", modifiedMovie}
    } else {
      return {result: "Error", message: `The movie with ID ${id} does not exist`}
    }


    
  }
}