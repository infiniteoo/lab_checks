import React, { useState } from "react";

const HideCompletedSwitch = ({labRequests, setLabRequests, hideClosed, setHideClosed}) => {
 
   
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (isOn) {
        setHideClosed(true);
        console.log(hideClosed)
        
      
        }
    else {
        // set lab requests to show all requests
        setHideClosed(false);
        console.log(hideClosed)
        
    }
  };

  return (
    <div className="flex flex-col justify-between items-center text-bold">
        <p className="text-gray-500 text-sm mr-1 pt-3">{isOn ? "Show Closed Requests" : "Show Closed Requests"}</p>
      <div
        className={`relative w-16 h-7 rounded-full bg-gray-300 p-1 cursor-pointer pb-6  border-2 ${hideClosed ? "border-red-400" : "border-green-400"
        }`}
        onClick={toggleSwitch}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow-md  transform ${
            hideClosed ? "translate-x-8" : ""
          } transition-transform`}
        ></div>
        
      </div>
        
    </div>
  );
};

export default HideCompletedSwitch;
