"use client"
import React, { useState } from "react";
import Papa from "papaparse"; // You need to install the papaparse library
import RequestedLPN from "./RequestedLPN";

const CSVReader = () => {
  const [csvData, setCsvData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
        }
      },
    });

    console.log(csvData);
  };

  return (
    <div className="w-1/2 mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">New Lab Request</h2>
        <label className="w-full py-2 px-4 border rounded focus:outline-none focus:ring focus:border-blue-300 cursor-pointer">
          <span className="text-gray-600">Choose CSV file</span>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <ul className="mt-4 flex flex-wrap justify-center">
          {csvData.map((row, index) => (
            <li key={index} className="mb-2 mr-2">
              <RequestedLPN item={row} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CSVReader;
