import React, { useState } from "react";
import uuid from "uuid-with-v6";

// add a key to the object
const Popup = ({ item, showPopup, mouseX, mouseY }) => {
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
    zIndex: 999,
  };

  const thStyle = {
    backgroundColor: "#f2f2f2",
    padding: "8px",
    textAlign: "left",
    zIndex: 999,
  };

  const tdStyle = {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    zIndex: 999,
  };

  const keyStyle = {
    fontWeight: "bold",
    zIndex: 999,
  };

  const renderTable = () => {
    const filteredItems = Object.entries(item).filter(
      ([, value]) => value !== null && value !== undefined
    );

    const keys = filteredItems.map(([key]) => key);
    const values = filteredItems.map(([, value]) => value);

    const numCols = 4;
    const numRows = Math.ceil(keys.length / numCols);

    return (
      <table style={tableStyle}>
        <tbody>
          {[...Array(numRows)].map((_, rowIdx) => (
            <tr key={rowIdx  + "-" + uuid.v6()} >
              {[...Array(numCols)].map((_, colIdx) => {
                const keyIdx = rowIdx * numCols + colIdx;
                const key = keys[keyIdx];
                const value = values[keyIdx];

                return (
                  <React.Fragment key={key  + "-" + uuid.v6()}>
                    <td style={thStyle}>
                      <span style={keyStyle}>{key}:</span>
                    </td>
                    <td style={tdStyle}>{value}</td>
                  </React.Fragment>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return <div style={popupStyle}>{renderTable()}</div>;
};

const RequestedLPN = ({
  item,
  onRemove,
  requestView,
  backgroundColor,
  labRequest,
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

  const handlePopupClick = () => {
    setShowPopup(!showPopup);
  };

  const handleMouseMove = (e) => {
    setMouseX(e.pageX);
    setMouseY(e.pageY);
  };

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={`bg-blue-400 border-3 text-white p-1 text-center rounded-xl p-3 shadow-lg shadow-gray-200 w-32 rounded-lg ${
        isHovered ? "transform scale-105" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handlePopupClick}
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
        key={item.LPN + "-" + uuid.v6()}
      />
    </div>
  );
};

export default RequestedLPN;
