import NewLabRequest from "../components/NewLabRequest";
import { format } from "date-fns"; // Import date-fns format function
import LabCheckTracker from "../components/LabCheckTracker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Lab() {
  const formattedDate = format(new Date(), "HH:mm:ss MM/dd/yyyy");
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-start p-24">
        
      </div>
      <div>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </>
  );
}
