import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { mockResults } from "../services/mockData";

export const useResults = () => {
  return useQuery({
    queryKey: ["results"],
    queryFn: async () => {
      try {
        const response = await api.get("/academic/results");
        return response.data;
      } catch (error) {
        console.log("Using mock results data");
        // For demo purposes, return mock data
        return mockResults;
      }
    },
    onError: (error) => {
      console.error("Failed to fetch academic results:", error);
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export default useResults;
