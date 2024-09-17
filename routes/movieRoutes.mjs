import { Router } from "express";
import { MovieController } from "../Controllers/MovieCONTROLLER.mjs";

export const moviesRouter = new Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/id/:id', MovieController.getByID)

moviesRouter.patch('/id/:id', MovieController.updateMovie)

moviesRouter.post('/', MovieController.createMovie)

moviesRouter.get('/genre/:genre', MovieController.getByGender)