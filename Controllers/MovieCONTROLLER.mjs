import { MovieModel } from "../Models/MovieModel.mjs"
import { validateMovie, validatePartialMovie } from "../Schemas/moviesSchema.mjs"
export class MovieController{
    static getAll = async (req, res) => {
        
        const movies = await MovieModel.getAll()
        res.json(movies)
    }

    static getByID = async (req, res) => {
        const { id } = req.params
        const movie = await MovieModel.getBydID({ id })
        
        if (movie) {
            return res.status(201).json(movie)
        }

        return res.status(404).json({error: "The movie does not exist"})
    }

    static createMovie = async (req, res) => {

        const genres = (req.body).genre
        const newMovie = validateMovie(req.body)

        if (newMovie.error) {
            return res.status(400).json({ error: "You have to follow all the instructions" })
        }

        const movie = await MovieModel.createMovie({ newMovie, genres })
        
        res.status(201).json(movie)
        
        
    }

    static updateMovie = async (req, res) => {
        const {id} = req.params
        const newData = validatePartialMovie(req.body)

        const modifiedMovie = await MovieModel.updateMovie({ newData, id })
        
        res.status(200).json(modifiedMovie)
    }

    static getByGender = async (req, res) => {

        const { genre } = req.params
        
        const movies = await MovieModel.getByGenre({genre})

        if (movies) {
            res.status(200).json(movies)
        } else {
            res.json({message: 'There is no movies with that genre'})
        }
        
    }
}