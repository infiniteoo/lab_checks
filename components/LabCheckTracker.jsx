import React, { useState, useEffect } from "react";
import LabRequestExpandedItem from "./LabRequestItem";
import { formatDistanceToNow } from "date-fns"; // Import date-fns function

const LabCheckTracker = ({ labRequests }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  const getTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const getTimeAgoInMinutes = (date) => {
    const currentTime = new Date();
    const requestTime = new Date(date);
    const timeDifference = currentTime - requestTime; // Difference in milliseconds
    const minutesAgo = Math.floor(timeDifference / (1000 * 60)); // Convert to minutes
    return minutesAgo;
  };

  return (
    <div className="w-2/3 p-6 bg-white shadow-md rounded-lg ml-2">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Previous Lab Requests
      </h2>
      <ul className="mt-4">
        {labRequests &&
          labRequests.map((labRequest, index) => {
            const timeAgo = getTimeAgoInMinutes(labRequest.dateCreated); // Replace with your getTimeAgo function
            let backgroundColor = "";

            // Determine background color based on timeAgo
            if (timeAgo > 60) {
              backgroundColor = "red";
            } else if (timeAgo >= 30) {
              backgroundColor = "yellow";
            } else {
              backgroundColor = "green";
            }

            return (
              <li
                key={`${labRequest.id}-${index}`}
                className={`border-2 rounded  p-2 text-xl cursor-pointer text-black`}
                // Apply the background color
                onClick={() => toggleExpand(labRequest.id)}
              >
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col ">
                    <h3 className="items-left text-xl font-bold   ">
                      REQUEST #{index + 1}
                    </h3>
                    <h3 className="items-left">
                      Submitted: {labRequest.dateCreated}
                    </h3>
                  </div>
                  <div className="flex flex-col">
                    <h3
                      style={{ backgroundColor }}
                      className="text-white text-right rounded p-1 items-right text-sm text-bold"
                    >
                      Requested:{" "}
                      <span className="text-bold">
                        {getTimeAgo(labRequest.dateCreated)}{" "}
                      </span>
                    </h3>
                  </div>
                </div>
                {expanded[labRequest.id] && (
                  <LabRequestExpandedItem labRequests={labRequest.items} />
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default LabCheckTracker;
