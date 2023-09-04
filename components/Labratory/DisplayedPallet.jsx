import React from "react";

const DisplayedPallet = ({ item }) => {
  const popupStyle = {
    display: "flex",

    backgroundColor: "white",

    padding: "10px",

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

    const numCols = 2;
    const numRows = Math.ceil(keys.length / numCols);

    return (
      <table style={tableStyle}>
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

  return <div style={popupStyle}>{renderTable()}</div>;
};

export default DisplayedPallet;
