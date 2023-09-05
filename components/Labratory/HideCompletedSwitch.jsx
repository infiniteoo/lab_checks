import React, { useState } from "react";

const HideCompletedSwitch = ({labRequests, setLabRequests}) => {
 
    const [unfilteredRequests, setUnfilteredRequests] = useState([]); 
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (isOn) {
        setUnfilteredRequests(labRequests);
        setLabRequests(labRequests.filter((request) => request.status !== "Closed"));
        }
    else {
        // set lab requests to show all requests
        setLabRequests(unfilteredRequests);
        
    }
  };

  return (
    <div className="flex flex-col justify-between items-center text-bold">
        <p className="text-gray-500 text-sm mr-1 pt-3">{isOn ? "Hide Closed Requests" : "Show Closed Requests"}</p>
      <div
        className={`relative w-16 h-7 rounded-full bg-gray-300 p-1 cursor-pointer ${
          isOn ? "bg-green-500" : "bg-red-500"
        }`}
        onClick={toggleSwitch}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow-md transform ${
            isOn ? "translate-x-8" : ""
          } transition-transform`}
        ></div>
        
      </div>
        
    </div>
  );
};

export default HideCompletedSwitch;
