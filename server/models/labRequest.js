// models/labRequest.js
const format = require("date-fns/format");


// Example User model (using Mongoose for MongoDB)
const mongoose = require("mongoose");
const formattedDate = format(new Date(), "HH:mm:ss MM/dd/yyyy");

const labRequestSchema = new mongoose.Schema({
  
  items: [{  }],
  dateCreated: {
    type: String,
    default: formattedDate,
    
  }
 
  
});

module.exports = mongoose.model("LabRequest", labRequestSchema);
