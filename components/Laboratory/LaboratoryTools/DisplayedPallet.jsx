import React from "react";

import * as styles from "./DisplayedPalletStyles";

const DisplayedPallet = ({ item }) => {
  const renderTable = () => {
    const filteredItems = Object.entries(item).filter(
      ([, value]) => value !== null && value !== undefined
    );

    const keys = filteredItems.map(([key]) => key);
    const values = filteredItems.map(([, value]) => value);

    const numCols = 1;
    const numRows = Math.ceil(keys.length / numCols);

    return (
      <table style={styles.tableStyle}>
        <tbody>
          {[...Array(numRows)].map((_, rowIdx) => (
            <tr key={rowIdx}>
              {[...Array(numCols)].map((_, colIdx) => {
                const keyIdx = rowIdx * numCols + colIdx;
                const key = keys[keyIdx];
                const value = values[keyIdx];

                return (
                  <React.Fragment key={key}>
                    <td style={styles.thStyle}>
                      <span style={styles.keyStyle}>{key}:</span>
                    </td>
                    <td style={styles.tdStyle}>{value}</td>
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
    <div style={styles.popupStyle}>
      <div style={styles.tableContainerStyle}>{renderTable()}</div>
    </div>
  );
};

export default DisplayedPallet;
