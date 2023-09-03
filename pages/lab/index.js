import NewLabRequest from "../../app/components/NewLabRequest";
import { format } from "date-fns"; // Import date-fns format function
import LabCheckTracker from "../../app/components/LabCheckTracker";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

export default function Lab() {
  const formattedDate = format(new Date(), "HH:mm:ss MM/dd/yyyy");
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
        <div className="flex w-3/4 flex-row items-center justify-center">
          <NewLabRequest formattedDate={formattedDate} />
          <LabCheckTracker />
        </div>
      </div>
      <div>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </>
  );
}
