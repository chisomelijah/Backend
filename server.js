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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
