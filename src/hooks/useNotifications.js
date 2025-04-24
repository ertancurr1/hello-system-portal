import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { mockNotifications } from "../services/mockData";

export const useNotifications = (limit = 5) => {
  return useQuery({
    queryKey: ["notifications", limit],
    queryFn: async () => {
      try {
        const response = await api.get(`/notifications?limit=${limit}`);
        return response.data;
      } catch (error) {
        console.log("Using mock notifications data");
        // For demo purposes, return mock data
        return mockNotifications;
      }
    },
    onError: (error) => {
      console.error("Failed to fetch notifications:", error);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useNotifications;
