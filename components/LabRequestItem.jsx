import React from "react";

const LabRequestExpandedItem = ({ labRequests }) => {
  console.log("labRequest", labRequests);
  

  
  return (
    <ul>
      {labRequests &&
        labRequests.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <h3>{item.title}</h3>
            <ul>
              <span>LPN: {item.LPN}</span>
            </ul>
          </li>
        ))}
    </ul>
  );
};

export default LabRequestExpandedItem;
