import { Router } from "express";
import { MovieController } from "../Controllers/MovieCONTROLLER.mjs";

export const moviesRouter = new Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/:id', MovieController.getByID)

moviesRouter.patch('/:id', MovieController.updateMovie)

moviesRouter.post('/', MovieController.createMovie)