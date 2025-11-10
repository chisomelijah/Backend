// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const logger = require('./middleware/logger');
const imagesMiddleware = require('./middleware/imagesHandler');

const lessonRoutes = require('./routes/lessons');
const orderRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);
imagesMiddleware(app);

// Routes
app.use('/api/lessons', lessonRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => res.send('After-School API running...'));

// Connect DB and start
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
