import React, {useState, useEffect} from "react";
import RequestedLPN from "./RequestedLPN";

const LabRequestExpandedItem = ({
  labRequests,
  labRequest,
  displayedPallet,
  setDisplayedPallet,
  selectedLabRequest,
  setSelectedLabRequest,
  selectedPallet,
  setSelectedPallet,
  statusChange,
  setStatusChange
}) => {

  

  useEffect(() => {
   
    if (statusChange.status === "Passed" || statusChange.status === "Failed") {
      // Find the element with the matching id or lpn
      const elementToChange = document.querySelector(`[id="${statusChange.divID}"]`);
  
      // Check if the element exists before modifying its style
      if (elementToChange) {
        // Update the background color based on the status
        console.log("ELEMENT TO CHANGE", elementToChange);
        elementToChange.style.backgroundColor = statusChange.status === "Passed" ? "lightgreen" : "red";
      }
    }
  }, [statusChange]);
  



  return (
    <div className="flex flex-col items-center">
      <ul className="mt-2 flex flex-wrap justify-center items-stretch">
        {labRequests &&
          labRequests.map((item, index) => {
            let backgroundColor = "";

            // Determine background color based on item.status
            switch (item.testResults) {
              case "Pending":
                backgroundColor = "lightgray";
                break;
              case "Passed":
                backgroundColor = "lightgreen";
                break;
              case "Failed":
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
                  labRequest={labRequest}
                  key={`${labRequest._id}-${index}`}
                  displayedPallet={displayedPallet}
                  setDisplayedPallet={setDisplayedPallet}
                  selectedLabRequest={selectedLabRequest}
                  setSelectedLabRequest={setSelectedLabRequest}
                  selectedPallet={selectedPallet}
                  setSelectedPallet={setSelectedPallet}
                  statusChange={statusChange}
                  setStatusChange={setStatusChange}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default LabRequestExpandedItem;
