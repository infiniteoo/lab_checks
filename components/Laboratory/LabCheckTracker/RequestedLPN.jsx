import React, { useState } from "react";
// add a key to the object

const RequestedLPN = ({
  item,
  onRemove,
  requestView,
  backgroundColor,
  labRequest,
  displayedPallet,
  setDisplayedPallet,
  selectedLabRequest,
  setSelectedLabRequest,
  selectedPallet,
  setSelectedPallet,
  labRequestStats,
  statusChange,
  setStatusChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowPopup(false);
  };

  const handleRemoveClick = () => {
    onRemove(item);
  };

  const handlePalletClick = (e) => {
    console.log("selected pallet div", selectedPallet.divID);
    // reset current styling before change
    const currentPallet = document.getElementById(selectedPallet.divID);
    if (currentPallet) {
      currentPallet.style.borderColor = "";
      currentPallet.style.borderWidth = "";
      currentPallet.style.borderStyle = "";
    }

    setDisplayedPallet(item);

    setSelectedPallet({ item, divID: e.target.id });

    // set the border color of the selected pallet
    const selectedPalletDiv = document.getElementById(e.target.id);
    console.log(e.target.id);
    selectedPalletDiv.style.borderColor = "black";
    selectedPalletDiv.style.borderWidth = "3px";
    selectedPalletDiv.style.borderStyle = "solid";
  };

  const handleMouseMove = (e) => {
    setMouseX(e.pageX);
    setMouseY(e.pageY);
  };

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={`  text-white p-1 text-center focus: focus:outline-black  p-3 shadow-md shadow-gray-200 w-32  ${
        isHovered ? "transform scale-105" : ""
      } ${selectedPallet === item ? "selected-pallet" : ""}`}
      id={selectedLabRequest._id + "-" + item.LPN}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handlePalletClick}
      onMouseMove={handleMouseMove}
    >
      {item.LPN}
      {isHovered && !requestView && (
        <button
          className="bg-red-500 text-white rounded-full absolute top-0 right-0 mr-1 mt-1 w-4 text-center h-5"
          onClick={handleRemoveClick}
        >
          X
        </button>
      )}
    </div>
  );
};

export default RequestedLPN;
