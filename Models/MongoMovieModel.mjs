import mongoose from "mongoose";
import { movieConnection } from "../Schemas/mongoMoviesSchema.mjs";


const PORT = '27017'
const DB_NAME = 'movies'
const database = mongoose.connection

mongoose.connect(`mongodb://127.0.0.1:${PORT}/${DB_NAME}`)

database.on('open', () => {
    console.log(`Database connected on: mongodb://127.0.0.1:${PORT}/${DB_NAME} `)
})

database.on('error', (error) => {
    console.log(error)
})

export class MovieModel {
    static async getAll() {
        try {
            const result = await movieConnection.find()
            return result
        } catch (err) {
            console.error(err)
        }
    }
  
    static async getBydID({ id }) {

        try {
            const result = await movieConnection.findById(id)
            return result
        } catch (error) {
            return { error: error.message }
        }
    }

    static async createMovie({ newMovie }) {
        try {
            const verifiedMovie = new movieConnection(newMovie.data)
            const document = verifiedMovie.save()
            return document
        } catch (error) {
            console.error(error)
        }
    }

    static async updateMovie({ newData, id }) {

        try {
            await movieConnection.findByIdAndUpdate(id, newData.data)
            return { message: 'saved Successfully' }
        } catch (error) {
            console.error(error)
        }

    
    }

    static async deleteMovie({ id }) {
        try {
            await movieConnection.findByIdAndDelete(id)
            return {message : 'The movie was deleted'}
        } catch (error) {
            console.error(error)
        }
    }

    static async getByGenre({ genre }) {
        try {
            const result = await movieConnection.find({ genres: genre })
            return result
        } catch (error) {
            console.error(error.message)
        }
    }
}