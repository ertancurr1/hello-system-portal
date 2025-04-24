import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { mockCredentials } from "../services/mockData";

export const useCredentials = () => {
  return useQuery({
    queryKey: ["credentials"],
    queryFn: async () => {
      try {
        const response = await api.get("/credentials");
        return response.data;
      } catch (error) {
        console.log("Using mock credentials data");
        // For demo purposes, return mock data
        return mockCredentials;
      }
    },
    onError: (error) => {
      console.error("Failed to fetch credentials:", error);
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export default useCredentials;
