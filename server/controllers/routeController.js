const LabRequest = require("../models/labRequest"); // Import the LabRequest model

exports.receiveLabRequest = (req, res) => {
  // Create a new instance of the LabRequest model with req.body data
  const newLabRequest = new LabRequest({
    items: req.body,
    orderNumber: req.body[0].orderNumber,
    testResults: "Pending",
  });

  // Save the newLabRequest to the database
  newLabRequest
    .save()
    .then((result) => {
      res.json({ message: "Lab request saved successfully", result });
    })
    .catch((error) => {
      console.error("Error saving lab request:", error);
      res.status(500).json({ error: "Failed to save lab request" });
    });
};

exports.sendLabRequests = (req, res) => {
  // retrieve everything from the lab requests collection
  LabRequest.find()
    .then((labRequests) => {
      console.log("Lab requests retrieved successfully:", labRequests);
      res.json(labRequests);
    })
    .catch((error) => {
      console.error("Error retrieving lab requests:", error);
      res.status(500).json({ error: "Failed to retrieve lab requests" });
    });
};
