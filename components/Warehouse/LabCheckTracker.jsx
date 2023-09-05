import React, { useState, useEffect } from "react";
import LabRequestExpandedItem from "./LabRequestItem";
import { formatDistanceToNow } from "date-fns"; // Import date-fns function
import axios from "axios";

const LabCheckTracker = ({ labRequests }) => {
  const [expanded, setExpanded] = useState({});
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  const toggleExpand = (_id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [_id]: !prevExpanded[_id],
    }));
  };

  // useEffect updates the component when expanded changes
  useEffect(() => {}, [expanded]);

  const getTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const getTimeAgoInMinutes = (date) => {
    const currentTime = new Date();
    onblur;
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
            let statusBackgroundColor = "";
            let statusHighlight = "";

            // Determine background color based on labRequest.status
            
            switch (labRequest.status) {
              case "Pending":
                statusBackgroundColor = "lightgray";
                statusHighlight = "Pending";
                break;
              case "Approved":
                statusBackgroundColor = "lightgreen";
                statusHighlight = "Approved";
                break;
              case "Denied":
                statusBackgroundColor = "red";
                statusHighlight = "Denied";
                break;
              default:
                statusBackgroundColor = "gray";
                statusHighlight = labRequest.status;
            }
            let backgroundColor = "";

            // Determine background color based on timeAgo
            if (timeAgo > 60) {
              backgroundColor = "red";
            } else if (timeAgo >= 30) {
              backgroundColor = "orange";
            } else {
              backgroundColor = "green";
            }

            return (
              <>
                <li
                  key={`${labRequest._id}`}
                  className={`border-2 rounded  p-2 text-xl cursor-pointer text-black`}
                  // Apply the background color
                >
                  <div
                    className="flex flex-row justify-between"
                    onClick={() => toggleExpand(labRequest._id)}
                  >
                    <div className="flex flex-col">
                      <h3 className="items-left text-xl">
                        <span className="font-bold">
                          REQUEST #{index + 1} |
                        </span>{" "}
                        Order #: {labRequest.orderNumber}
                      </h3>
                      <h3 className="items-left">
                        Submitted: {labRequest.dateCreated}
                      </h3>
                      <h3 className="items-left">
                        Shipment:{" "}
                        {labRequest.items[0]["Shipment\nShipment Line\n\n"]}
                      </h3>
                      <h3 className="items-left">
                        Load: {labRequest.items[0]["Load\nStop\n\n"]}
                      </h3>
                      <h3 className="items-left">
                        Door: {labRequest.items[0].Location}
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
                      <div
                        style={{ backgroundColor: statusBackgroundColor }}
                        className="text-right text-sm rounded p-1"
                      >
                        <p>Status: {statusHighlight}</p>
                      </div>
                    </div>
                  </div>

                  {expanded[labRequest._id] && (
                    <>
                      <LabRequestExpandedItem
                        labRequests={labRequest.items}
                        labRequest={labRequest}
                      />
                      <div className="w-full flex flex-row">
                        <div
                          className={`w-1/6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-center text-sm ${
                            labRequest.testResults === "Pending"
                              ? "opacity-0 pointer-events-none"
                              : ""
                          }`}
                          onClick={async () => {
                            // Handle button click when it's enabled
                            if (
                              labRequest.status !== "Pending" &&
                              labRequest.status !== "Closed"
                            ) {
                              console.log("labRequest._id", labRequest._id);
                              console.log("Button clicked!");
                              // axios post to pass testResultAcknowledgement to true

                              let response = await axios.post(
                                `http://localhost:8888/api/update/${labRequest._id}`,
                                {
                                  testResultAcknowledgement: true,
                                  status: "Closed",
                                }
                              );
                              setButtonEnabled(true);
                              console.log(response);
                            }
                          }}
                        >
                          Acknowledge Result
                        </div>
                        <div></div>
                      </div>
                    </>
                  )}
                </li>
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default LabCheckTracker;
