import { supabase } from "../../../supabase";

export default async function handler(req, res) {
  // Update the lab request with the given id
  try {
    console.log("hello from update lab request, req.body", req.body);
    console.log("req.params", req.query);
    const labRequestId = req.query.update;
    const updatedLabRequest = await supabase.from("lab_requests").upsert([
      {
        _id: labRequestId,
        ...req.body,
      },
    ]);

    res.json({
      message: "Lab request updated successfully",
      result: updatedLabRequest.data,
    });
  } catch (error) {
    console.error("Error updating lab request:", error);
    res.status(500).json({
      error: "Failed to update lab request",
    });
  }
}
