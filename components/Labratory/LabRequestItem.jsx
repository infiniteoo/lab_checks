import React from "react";
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
}) => {
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
                  labRequest={labRequest}
                  key={`${labRequest._id}-${index}`}
                  displayedPallet={displayedPallet}
                  setDisplayedPallet={setDisplayedPallet}
                  selectedLabRequest={selectedLabRequest}
                  setSelectedLabRequest={setSelectedLabRequest}
                  selectedPallet={selectedPallet}
                  setSelectedPallet={setSelectedPallet}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default LabRequestExpandedItem;
