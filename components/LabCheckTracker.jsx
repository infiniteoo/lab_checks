import React, { useState } from "react";
import LabRequestItem from "./LabRequestItem";

const LabCheckTracker = ({ labRequests }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  console.log('labRequests', labRequests)
  return (
    <div className="w-2/3 p-6 bg-white shadow-md rounded-lg ml-2">
      <h2 className="text-xl font-semibold mb-4">Previous Lab Requests</h2>
      <ul className="mt-4">
      {labRequests &&
        labRequests.map((labRequest, index) => (
          <li key={`${labRequest.id}-${index}` }className="border-2 rounded p-2 text-xl" onClick={() => toggleExpand(labRequest.id)}>
            
            <h3>REQUEST #{index + 1}: Submitted: {labRequest.dateCreated}</h3>
            {expanded[labRequest.id] && (
                <LabRequestItem labRequests={labRequest.items} />
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabCheckTracker;
