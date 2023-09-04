import React, { useState } from "react";

const RequestedLPN = ({ item, onRemove, requestView, backgroundColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  if(requestView === "true"){
    let colorToUse = backgroundColor;
  } else {
    let colorToUse = "blue";
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleRemoveClick = () => {
    onRemove(item);
  };

  const handlePopupClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={`bg-blue-400 border-3 text-white p-1 text-center rounded-xl p-3 shadow-lg shadow-gray-200 w-32 rounded-lg ${
        isHovered ? "transform scale-105" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.LPN}
      {isHovered && !requestView && (
        <button
          className="bg-red-500 text-white rounded-full  absolute top-0 right-0 mr-1 mt-1 w-4 text-center h-5"
          onClick={handleRemoveClick}
        >
          X
        </button>
      )}
      {showPopup && (
        <div className="bg-white border border-gray-300 p-2 rounded-md absolute top-full left-0 mt-2">
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default RequestedLPN;
