import { supabase } from "../../../supabase";

export default async function handler(req, res) {
  console.log("req.body", req.body);
  try {
    const labRequestId = req.body.id;
    console.log("labRequestId", labRequestId);

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

    // Update the Lab Request with the modified 'testResults'
    const { data: updatedLabRequest, error: updateError } = await supabase
      .from("lab_requests")
      .upsert([
        {
          _id: labRequestId,
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
    const updatedItems = existingLabRequest.items.map((item) => ({
      ...item,
      testResults: "Failed",
    }));

    // Update the Lab Request with the modified 'items' array
    const { data: updateManyData, error: updateManyError } = await supabase
      .from("lab_requests")
      .upsert([
        {
          _id: labRequestId,
          items: updatedItems,
        },
      ]);

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
