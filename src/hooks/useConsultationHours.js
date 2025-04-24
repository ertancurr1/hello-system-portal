import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { mockConsultationHours } from "../services/mockData";

export const useConsultationHours = () => {
  return useQuery({
    queryKey: ["consultation-hours"],
    queryFn: async () => {
      try {
        const response = await api.get("/consultation-hours");
        return response.data;
      } catch (error) {
        console.log("Using mock consultation hours data");
        // For demo purposes, return mock data
        return mockConsultationHours;
      }
    },
    onError: (error) => {
      console.error("Failed to fetch consultation hours:", error);
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export default useConsultationHours;
