// dotenv
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8888;
const mongoose = require('mongoose');

/* // Connect to the database (if using one)
mongoose.connect('mongodb://localhost/mydb'); */

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes setup
const mainRoutes = require('./routes/mainRoutes');
app.use('/api', mainRoutes);
// More route imports...

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
