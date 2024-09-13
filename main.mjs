import express from 'express'
import { moviesRouter } from './routes/movieRoutes.mjs'
import { PORT } from './config.mjs'
const app = express()

app.use(express.json())

app.get('/', (req, res) => res.json({ title: "I am cooking", author: "Ivan" }))

app.use('/movies', moviesRouter)
app.listen(PORT,"0.0.0.0", () => console.log(`Example app listening on port http://localhost:${PORT}`))