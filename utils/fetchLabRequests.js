// lib/labApi.js (or labApi.ts for TypeScript)
import axios from "axios";

export const fetchLabRequests = async (hideClosed) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_ENV === "development"
        ? "/api/lab-requests"
        : "https://pallettest.com/api/lab-requests"
    );

    // Filter closed requests if hideClosed is true
    const filteredResponse = hideClosed
      ? response.data.filter((labRequest) => labRequest.status !== "Closed")
      : response.data;

    // Reverse the response data
    filteredResponse.reverse();

    return filteredResponse;
  } catch (error) {
    console.error("Error fetching lab requests:", error);
    throw error;
  }
};
