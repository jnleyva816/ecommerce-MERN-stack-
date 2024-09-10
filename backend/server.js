import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// Load environment variables
dotenv.config()
const port = process.env.PORT

// Connect to MongoDB
connectDB()

// Create an express app
const app = express()

// Middleware to accept JSON data in the body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware to accept cookies
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(5000, console.log(`Server running on http://localhost:${port}`))
