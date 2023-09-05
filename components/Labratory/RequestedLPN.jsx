import React, { useState } from "react";
// add a key to the object
const Popup = ({
  item,
  showPopup,
  mouseX,
  mouseY,
  displayedPallet,
  setDisplayedPallet,
  selectedLabRequest,
  setSelectedLabRequest,
  selectedPallet,
  setSelectedPallet,
}) => {
  const popupStyle = {
    display: showPopup ? "block" : "none",
    position: "fixed",
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%)", // Center both vertically and horizontally
    backgroundColor: "white",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "4px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    zIndex: 999,
    color: "black",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  };

  const thStyle = {
    backgroundColor: "#f2f2f2",
    padding: "8px",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "8px",
    borderBottom: "1px solid #ddd",
  };

  const keyStyle = {
    fontWeight: "bold",
  };

  const renderTable = () => {
    const filteredItems = Object.entries(item).filter(
      ([, value]) => value !== null && value !== undefined
    );

    const keys = filteredItems.map(([key]) => key);
    const values = filteredItems.map(([, value]) => value);

    const numCols = 4;
    const numRows = Math.ceil(keys.length / numCols);

    return <></>;
  };

  return <div style={popupStyle}>{renderTable()}</div>;
};

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
    console.log("EVENT CLICK", e);

    setDisplayedPallet(item);
    setSelectedPallet({item, divID: e.target.id});
   
   
  };

  const handleMouseMove = (e) => {
    setMouseX(e.pageX);
    setMouseY(e.pageY);
  };

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={`  text-white p-1 text-center  p-3 shadow-md shadow-gray-200 w-32  ${
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
      <Popup
        item={item}
        showPopup={showPopup}
        mouseX={mouseX}
        mouseY={mouseY}
      />
    </div>
  );
};

export default RequestedLPN;
