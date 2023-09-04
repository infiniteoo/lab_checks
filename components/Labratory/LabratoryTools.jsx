"use client";
import React, { useState } from "react";
import Papa from "papaparse"; // You need to install the papaparse library
import RequestedLPN from "./RequestedLPN";
import AdditionalLPNs from "./AdditionalLPNs";
import SubmitLabRequest from "./SubmitLabRequest";
import EnterOrderNumber from "./EnterOrderNumber";

const LabratoryTools = ({
  formattedDate,
  fetchLabRequests,
  setLabRequests,
  setLabRequestsUpdated,
}) => {
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

  

  return (
    <div className="w-1/3 mx-auto p-6 bg-white shadow-md rounded-lg  ">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">Labratory Tools</h2>
         
        </div>
        
       
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
      
    </div>
  );
};

export default LabratoryTools;
