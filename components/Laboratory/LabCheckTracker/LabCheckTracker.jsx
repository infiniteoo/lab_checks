import axios from "axios";
import React, { useState } from "react";
import LabRequestExpandedItem from "./LabRequestItem";
import HideCompletedSwitch from "./HideCompletedSwitch";
import {
  getTimeAgo,
  getTimeAgoInMinutes,
  toggleExpand,
} from "../../../utils/labRequestTools";

const LabCheckTracker = ({
  labRequests,
  displayedPallet,
  setDisplayedPallet,
  selectedPallet,
  setSelectedPallet,
  selectedLabRequest,
  setSelectedLabRequest,
  setLabRequests,
  hideClosed,
  setHideClosed,
}) => {
  const [expanded, setExpanded] = useState({});
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [totalTestedPallets, setTotalTestedPallets] = useState(0);
  const [statusChange, setStatusChange] = useState({});

  const handleLabRequestClick = (_id) => {
    const labRequest = labRequests.find((request) => request._id === _id);
    setSelectedLabRequest(labRequest);
    setExpanded((prevExpanded) => toggleExpand(prevExpanded, _id));
  };

  const handlePassAll = async () => {
    const result = await axios.post(
      process.env.NEXT_PUBLIC_ENV === "development"
        ? `/api/approve-all`
        : `https://pallettest.com/api/approve-all`,
      {
        id: selectedLabRequest._id,
        testResults: "Passed",
      }
    );

    selectedLabRequest.items.forEach((item) => {
      const divID = `${selectedLabRequest._id}-${item.LPN}`;
      const elementToChange = document.querySelector(`[id="${divID}"]`);
      if (elementToChange) {
        elementToChange.style.backgroundColor = "lightgreen";
      }
    });

    console.log(result);
  };

  const handleDenyAll = async () => {
    const result = await axios.post(
      process.env.NEXT_PUBLIC_ENV === "development"
        ? `/api/deny-all`
        : `https://pallettest.com/api/deny-all`,
      {
        id: selectedLabRequest._id,
        testResults: "Pending",
      }
    );

    selectedLabRequest.items.forEach((item) => {
      const divID = `${selectedLabRequest._id}-${item.LPN}`;
      const elementToChange = document.querySelector(`[id="${divID}"]`);
      if (elementToChange) {
        elementToChange.style.backgroundColor = "red";
      }
    });

    console.log(result);
  };

  const handlePassSelected = async () => {
    const result = await axios.post(
      process.env.NEXT_PUBLIC_ENV === "development"
        ? `/api/pass-selected`
        : `https://pallettest.com/api/pass-selected`,
      {
        lpn: selectedPallet.item.LPN,
        id: selectedLabRequest._id,
        testResults: "Passed",
        status: "Approved",
        dateApproved: new Date(),
        testResultAcknowledgement: false,
      }
    );

    setStatusChange({
      status: "Passed",
      divID: selectedPallet.divID,
    });

    console.log(result);
  };

  const handleDenySelected = async () => {
    const result = await axios.post(
      process.env.NEXT_PUBLIC_ENV === "development"
        ? `/api/deny-selected`
        : `https://pallettest.com/api/deny-selected`,
      {
        lpn: selectedPallet.item.LPN,
        id: selectedLabRequest._id,
        testResults: "Failed",
        status: "Denied",
        dateApproved: new Date(),
        testResultAcknowledgement: false,
      }
    );

    setStatusChange({
      status: "Failed",
      divID: selectedPallet.divID,
    });

    console.log(result);
  };

  const calculateLabRequestStats = () => {
    return labRequests.map((item) => {
      const testedCount = item.items.filter(
        (lpn) => lpn.testResults === "Failed" || lpn.testResults === "Passed"
      ).length;

      return {
        _id: item._id,
        totalPalletCount: item.items.length,
        testedPalletCount: testedCount,
      };
    });
  };

  const labRequestStats = calculateLabRequestStats();

  const shouldRenderFinalizeResults =
    labRequestStats.some(
      (stat) =>
        stat._id === selectedLabRequest._id &&
        stat.testedPalletCount === stat.totalPalletCount
    ) &&
    selectedLabRequest.status !== "Closed" &&
    selectedLabRequest.status !== "Approved";

  const handleFinalizeResults = async () => {
    let status = "Approved";

    selectedLabRequest.items.forEach((item) => {
      if (item.testResults === "Failed") {
        status = "Denied";
      }
    });

    const result = await axios.post(
      process.env.NEXT_PUBLIC_ENV === "development"
        ? `/api/finalize-results`
        : `https://pallettest.com/api/finalize-results`,
      {
        id: selectedLabRequest._id,
        status: status,
        dateCompleted: new Date(),
        testResultAcknowledgement: false,
      }
    );

    console.log(result);
  };

  return (
    <div className="w-full  pl-6 pr-6 pb-6 pt-2 bg-white shadow-md rounded-lg ml-2">
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
        {labRequests.map((labRequest, index) => {
          const timeAgo = getTimeAgoInMinutes(labRequest.dateCreated);
          let statusBackgroundColor = "";
          let statusHighlight = "";
          let statusFontColor = "";
          let statusBorder = "";

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
              statusBackgroundColor = "black";
              statusHighlight = "Denied";
              statusFontColor = "white";
              statusBorder = "4px solid red";
              break;
            default:
              statusBackgroundColor = "gray";
              statusHighlight = labRequest.status;
          }

          let backgroundColor = "";

          if (timeAgo > 60) {
            backgroundColor = "red";
          } else if (timeAgo >= 30) {
            backgroundColor = "orange";
          } else {
            backgroundColor = "green";
          }

          return (
            <li
              key={`${labRequest._id}`}
              className={`border-2 rounded  p-2 text-xl cursor-pointer text-black`}
            >
              <div
                className={`flex flex-row justify-between`}
                onClick={() => {
                  handleLabRequestClick(labRequest._id);
                }}
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
                      border: statusBorder,
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
                    statusChange={statusChange}
                    setStatusChange={setStatusChange}
                  />
                  <div className="w-full flex flex-row justify-between mt-2">
                    <div className="flex flex-row h-10">
                      <div
                        className={`w-full bg-white-500 hover:bg-green-700 hover:text-white text-green-700 border-2 border-green-600 font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-center justify-center items-center text-sm px-5 py-2 ${
                          labRequest.testResults === "Passed"
                            ? "opacity-0 pointer-events-none"
                            : ""
                        }`}
                        onClick={handlePassAll}
                      >
                        Pass All
                      </div>
                      <div
                        className={`w-full bg-white  hover:bg-red-500 hover:text-white text-red-600 font-bold border-red-600 border-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-center text-sm ml-1  px-5   ${
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
                      <div className="flex flex-row h-10 justify-center text-center items-center my-3">
                        <div
                          onClick={handleFinalizeResults}
                          className="px-4 py-1 text-black my-2 bg-white font-bold border-black border-4 rounded-md hover:bg-black hover:text-white focus:outline-none focus:ring focus:ring-blue-200 items-center justify-center text-center py-1"
                        >
                          Finalize Results
                        </div>
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
                          Pass
                        </div>
                        <div
                          className={`w-full bg-red-500 hover:bg-yellow-500 text-white font-semibold  rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ml-1 text-center text-sm py-2 px-5 ${
                            labRequest.testResults === "Passed"
                              ? "opacity-0 pointer-events-none"
                              : ""
                          }`}
                          onClick={handleDenySelected}
                        >
                          Deny
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LabCheckTracker;
