// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const routeController = require("../controllers/routeController");

// Define routes and their corresponding controller actions
router.post("/lab-requests", routeController.receiveLabRequest);
router.get("/lab-requests", routeController.sendLabRequests);
router.post("/update/:labrequestid", routeController.updateLabRequest);
router.post("/approve-all", routeController.approveAll);
router.post("/deny-all", routeController.denyAll);
router.post("/pass-selected", routeController.passSelected);
router.post("/deny-selected", routeController.denySelected);
router.post("/finalize-results", routeController.finalizeResults);
// More routes...

module.exports = router;
