import React from "react";
import Link from "next/link";

const DivisionSelect = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="">
        <h1 className="text-7xl mb-4">
          <div className="flex flex-col justify-start">
            <div className="items-left ">
              <span className="text-bold">Welcome </span>
              <span className="text-gray-500">to</span>
            </div>
            <div className="items-right text-right ">
              <span className="text-blue-500 text-7xl">PalletTest</span>
            </div>
          </div>
        </h1>
      </div>
      <h2 className="text-xl text-gray-600 mb-8">
        fully automated warehouse-to-labratory testing
      </h2>
      {/* Header Image */}
      <img
        src="/alien_science.svg"
        alt="Alien Science"
        className="w-64 h-64 mb-4"
        style={{ transform: "scaleX(-1)" }}
      />
      <h2 className="text-2xl text-gray-600 mb-8">Choose Your Division</h2>
      {/* Buttons */}
      <div className="flex space-x-4">
        {/* Warehouse Button */}
        <Link href="/warehouse">
          <div className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
            WAREHOUSE
          </div>
        </Link>

        {/* Laboratory Button */}
        <Link href="/lab">
          <div className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
            LABORATORY
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DivisionSelect;
