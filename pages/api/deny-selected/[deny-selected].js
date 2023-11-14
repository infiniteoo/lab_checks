import supabase from "../../../supabase";

export default async function handler(req, res) {
  try {
    const labRequestId = req.body.id; // The ID of the Lab Request to update
    const lpnToMatch = req.body.lpn; // The LPN to match within the Lab Request

    // Update the matching item within the specified Lab Request
    const { data: result, error } = await supabase
      .from("lab_requests")
      .update({
        "items:testResults": "Failed",
        "items:status": "Denied",
        "items:dateDenied": new Date().toISOString(),
      })
      .match({
        id: labRequestId,
        "items:LPN": lpnToMatch,
      });

    if (error) {
      console.error("Error updating selected item:", error);
      res.status(500).json({
        error: "Failed to update selected item",
      });
      return;
    }

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
