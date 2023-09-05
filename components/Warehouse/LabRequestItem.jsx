import React from "react";
import RequestedLPN from "./RequestedLPN";

const LabRequestExpandedItem = ({ labRequests, labRequest }) => {
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
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default LabRequestExpandedItem;
