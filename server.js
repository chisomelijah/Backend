require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const lessonsRoute = require("./routes/lessons");
const ordersRoute = require("./routes/orders");

const app = express();


app.use(
  cors({
    origin: [
      "https://chisomelijah.github.io"
    ],
    methods: ["GET", "POST", "PUT"],
  })
);

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Database connection
connectDB();

// API Routes
app.use("/api/lessons", lessonsRoute);
app.use("/api/orders", ordersRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get('/search', async (req, res) => {
  try {
    const query = req.query.query;

    const results = await lessonsCollection.find({
      $or: [
        { topic: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { price: { $regex: query, $options: "i" } },
        { space: { $regex: query, $options: "i" } }
      ]
    }).toArray();

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed' });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
