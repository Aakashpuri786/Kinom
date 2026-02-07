import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import contactRoutes from './routes/contactRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/reviews', reviewRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Kinom API is running' })
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
