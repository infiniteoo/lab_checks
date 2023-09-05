import React, { useState, useEffect } from "react";
import "./AutomationStatus.css"; // Import your CSS file for styling

const AutomationStatus = ({ automationSwitch }) => {
  const [status, setStatus] = useState("Idle"); // Initial status is 'Idle'

  // Simulate status changes (you can replace this with actual data)
  useEffect(() => {
    setStatus(automationSwitch ? "Running" : "Idle");
  }, [automationSwitch]);

  return (
    <div className="automation-status">
      <div className={`status-display ${status.toLowerCase()}`}>
        <span>{status}</span>
      </div>
    </div>
  );
};

export default AutomationStatus;
