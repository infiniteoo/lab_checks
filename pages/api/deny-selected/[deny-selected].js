import supabase from "../../../supabase";
const LabRequest = require("../../../server/models/labRequest"); // Import the LabRequest model

export default async function handler(req, res) {
  try {
    const labRequestId = req.body.id; // The ID of the Lab Request to update
    const lpnToMatch = req.body.lpn; // The LPN to match within the Lab Request

    // Update the matching item within the specified Lab Request
    const result = await LabRequest.updateOne(
      { _id: labRequestId, "items.LPN": lpnToMatch },
      {
        $set: {
          "items.$.testResults": "Failed",
          "items.$.status": "Denied",
          "items.$.dateDenied": new Date(),
        },
      }
    );

    res.json({
      message: "Selected item updated successfully",
      result,
    });
  } catch (error) {
    console.error("Error updating selected item:", error);
    res.status(500).json({
      error: "Failed to update selected item",
    });
  }
}
