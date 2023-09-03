"use client";
import React from "react";

const RequestedLPN = ({ item }) => {
  if (item.LPN && !item.LPN.toString().startsWith("L0")) {
    return (
      <div className="bg-blue-400 border-3 text-white p-1 rounded-xl p-3 shadow-lg shadow-gray-200 rounded-lg">
        {item.LPN}
      </div>
    );
  }

  return null;
};

export default RequestedLPN;
