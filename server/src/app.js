import express from 'express'
import cors from 'cors'
import connectDB from './config/database.js'
import routes from './routes.js'

const app = express()

connectDB()

// Middleware CORS
app.use(cors())

app.use(express.json())
app.use('/', routes)

export default app