import supabase from "../../../supabase";
const LabRequest = require("../../../server/models/labRequest"); // Import the LabRequest model

export default async function handler(req, res) {
  // depending on the test results, update the lab request
  try {
    console.log("hello from finalizeresults");
    // update the database with the status, dateApproved, dateDenied, and testResultsAcknowledgement
    const labRequestId = req.body.id;
    const testResults = req.body.status;
    const dateCompleted = new Date();
    const testResultAcknowledgement = false;

    const updatedLabRequest = await LabRequest.findByIdAndUpdate(
      labRequestId,
      {
        status: testResults,
        dateCompleted: dateCompleted,
        testResultAcknowledgement: testResultAcknowledgement,
      },
      { new: true }
    );

    res.json({
      message: "Lab request updated successfully",
      updatedLabRequest,
    });
  } catch (error) {
    console.error("Error updating lab request:", error);
    res.status(500).json({
      error: "Failed to update lab request",
    });
  }
}
