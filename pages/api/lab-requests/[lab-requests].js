import { supabase } from "../../../supabase";

export default async function handler(req, res) {
  console.log("req.METHOD:", req.method);
  if (req.method === "GET") {
    // Retrieve everything from the lab_requests table
    const { data, error } = await supabase.from("lab_requests").select("*");

    if (error) {
      console.error("Error retrieving lab requests:", error);
      res.status(500).json({ error: "Failed to retrieve lab requests" });
    } else {
      res.status(200).json(data);
    }
  } else if (req.method === "POST") {
    // Create a new row in the lab_requests table with req.body data
    const { data, error } = await supabase
      .from("lab_requests")
      .upsert([
        {
          items: req.body,
          orderNumber: req.body[0].orderNumber,
          testResults: "Pending",
          testResultAcknowledgement: false,
        },
      ])
      .select("*");

    if (error) {
      console.error("Error saving lab request:", error);
      res.status(500).json({ error: "Failed to save lab request" });
    } else {
      res.json({ message: "Lab request saved successfully", result: data });
    }
  } else if (req.method === "PUT") {
    // Handle updating a lab request
  } else if (req.method === "DELETE") {
    // Handle deleting a lab request
  } else {
    // Handle other HTTP methods if needed
  }
}
