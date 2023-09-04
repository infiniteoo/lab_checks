// dotenv
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8888;
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust this based on your requirements
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes setup
const mainRoutes = require("./routes/mainRoutes");
app.use("/api", mainRoutes);
// More route imports...

mongoose
  .connect(process.env.REACT_APP_LOCAL_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
