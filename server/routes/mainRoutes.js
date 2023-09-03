// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

// Define routes and their corresponding controller actions
router.post('/lab-requests', routeController.receiveLabRequest);
router.get('/lab-requests', routeController.sendLabRequests);
// More routes...

module.exports = router;
