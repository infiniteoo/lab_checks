import React, { useState } from "react";

const AutomationSwitch = ({
  labRequests,
  setLabRequests,
  automationSwitch,
  setAutomationSwitch,
}) => {
  const toggleSwitch = () => {
    setAutomationSwitch(!automationSwitch);
    if (automationSwitch) {
      setAutomationSwitch(false);
    } else {
      // set lab requests to show all requests
      setAutomationSwitch(true);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center text-bold">
      <div
        className={`relative w-16 h-7 rounded-full bg-gray-300 p-1 cursor-pointer pb-6  border-2 ${
          automationSwitch ? "border-green-400" : "border-red-400"
        }`}
        onClick={toggleSwitch}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow-md   transform ${
            automationSwitch ? "translate-x-8" : ""
          } transition-transform`}
        ></div>
      </div>
      <p className="text-gray-500 text-sm  ml-1">
        {automationSwitch ? "Automation" : "Automation"}
      </p>
    </div>
  );
};

export default AutomationSwitch;
