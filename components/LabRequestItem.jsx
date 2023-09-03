import React from "react";

const LabRequestItem = ({ labRequests }) => {
  console.log("items", labRequests);
  return (
    <ul>
      {labRequests &&
        labRequests.map((labRequest) => (
          <li key={labRequest.id}>
            <h3>{labRequest.title}</h3>
            <ul>
              {labRequest.items &&
                labRequest.items.map((item) => (
                  <li key={item.id}>
                    <span>LPN: {item.LPN}</span>
                  </li>
                ))}
            </ul>
          </li>
        ))}
    </ul>
  );
};

export default LabRequestItem;
