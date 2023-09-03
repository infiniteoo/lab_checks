// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

// Define routes and their corresponding controller actions
router.get('/labRequest', routeController.receiveLabRequest);
// More routes...

module.exports = router;
