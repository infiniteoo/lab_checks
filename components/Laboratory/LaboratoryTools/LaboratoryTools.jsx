"use client";
import React from "react";

import DisplayedPallet from "./DisplayedPallet";

const LaboratoryTools = ({
  displayedPallet,
  selectedPallet,
  setSelectedPallet,
  selectedLabRequest,
  setSelectedLabRequest,
}) => {
  return (
    <div className="w-1/3 mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col  ">
      <div className="">
        <div className="">
          <h2 className="text-xl font-semibold text-black text-center">
            Pallet Info
          </h2>
          <div className="w-full h-2 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 relative mt-1 rounded-full"></div>
        </div>
        {displayedPallet && (
          <DisplayedPallet
            item={displayedPallet}
            selectedPallet={selectedPallet}
            setSelectedPallet={setSelectedPallet}
            selectedLabRequest={selectedLabRequest}
            setSelectedLabRequest={setSelectedLabRequest}
          />
        )}
      </div>
    </div>
  );
};

export default LaboratoryTools;
