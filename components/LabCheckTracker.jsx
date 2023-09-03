import React, { useState } from "react";
import LabRequestItem from './LabRequestItem'

const LabCheckTracker = ({ labRequests }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  return (
    <div className="w-2/3 p-6 bg-white shadow-md rounded-lg ml-2  ">
      <h2 className="text-xl font-semibold mb-4">Previous Lab Requests</h2>
      <ul className="mt-4">
        {labRequests &&
          labRequests.map((labRequest) => (
            <li key={labRequest.id}>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => toggleExpand(labRequest.id)}
              >
                {labRequest.title}
              </button>
              {expanded[labRequest.id] && (
                <LabRequestItem labRequests={[labRequest]} />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LabCheckTracker;
