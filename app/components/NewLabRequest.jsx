"use client";
import React, { useState } from "react";
import Papa from "papaparse"; // You need to install the papaparse library
import RequestedLPN from "./RequestedLPN";
import AdditionalLPNs from "./AdditionalLPNs";
import SubmitLabRequest from "./SubmitLabRequest";
import { format } from "date-fns"; // Import date-fns format function

const NewLabRequest = ({ formattedDate }) => {
  const [csvData, setCsvData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileSelected, setFileSelected] = useState(false); // Track if a file is selected

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) {
      setErrorMessage("Please select a CSV file.");
      return;
    }

    Papa.parse(file, {
      header: true, // If your CSV file has a header row
      dynamicTyping: true, // Automatically detect numeric values
      skipEmptyLines: true, // Skip empty lines
      complete: (result) => {
        if (result.errors.length > 0) {
          setErrorMessage("Error parsing CSV file. Please check the format.");
        } else {
          console.log(result.data);
          setCsvData(result.data);
          setErrorMessage("");
          setFileSelected(true); // Set fileSelected to true
        }
      },
    });
  };

  return (
    <div className="w-1/2 mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">New Lab Request</h2>
          <p className="text-gray-600 mb-4">Last updated: {formattedDate}</p>
        </div>

        {!fileSelected ? (
          <label className="w-full py-2 px-4 border rounded focus:outline-none focus:ring focus:border-blue-300 cursor-pointer">
            <span className="text-gray-600">Choose CSV file</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        ) : (
          <p className="text-gray-600 mt-2"></p>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {fileSelected && (
          <ul className="mt-1 flex flex-wrap justify-center">
            {csvData.map((row, index) => (
              <li key={index} className="mb-1 mr-1">
                <RequestedLPN item={row} />
              </li>
            ))}
          </ul>
        )}

        {fileSelected && (
          <AdditionalLPNs setCsvData={setCsvData} csvData={csvData} />
        )}
      </div>
      {fileSelected && <SubmitLabRequest csvData={csvData} />}
    </div>
  );
};

export default NewLabRequest;
