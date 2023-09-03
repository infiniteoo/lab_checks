"use client"
import {useState, useEffect} from "react";
import NewLabRequest from "../components/NewLabRequest";
import { format } from "date-fns";
import axios from "axios"; 
import LabCheckTracker from "../components/LabCheckTracker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Warehouse() {
  const formattedDate = format(new Date(), "HH:mm:ss MM/dd/yyyy");
  const [labRequests, setLabRequests] = useState([]);

  const fetchLabRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/lab-requests");
      setLabRequests(response.data); // Update state with fetched lab requests
      console.log("Lab requests:", response.data);
    } catch (error) {
      console.error("Error fetching lab requests:", error);
    }
  };

  useEffect(() => {
    fetchLabRequests();
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
      <div className="w-full h-2 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 relative mt-5 rounded-full">
        
      </div>
      <div className="flex w-full flex-row mt-5">
        <NewLabRequest formattedDate={formattedDate} fetchLabRequests={fetchLabRequests} />
        <LabCheckTracker />
      </div>
      <div>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </div>
  );
}
