import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubmitLabRequest = ({
  csvData,
  setCsvData,
  setFileSelected,
  orderNumber,
}) => {
  const handleSubmit = async () => {
    try {
      // Loop through each labRequest and add LPN to testResults with "Pending" value
      csvData.forEach((labRequest) => {
        for (const item in labRequest) {
          if (!labRequest.testResults) {
            labRequest.testResults = {};
          }
          labRequest.testResults = "Pending";
          labRequest.orderNumber = orderNumber;
        }
      });

      // Make a POST request to the API with the csvData
      await axios.post("http://localhost:8888/api/lab-requests", csvData);
      setCsvData([]); // Clear the csvData
      setFileSelected(false);

      // Display a success message
      toast.success("Lab request submitted successfully!");
    } catch (error) {
      // Display an error message if the request fails
      toast.error("Failed to submit lab request. Please try again later.");
      console.error("Error submitting lab request:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-green-300 mt-3 items-center"
        onClick={handleSubmit}
      >
        Submit Lab Request
      </button>
    </div>
  );
};

export default SubmitLabRequest;
