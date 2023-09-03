import React from "react";

const RequestedLPN = ({ item }) => {
  return (
    <div className="bg-blue-400 border-3 text-white p-1 rounded-xl p-3">
      {item.LPN}
    </div>
  );
};

export default RequestedLPN;
