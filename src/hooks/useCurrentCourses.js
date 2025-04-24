import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { mockCurrentCourses } from "../services/mockData";

export const useCurrentCourses = () => {
  return useQuery({
    queryKey: ["current-courses"],
    queryFn: async () => {
      try {
        const response = await api.get("/courses/current");
        return response.data;
      } catch (error) {
        console.log("Using mock current courses data");
        // For demo purposes, return mock data
        return mockCurrentCourses;
      }
    },
    onError: (error) => {
      console.error("Failed to fetch current courses:", error);
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export default useCurrentCourses;
