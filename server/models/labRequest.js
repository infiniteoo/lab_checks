// models/labRequest.js

// Example User model (using Mongoose for MongoDB)
const mongoose = require("mongoose");

const labRequestSchema = new mongoose.Schema({
  date: new Date(),
  lpns: [{ lpn: string }],
  
});

module.exports = mongoose.model("LabRequest", labRequestSchema);
