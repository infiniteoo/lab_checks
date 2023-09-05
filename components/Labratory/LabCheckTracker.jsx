import React, { useState, useEffect } from "react";
import LabRequestExpandedItem from "./LabRequestItem";
import { formatDistanceToNow } from "date-fns"; // Import date-fns function
import axios from "axios";

const LabCheckTracker = ({
  labRequests,
  displayedPallet,
  setDisplayedPallet,
  selectedPallet,
  setSelectedPallet,
  selectedLabRequest,
  setSelectedLabRequest,
}) => {
  const [expanded, setExpanded] = useState({});
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [totalTestedPallets, setTotalTestedPallets] = useState(0);

  console.log("displayedPallet", displayedPallet);
  const toggleExpand = (_id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [_id]: !prevExpanded[_id],
      // if expanded contains no items, setDisplayedPallet to empty array
    }));
    console.log("expanded", expanded);
   
  
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

  const handleLabRequestClick = async (_id) => {
    // Update the labRequest.testResults for all items in the labRequest
    // Set the labRequest.testResults to "Passed"
    console.log("handleLabRequestClick id value", _id);
    setSelectedLabRequest(
      labRequests.find((labRequest) => labRequest._id === _id)
    );
    console.log("selectedLabRequest", selectedLabRequest);
    toggleExpand(_id);
  };

  const handlePassAll = async () => {
    // Update the labRequest.testResults for all items in the labRequest
    // Set the labRequest.testResults to "Passed"
    // Update the labRequest.status to "Approved"
    // Update the labRequest.dateCompleted to the current date
    console.log("selectedLabRequest", selectedLabRequest);
    console.log("selectedLabRequest._id", selectedLabRequest._id);

    let result = await axios.post(`http://localhost:8888/api/approve-all`, {
      id: selectedLabRequest._id,

      testResults: "Passed",
      status: "Approved",
      dateApproved: new Date(),
      testResultAcknowledgement: false,
    });

    console.log(result);
  };

  const handleDenyAll = async () => {
    // Update the labRequest.testResults for all items in the labRequest
    // Set the labRequest.testResults to "Passed"
    // Update the labRequest.status to "Approved"
    // Update the labRequest.dateCompleted to the current date
    console.log("selectedLabRequest", selectedLabRequest);
    console.log("selectedLabRequest._id", selectedLabRequest._id);

    let result = await axios.post(`http://localhost:8888/api/deny-all`, {
      id: selectedLabRequest._id,

      testResults: "Failed",
      status: "Denied",
      dateApproved: new Date(),
      testResultAcknowledgement: false,
    });

    console.log(result);
  };
  const handlePassSelected = async () => {
    console.log("selectedPallet", selectedPallet);
    let result = await axios.post(`http://localhost:8888/api/pass-selected`, {
      lpn: selectedPallet.LPN,
      id: selectedLabRequest._id,
      testResults: "Passed",
      status: "Approved",
      dateApproved: new Date(),
      testResultAcknowledgement: false,
    });
    console.log(result);
  };
  const handleDenySelected = async () => {
    console.log("selectedPallet", selectedPallet);
    let result = await axios.post(`http://localhost:8888/api/deny-selected`, {
      lpn: selectedPallet.LPN,
      id: selectedLabRequest._id,
      testResults: "Failed",
      status: "Denied",
      dateApproved: new Date(),
      testResultAcknowledgement: false,
    });
    console.log(result);
  };

  const calculateLabRequestStats = () => {
    const labRequestStats = [];

    labRequests.forEach((item) => {
      const testedCount = item.items.filter(
        (lpn) => lpn.testResults === "Failed" || lpn.testResults === "Passed"
      ).length;

      labRequestStats.push({
        _id: item._id,
        totalPalletCount: item.items.length,
        testedPalletCount: testedCount,
      });
    });

    return labRequestStats;
  };

  const labRequestStats = calculateLabRequestStats();

  const shouldRenderFinalizeResults =
    labRequestStats.some(
      (stat) =>
        stat._id === selectedLabRequest._id &&
        stat.testedPalletCount === stat.totalPalletCount
    ) && selectedLabRequest.status !== "Closed";

  const handleFinalizeResults = async () => {
    console.log("finalized button hit");
  };

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg ml-2">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Previous Lab Requests
      </h2>
      <ul className="mt-4">
        {labRequests &&
          labRequests.map((labRequest, index) => {
            const timeAgo = getTimeAgoInMinutes(labRequest.dateCreated); // Replace with your getTimeAgo function
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
                    onClick={() => {
                      handleLabRequestClick(labRequest._id);
                    }}
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
                        style={{
                          backgroundColor: statusBackgroundColor,
                          color: statusFontColor,
                        }}
                        className="text-right text-sm rounded p-1 mt-1"
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
                        displayedPallet={displayedPallet}
                        setDisplayedPallet={setDisplayedPallet}
                        selectedLabRequest={selectedLabRequest}
                        setSelectedLabRequest={setSelectedLabRequest}
                        selectedPallet={selectedPallet}
                        setSelectedPallet={setSelectedPallet}
                      />
                      <div className="w-full flex flex-row justify-between mt-2">
                        <div className="flex flex-row h-10">
                          <div
                            className={`w-full bg-green-500 hover:bg-yellow-500 text-white font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-center justify-center items-center text-sm px-5 py-2 ${
                              labRequest.testResults === "Passed"
                                ? "opacity-0 pointer-events-none"
                                : ""
                            }`}
                            onClick={handlePassAll}
                          >
                            Pass All
                          </div>
                          <div
                            className={`w-full bg-red-500 hover:bg-yellow-500 text-white font-semibold  rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-center text-sm ml-1 px-5  justify-center items-center${
                              labRequest.testResults === "Passed"
                                ? "opacity-0 pointer-events-none"
                                : ""
                            }`}
                            onClick={handleDenyAll}
                          >
                            Deny All
                          </div>
                        </div>
                        {shouldRenderFinalizeResults && (
                          <div className="flex flex-row h-10">
                            <button
                              onClick={handleFinalizeResults}
                              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 items-center justify-center text-center py-1"
                            >
                              Finalize Results
                            </button>
                          </div>
                        )}
                        {displayedPallet.length !== 0 && (
                          <div className="flex flex-row ">
                            <div
                              className={`w-full bg-green-500 hover:bg-yellow-500 text-white font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer flex-wrap text-center text-sm px-5 py-2 ${
                                labRequest.testResults === "Passed"
                                  ? "opacity-0 pointer-events-none"
                                  : ""
                              }`}
                              onClick={handlePassSelected}
                            >
                              Pass Selected
                            </div>
                            <div
                              className={`w-full bg-red-500 hover:bg-yellow-500 text-white font-semibold  rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ml-1 text-center text-sm px-5 ${
                                labRequest.testResults === "Passed"
                                  ? "opacity-0 pointer-events-none"
                                  : ""
                              }`}
                              onClick={handleDenySelected}
                            >
                              Deny Selected
                            </div>
                          </div>
                        )}
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
