const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { connectDB } = require('./config/db')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// Connect to MongoDB
connectDB()

// Routes
app.use('/api/lessons', require('./routes/lessons'))
app.use('/api/orders', require('./routes/orders')) // 👈 new

// Default route
app.get('/', (req, res) => res.send('After-School API running...'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
