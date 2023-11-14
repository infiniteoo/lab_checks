import { supabase } from "../../../supabase";

export default async function handler(req, res) {
  // depending on the test results, update the lab request
  try {
    console.log("hello from finalizeresults");
    // update the database with the status, dateApproved, dateDenied, and testResultsAcknowledgement
    const labRequestId = req.body.id;
    const testResults = req.body.status;
    const dateCompleted = new Date();
    const testResultAcknowledgement = false;
    console.log("req.body", req.body);

    let whichDate = testResults === "Approved" ? "dateApproved" : "dateDenied";
    console.log("whichDate", whichDate);

    const updateData = {
      _id: labRequestId,
      status: testResults,
      [whichDate]: dateCompleted.toISOString(),
      testResultAcknowledgement: testResultAcknowledgement,
    };

    const { data: updatedLabRequest, error } = await supabase
      .from("lab_requests")
      .upsert([updateData])
      .select("*");

    if (error) {
      console.error("Error updating lab request:", error);
      res.status(500).json({
        error: "Failed to update lab request",
      });
      return;
    }

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
