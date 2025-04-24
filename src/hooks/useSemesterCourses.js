import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

// Mock data for available courses for registration
const mockAvailableCourses = {
  courses: [
    {
      id: 101,
      code: "CS201",
      name: "Data Structures and Algorithms",
      credits: 4,
      instructor: "Dr. Sarah Johnson",
      schedule: "Mon, Wed 10:00 - 11:30",
      room: "B210",
      capacity: 40,
      enrolled: 25,
      available: true,
      prerequisites: ["CS101"],
    },
    {
      id: 102,
      code: "CS203",
      name: "Database Systems",
      credits: 3,
      instructor: "Prof. Michael Thomas",
      schedule: "Tue, Thu 13:00 - 14:30",
      room: "A110",
      capacity: 35,
      enrolled: 32,
      available: true,
      prerequisites: ["CS101"],
    },
    {
      id: 103,
      code: "CS302",
      name: "Software Engineering",
      credits: 3,
      instructor: "Dr. Emily Parker",
      schedule: "Wed, Fri 09:00 - 10:30",
      room: "C305",
      capacity: 30,
      enrolled: 30,
      available: false,
      prerequisites: ["CS201", "CS203"],
    },
    {
      id: 104,
      code: "MATH301",
      name: "Differential Equations",
      credits: 4,
      instructor: "Prof. David Wilson",
      schedule: "Mon, Wed, Fri 14:00 - 15:00",
      room: "B220",
      capacity: 45,
      enrolled: 30,
      available: true,
      prerequisites: ["MATH201", "MATH203"],
    },
    {
      id: 105,
      code: "ENG202",
      name: "Technical Writing",
      credits: 3,
      instructor: "Dr. Jessica Brown",
      schedule: "Tue, Thu 10:00 - 11:30",
      room: "A120",
      capacity: 30,
      enrolled: 20,
      available: true,
      prerequisites: ["ENG104"],
    },
    {
      id: 106,
      code: "CS310",
      name: "Artificial Intelligence",
      credits: 4,
      instructor: "Prof. Robert Chen",
      schedule: "Mon, Wed 15:30 - 17:00",
      room: "B310",
      capacity: 35,
      enrolled: 32,
      available: true,
      prerequisites: ["CS201", "MATH202"],
    },
    {
      id: 107,
      code: "CS315",
      name: "Web Development",
      credits: 3,
      instructor: "Dr. Laura Martinez",
      schedule: "Tue, Thu 08:30 - 10:00",
      room: "C210",
      capacity: 30,
      enrolled: 25,
      available: true,
      prerequisites: ["CS101"],
    },
    {
      id: 108,
      code: "PHY202",
      name: "Electromagnetism",
      credits: 4,
      instructor: "Prof. James Wilson",
      schedule: "Mon, Wed, Fri 11:00 - 12:00",
      room: "A220",
      capacity: 40,
      enrolled: 35,
      available: true,
      prerequisites: ["PHY101", "MATH201"],
    },
  ],
  registrationPeriod: {
    isOpen: true,
    startDate: "2025-04-15",
    endDate: "2025-05-15",
    term: "Fall 2025",
  },
};

// Mock data for student's selected courses
const mockSelectedCourses = {
  courses: [
    {
      id: 101,
      code: "CS201",
      name: "Data Structures and Algorithms",
      credits: 4,
      instructor: "Dr. Sarah Johnson",
      schedule: "Mon, Wed 10:00 - 11:30",
      room: "B210",
    },
    {
      id: 102,
      code: "CS203",
      name: "Database Systems",
      credits: 3,
      instructor: "Prof. Michael Thomas",
      schedule: "Tue, Thu 13:00 - 14:30",
      room: "A110",
    },
  ],
  totalCredits: 7,
  maxCredits: 18,
  status: "Pending Advisor Approval",
};

export const useAvailableCourses = (searchQuery = "") => {
  return useQuery({
    queryKey: ["available-courses", searchQuery],
    queryFn: async () => {
      try {
        const response = await api.get(
          `/registration/available-courses?search=${searchQuery}`
        );
        return response.data;
      } catch (error) {
        console.log("Using mock available courses data");

        // Filter courses by search query for mock data
        if (searchQuery) {
          const filtered = {
            ...mockAvailableCourses,
            courses: mockAvailableCourses.courses.filter(
              (course) =>
                course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          };
          return filtered;
        }

        return mockAvailableCourses;
      }
    },
    onError: (error) => {
      console.error("Failed to fetch available courses:", error);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useSelectedCourses = () => {
  return useQuery({
    queryKey: ["selected-courses"],
    queryFn: async () => {
      try {
        const response = await api.get("/registration/selected-courses");
        return response.data;
      } catch (error) {
        console.log("Using mock selected courses data");
        return mockSelectedCourses;
      }
    },
    onError: (error) => {
      console.error("Failed to fetch selected courses:", error);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
