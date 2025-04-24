import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { mockCourseAnnouncements } from "../services/mockData";

export const useCourseAnnouncements = (limit = 5) => {
  return useQuery({
    queryKey: ["course-announcements", limit],
    queryFn: async () => {
      try {
        const response = await api.get(`/courses/announcements?limit=${limit}`);
        return response.data;
      } catch (error) {
        console.log("Using mock course announcements data");
        // For demo purposes, return mock data
        return mockCourseAnnouncements;
      }
    },
    onError: (error) => {
      console.error("Failed to fetch course announcements:", error);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useCourseAnnouncements;
