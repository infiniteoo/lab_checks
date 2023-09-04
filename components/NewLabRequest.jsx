"use client";
import React, { useState } from "react";
import Papa from "papaparse"; // You need to install the papaparse library
import RequestedLPN from "./RequestedLPN";
import AdditionalLPNs from "./AdditionalLPNs";
import SubmitLabRequest from "./SubmitLabRequest";
import EnterOrderNumber from "./EnterOrderNumber";

const NewLabRequest = ({ formattedDate, fetchLabRequests }) => {
  const [csvData, setCsvData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileSelected, setFileSelected] = useState(false); // Track if a file is selected
  const [orderNumber, setOrderNumber] = useState("");

  const onRemove = (item) => {
    setCsvData(csvData.filter((row) => row.LPN !== item.LPN));
  };

  const updatedCsvData = csvData.filter((row) => {
    const lpnValue = row.LPN;
    if (lpnValue && lpnValue.toString().startsWith("L0")) {
      return false; // Exclude this object
    }
    return true; // Include this object
  });

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) {
      setErrorMessage("Please select a CSV file.");
      return;
    }
    if (!orderNumber) {
      setErrorMessage("Please enter an order number first.");
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
          // Filter out LPNs that start with "L0"
          const filteredData = result.data.filter((row) => {
            return !row.LPN || !row.LPN.toString().startsWith("L0");
          });

          console.log(filteredData);
          setCsvData(filteredData);
          setErrorMessage("");
          setFileSelected(true); // Set fileSelected to true
        }
      },
    });

    setCsvData(updatedCsvData);
    /* fetchLabRequests(); */
  };

  return (
    <div className="w-1/3 mx-auto p-6 bg-white shadow-md rounded-lg  ">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">New Lab Request</h2>
          {fileSelected && (
            <>
              <p className="text-gray-600">
                Last updated: {formattedDate}
              </p>
              <p className="text-gray-600 text-bold text-xl">
                Order number: <span className="text-blue-600">{orderNumber}</span>
              </p>
            </>
          )}
        </div>
        {!fileSelected && (
          <EnterOrderNumber
            orderNumber={orderNumber}
            setOrderNumber={setOrderNumber}
          />
        )}
        {!fileSelected ? (
          <label className="w-1/4 py-2 px-4 border rounded focus:outline-none focus:ring focus:border-blue-300 cursor-pointer mt-2 bg-green-500 text-center">
            <span className="text-white">Open CSV file</span>
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
          <ul className="mt-1 flex flex-wrap justify-center items-stretch">
            {csvData.map((row, index) => (
              <li key={index} className="mb-1 mr-1">
                <RequestedLPN item={row} onRemove={onRemove} />
              </li>
            ))}
          </ul>
        )}

        {fileSelected && (
          <AdditionalLPNs setCsvData={setCsvData} csvData={csvData} />
        )}
      </div>
      {fileSelected && (
        <SubmitLabRequest
          setCsvData={setCsvData}
          csvData={csvData}
          setFileSelected={setFileSelected}
          orderNumber={orderNumber}
        />
      )}
    </div>
  );
};

export default NewLabRequest;
