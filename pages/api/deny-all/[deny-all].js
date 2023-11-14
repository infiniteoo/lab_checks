import supabase from "../../../supabase";
const LabRequest = require("../../../server/models/labRequest"); // Import the LabRequest model

export default async function handler(req, res) {
  console.log("req.body", req.body);
  try {
    const labRequestId = req.body.id;
    console.log("labRequestId", labRequestId);

    // Update the lab request with the given ID
    const updatedLabRequest = await LabRequest.findByIdAndUpdate(
      labRequestId,
      {
        testResults: "Failed",
      },
      { new: true }
    );

    // Update all items in the lab request to have "Failed" testResults
    await LabRequest.updateMany(
      { _id: labRequestId },
      { $set: { "items.$[].testResults": "Failed" } }
    );

    res.json({
      message: "Lab request and items updated successfully",
      updatedLabRequest,
    });
  } catch (error) {
    console.error("Error updating lab request and items:", error);
    res.status(500).json({
      error: "Failed to update lab request and items",
    });
  }
}
