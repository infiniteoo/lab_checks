"use client";
import React, { useState } from "react";

import DisplayedPallet from "./DisplayedPallet";
import "./LabratoryTools.css";

const LabratoryTools = ({ displayedPallet, setDisplayedPallet,selectedPallet,setSelectedPallet, selectedLabRequest, setSelectedLabRequest }) => {
 
  return (
    <div className="w-1/3 mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col  ">
      <div className="items-center">
        <div className="items-center">
          <h2 className="text-xl font-semibold text-center">Pallet Info</h2>
        </div>
        {displayedPallet && <DisplayedPallet item={displayedPallet}  
        selectedPallet={selectedPallet}
        setSelectedPallet={setSelectedPallet}
        selectedLabRequest={selectedLabRequest}
        setSelectedLabRequest={setSelectedLabRequest}
        
        />}

        

       
      </div>
    </div>
  );
};

export default LabratoryTools;
