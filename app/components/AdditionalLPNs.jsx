"use client";
import React, { useState } from "react";

const AdditionalLPNs = ({ csvData, setCsvData }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleUpdateClick = () => {
    // Split the inputValue into an array using commas as the delimiter
    const newLPNs = inputValue.split(",").map((lpn) => lpn.trim());
  
    // Create an array of objects with "LPN" as the key for each LPN
    const newLPNObjects = newLPNs.map((lpn) => ({ LPN: lpn }));
  
    // Combine the new LPN objects with the existing csvData array
    const updatedData = [...csvData, ...newLPNObjects];
  
    // Set the updated data back to csvData
    console.log('updatedData', updatedData)
    setCsvData(updatedData);
  
    // Clear the inputValue
    setInputValue("");
  };

  return (
    <div className="w-full mx-auto mt-5 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-1 text-center">Additional LPNs</h2>
      <label className="block text-gray-500 text-center text-sm mb-2">
        Enter additional LPNs below, separated by commas:
      </label>
      <div className="flex flex-row">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="e.g., LPN1, LPN2, LPN3"
        />
        <button
          className="bg-green-500 px-3 text-white"
          onClick={handleUpdateClick} // Call the update function when the button is clicked
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default AdditionalLPNs;
