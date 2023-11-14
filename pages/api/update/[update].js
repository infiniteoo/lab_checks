import supabase from "../../../supabase";
const LabRequest = require("../../../server/models/labRequest"); // Import the LabRequest model

export default async function handler(req, res) {
  // Update the lab request with the given id
  //
  LabRequest.findByIdAndUpdate(req.params["labrequestid"], req.body, {
    new: true,
  })
    .then((result) => {
      res.json({ message: "Lab request updated successfully", result });
    })
    .catch((error) => {
      console.error("Error updating lab request:", error);
      res.status(500).json({ error: "Failed to update lab request" });
    });
}
