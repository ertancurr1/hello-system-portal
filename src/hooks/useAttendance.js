import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { mockAttendance } from "../services/mockData";

export const useAttendance = () => {
  return useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      try {
        const response = await api.get("/courses/attendance");
        return response.data;
      } catch (error) {
        console.log("Using mock attendance data");
        // For demo purposes, return mock data
        return mockAttendance;
      }
    },
    onError: (error) => {
      console.error("Failed to fetch attendance data:", error);
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export default useAttendance;
