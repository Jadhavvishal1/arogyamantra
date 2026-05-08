import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import appointmentRoutes from './routes/appointments.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import adminRoutes from './routes/admin.js'
import reelRoutes from './routes/reels.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Middleware
app.use(cors({ origin: '*', credentials: true }))
app.use(express.json())

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/arogyamantra')
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    console.log('ℹ️  Running without database — appointment submissions will still work (stored in memory)')
  }
}
connectDB()

// Routes
app.use('/api/appointments', appointmentRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api', adminRoutes)
app.use('/api', reelRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Arogya Mantra API running ✅' })
})

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Server error', details: err.message })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
