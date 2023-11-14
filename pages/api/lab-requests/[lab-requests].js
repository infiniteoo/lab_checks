import supabase from "../../../supabase";
const LabRequest = require("../../../server/models/labRequest"); // Import the LabRequest model

export default async function handler(req, res) {
  if (req.METHOD === "GET") {
    // retrieve everything from the lab requests collection
    LabRequest.find()
      .then((labRequests) => {
        res.json(labRequests);
      })
      .catch((error) => {
        console.error("Error retrieving lab requests:", error);
        res.status(500).json({ error: "Failed to retrieve lab requests" });
      });
  } else if (req.METHOD === "POST") {
    // Create a new instance of the LabRequest model with req.body data
    const newLabRequest = new LabRequest({
      items: req.body,
      orderNumber: req.body[0].orderNumber,
      testResults: "Pending",
      testResultAcknowledgement: false,
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
  } else if (req.METHOD === "PUT") {
  } else if (req.METHOD === "DELETE") {
  } else {
  }
}
