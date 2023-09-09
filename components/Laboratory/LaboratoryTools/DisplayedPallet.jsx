import React from "react";
import "./LaboratoryTools.css"; // Import your CSS file

const DisplayedPallet = ({ item }) => {
  const popupStyle = {
    backgroundColor: "white",
    padding: "10px",
    color: "black",
    display: "flex",
  };

  const tableContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  };

  const tableStyle = {
    flex: "1", // Allow the table to stretch and fill the container
    marginBottom: "20px",
    minWidth: "300px", // Minimum width to avoid extreme shrinking
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

    const numCols = 1;
    const numRows = Math.ceil(keys.length / numCols);

    return (
      <table style={tableStyle} className="data-table">
        <tbody>
          {[...Array(numRows)].map((_, rowIdx) => (
            <tr key={rowIdx}>
              {[...Array(numCols)].map((_, colIdx) => {
                const keyIdx = rowIdx * numCols + colIdx;
                const key = keys[keyIdx];
                const value = values[keyIdx];

                return (
                  <React.Fragment key={key}>
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

  return (
    <div style={popupStyle}>
      <div style={tableContainerStyle} className="table-container">
        {renderTable()}
      </div>
    </div>
  );
};

export default DisplayedPallet;
