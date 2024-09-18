import express from 'express'
import { moviesRouter } from './routes/movieRoutes.mjs'
import { PORT } from './config.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json())

app.use(express.static(path.join(__dirname,'/public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname,'/views/main.html')))

app.use('/movies', moviesRouter)
app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`))