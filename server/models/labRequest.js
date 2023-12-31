// models/labRequest.js
const format = require("date-fns/format");

// Example User model (using Mongoose for MongoDB)
const mongoose = require("mongoose");
const formattedDate = format(new Date(), "HH:mm:ss MM/dd/yyyy");

const labRequestSchema = new mongoose.Schema({
  items: {
    type: Array,
    required: true,
  },
  created_at: {
    type: Date,
    default: formattedDate,
  },
  orderNumber: {
    type: String,
    default: "0000000000",
  },

  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Approved", "Denied", "Closed"],
  },
  dateApproved: {
    type: String,
    default: "00:00:00 00/00/0000",
  },
  dateDenied: {
    type: String,
    default: "00:00:00 00/00/0000",
  },
  testResults: {
    type: String,
    default: "Pending",
  },
  testResultAcknowledgement: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("LabRequest", labRequestSchema);
