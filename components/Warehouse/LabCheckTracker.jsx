import React, { useState, useEffect } from "react";
import LabRequestExpandedItem from "./LabRequestItem";
import { formatDistanceToNow } from "date-fns"; // Import date-fns function
import axios from "axios";
import HideCompletedSwitch from "./HideCompletedSwitch";
import uuid from "uuid-with-v6";

const LabCheckTracker = ({
  labRequests,
  hideClosed,
  setHideClosed,
  setLabRequests,
}) => {
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
    <div className="w-2/3  pl-6 pr-6 pb-6 pt-2 bg-white shadow-md rounded-lg ml-2 ">
      <div className="flex flex-row items-right justify-between">
        <div></div>
        <div className="">
          <HideCompletedSwitch
            hideClosed={hideClosed}
            setHideClosed={setHideClosed}
            labRequests={labRequests}
            setLabRequests={setLabRequests}
          />
        </div>
      </div>
      <ul className="mt-4">
        {labRequests &&
          labRequests.map((labRequest, index) => {
            const timeAgo = getTimeAgoInMinutes(labRequest.dateCreated);
            let statusBackgroundColor = "";
            let statusHighlight = "";
            let statusFontColor = "";

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
                statusFontColor = "white";
                break;
              case "Closed":
                statusBackgroundColor = "gray";
                statusHighlight = "Closed";
                statusFontColor = "white";
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
                  key={`${labRequest._id}-${uuid.v6()}`}
                  className={`border-2 rounded  p-2 text-xl cursor-pointer z-0 text-black`}
                  // Apply the background color
                >
                  <div
                    className="flex flex-row justify-between z-0"
                    onClick={() => toggleExpand(labRequest._id)}
                  >
                    <div className="flex flex-col">
                      <h3 className="items-left text-xl">
                        <span className="font-bold">
                          REQUEST #{labRequest.items.length - index + 1} |
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
                        style={{
                          backgroundColor: statusBackgroundColor,
                          color: statusFontColor,
                        }}
                        className="text-right text-sm rounded p-1 mt-1 z-1"
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
                      <div className="w-full flex flex-row items-center justify-center z-auto ">
                        <div
                          className={`w-1/6 bg-white-500 mt-4 hover:bg-green-600 hover:text-white text-green-600 border-green-400 border-2 font-bold py-3 px-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-center text-sm z-1 ${
                            labRequest.status === "Pending"
                              ? "opacity-0 pointer-events-none"
                              : ""
                          }  
                          
                          ${
                            labRequest.status === "Closed"
                              ? "opacity-0 pointer-events-none"
                              : ""
                          } `}
                          onClick={async () => {
                            // Handle button click when it's enabled
                            if (
                              labRequest.status !== "Pending" &&
                              labRequest.status !== "Closed"
                            ) {
                              // axios post to pass testResultAcknowledgement to true

                              let response = await axios.post(
                                process.env.NEXT_PUBLIC_ENV === "development"
                                  ? `/api/update/${labRequest._id}`
                                  : `https://pallettest.com/api/update/${labRequest._id}`,
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
