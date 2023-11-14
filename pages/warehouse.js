import { useState, useEffect } from "react";
import NewLabRequest from "../components/Warehouse/NewLabRequest";
import { format } from "date-fns";
import axios from "axios";
import LabCheckTracker from "../components/Warehouse/LabCheckTracker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uuid from "uuid-with-v6";

export default function Warehouse() {
  const formattedDate = format(new Date(), "HH:mm:ss MM/dd/yyyy");
  const [labRequests, setLabRequests] = useState([]);
  const [labRequestsUpdated, setLabRequestsUpdated] = useState(false);
  const [hideClosed, setHideClosed] = useState(true);
  const [selectedLabRequest, setSelectedLabRequest] = useState({});

  const fetchLabRequests = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_ENV === "development"
          ? "/api/lab-requests/lab-requests"
          : "https://pallettest.com/api/lab-requests"
      );

      console.log("response.data:", response.data);

      // if hideClosed is true, filter out closed requests from response.data
      if (hideClosed === true) {
        const filteredResponse = response.data.filter(
          (labRequest) => labRequest.status !== "Closed"
        );
        // display data so that the newest is at the top
        filteredResponse.reverse();

        // compared filteredResponse to existing labRequests and only update if different
        if (JSON.stringify(filteredResponse) === JSON.stringify(labRequests)) {
          console.log("items are the same, not updating");
          return;
        } else {
          // If different, update state
          console.log("items are different, updating");
          setLabRequests(filteredResponse); // Update state with fetched lab requests
          setLabRequestsUpdated(true); // Signal that labRequests have been updated
          return;
        }
      } else {
        // compared response.data to existing labRequests and only update if different
        if (JSON.stringify(response.data) === JSON.stringify(labRequests)) {
          console.log("items are the same, not updating");
          return;
        } else {
          // If different, update state
          console.log("items are different, updating");
          setLabRequests(response.data); // Update state with fetched lab requests
          setLabRequestsUpdated(true); // Signal that labRequests have been updated
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching lab requests:", error);
    }
  };

  useEffect(() => {
    fetchLabRequests();
  }, [hideClosed]);

  useEffect(() => {
    fetchLabRequests();
  }, []);

  useEffect(() => {
    if (labRequestsUpdated === true) {
      // Reset the labRequestsUpdated state variable
      setLabRequestsUpdated(false);
    }
  }, [labRequests, labRequestsUpdated]);

  // Periodically check for updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLabRequests();
    }, 30000); // 5 minutes (adjust the interval as needed)

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-12">
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-left justify-center">
          <h1 className="text-5xl font-bold text-right">
            Welcome to the <span className="text-blue-500">Warehouse</span>
          </h1>
          <p className="text-lg text-gray-500 text-center mt-2 border-2 border-gray-300 text-bold rounded p-1 shadow-sm shadow-blue-300">
            automated lab approval requests
          </p>
        </div>
        <img src="./logistics.svg" alt="lab" className="w-1/2 h-40" />
      </div>
      <div className="w-full h-2 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 relative mt-5 rounded-full"></div>
      <div className="flex w-full flex-row mt-5">
        <NewLabRequest
          formattedDate={formattedDate}
          fetchLabRequests={fetchLabRequests}
          setLabRequests={setLabRequests}
          setLabRequestsUpdated={setLabRequestsUpdated}
        />
        <LabCheckTracker
          labRequests={labRequests}
          setLabRequests={setLabRequests}
          hideClosed={hideClosed}
          setHideClosed={setHideClosed}
        />
      </div>
      <div>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </div>
  );
}
