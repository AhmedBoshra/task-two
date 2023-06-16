const express = require("express");
const bodyParser = require("body-parser");
const questionRoutes = require("./routes/questions");
const { connectDB } = require("./db");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middlewares
app.use(bodyParser.json());

// Use the question routes for all requests starting with '/api'
app.use("/api", questionRoutes);

// Connecting MongoDB
connectDB();

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
