import React from "react";

const EnterOrderNumber = ({orderNumber, setOrderNumber}) => {
    console.log("orderNumber", orderNumber)
  return (
    <input
      type="text"
      placeholder="Enter Order Number"
      className="w-full p-2 mt-1 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
      value={orderNumber}
      onChange={(e) => setOrderNumber(e.target.value) && console.log(e.target.value)}
    />
  );
};

export default EnterOrderNumber;
