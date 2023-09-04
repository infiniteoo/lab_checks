import React, { useState, useEffect } from "react";
import RequestedLPN from "./RequestedLPN";
import { formatDistanceToNow } from "date-fns"; // Import date-fns function

const LabRequestExpandedItem = ({ labRequests, labRequest }) => {
  console.log("labRequest", labRequests);

  return (
    <div className="flex flex-col items-center">
      <ul className="mt-2 flex flex-wrap justify-center items-stretch">
        {labRequests &&
          labRequests.map((item, index) => {
            let backgroundColor = "";
            console.log("labrequest.status",labRequest.status)
            // Determine background color based on item.status
            switch (labRequest.status) {
              case "Pending":
                backgroundColor = "lightgray";
                break;
              case "Approved":
                backgroundColor = "lightgreen";
                break;
              case "Denied":
                backgroundColor = "red";
                break;
              default:
                backgroundColor = "gray";
            }

            return (
              <li
                key={`${item.id}-${index}`}
                className="mb-1 mr-1 m-1"
                style={{ backgroundColor }}
              >
                <RequestedLPN
                  item={item}
                  requestView={true}
                  backgroundColor={backgroundColor}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default LabRequestExpandedItem;
