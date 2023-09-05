import { useState, useEffect } from "react";
import LabratoryTools from "../components/Labratory/LabratoryTools";
import { format } from "date-fns"; // Import date-fns format function
import axios from "axios";
import LabCheckTracker from "../components/Labratory/LabCheckTracker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Lab() {
  const formattedDate = format(new Date(), "HH:mm:ss MM/dd/yyyy");
  const [labRequests, setLabRequests] = useState([]);
  const [labRequestsUpdated, setLabRequestsUpdated] = useState(false);
  const [displayedPallet, setDisplayedPallet] = useState([]);
  const [selectedPallet, setSelectedPallet] = useState([]);
  const [selectedLabRequest, setSelectedLabRequest] = useState([]);

  const fetchLabRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8888/api/lab-requests"
      );
      setLabRequests(response.data); // Update state with fetched lab requests
      setLabRequestsUpdated(true); // Signal that labRequests have been updated
    } catch (error) {
      console.error("Error fetching lab requests:", error);
    }
  };

  useEffect(() => {
    fetchLabRequests();
  }, []);

  useEffect(() => {
    fetchLabRequests();
  }, [selectedLabRequest, selectedPallet]);

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
    <>
      <div className="flex min-h-screen flex-col items-center justify-start p-24">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col items-left justify-center">
            <h1 className="text-5xl font-bold text-right">
              Welcome to the <span className="text-blue-500">Labratory</span>
            </h1>
            <p className="text-lg text-gray-500 text-center mt-2 border-2 border-gray-300 text-bold rounded p-1 shadow-sm shadow-blue-300">
              automated lab approval requests
            </p>
          </div>
          <img src="./scientist.svg" alt="lab" className="w-1/2 h-40" />
        </div>
        <div className="w-full h-2 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 relative mt-5 rounded-full"></div>
        <div className="flex w-full flex-row mt-5">
          <LabratoryTools
            formattedDate={formattedDate}
            fetchLabRequests={fetchLabRequests}
            setLabRequests={setLabRequests}
            setLabRequestsUpdated={setLabRequestsUpdated}
            displayedPallet={displayedPallet}
            setDisplayedPallet={setDisplayedPallet}
            selectedPallet={selectedPallet}
            setSelectedPallet={setSelectedPallet}
            selectedLabRequest={selectedLabRequest}
            setSelectedLabRequest={setSelectedLabRequest}
          />
          <LabCheckTracker
            labRequests={labRequests}
            setLabRequests={setLabRequests}
            displayedPallet={displayedPallet}
            setDisplayedPallet={setDisplayedPallet}
            selectedPallet={selectedPallet}
            setSelectedPallet={setSelectedPallet}
            selectedLabRequest={selectedLabRequest}
            setSelectedLabRequest={setSelectedLabRequest}
            
          />
        </div>
        <div>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </div>
    </>
  );
}
