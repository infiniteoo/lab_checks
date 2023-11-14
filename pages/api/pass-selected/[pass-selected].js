import { supabase } from "../../../supabase";

export default async function handler(req, res) {
  try {
    console.log("pass selected it", req.body);
    const labRequestId = req.body.id; // The ID of the Lab Request to update
    const lpnToMatch = req.body.lpn; // The LPN to match within the Lab Request

    // Retrieve the current Lab Request
    const { data: existingLabRequest, error: fetchError } = await supabase
      .from("lab_requests")
      .select("*")
      .eq("_id", labRequestId)
      .single();

    if (fetchError) {
      console.error("Error fetching lab request:", fetchError);
      res.status(500).json({
        error: "Failed to fetch lab request",
      });
      return;
    }

    // Update the matching item within the Lab Request's 'items' array
    const updatedItems = existingLabRequest.items.map((item) =>
      item.LPN === lpnToMatch
        ? {
            ...item,
            testResults: "Passed",
            status: "Approved",
            dateApproved: new Date().toISOString(),
          }
        : item
    );

    // Update the Lab Request with the modified 'items' array
    const { data: result, error: updateError } = await supabase
      .from("lab_requests")
      .upsert([
        {
          _id: labRequestId,
          items: updatedItems,
        },
      ]);

    if (updateError) {
      console.error("Error updating selected item:", updateError);
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
