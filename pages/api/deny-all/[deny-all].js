import supabase from "../../../supabase";

export default async function handler(req, res) {
  console.log("req.body", req.body);
  try {
    const labRequestId = req.body.id;
    console.log("labRequestId", labRequestId);

    // Update the lab request with the given ID
    const { data: updatedLabRequest, error: updateError } = await supabase
      .from("lab_requests")
      .upsert([
        {
          id: labRequestId,
          testResults: "Failed",
        },
      ]);

    if (updateError) {
      console.error("Error updating lab request:", updateError);
      res.status(500).json({
        error: "Failed to update lab request",
      });
      return;
    }

    // Update all items in the lab request to have "Failed" testResults
    const { data: updateManyData, error: updateManyError } = await supabase
      .from("lab_requests")
      .update({ "items:testResults": "Failed" })
      .match({ id: labRequestId });

    if (updateManyError) {
      console.error("Error updating lab request items:", updateManyError);
      res.status(500).json({
        error: "Failed to update lab request items",
      });
      return;
    }

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
