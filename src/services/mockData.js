// Mock data for testing the application

// Notifications
export const mockNotifications = {
  notifications: [
    {
      id: 1,
      title: "New Semester Registration",
      message:
        "Registration for the Fall 2025 semester is now open. Please register before August 15.",
      timestamp: "2025-04-22 09:30",
      type: "info",
      isRead: false,
    },
    {
      id: 2,
      title: "Library Hours Extended",
      message:
        "The university library will now be open until midnight during exam period.",
      timestamp: "2025-04-20 14:15",
      type: "info",
      isRead: true,
    },
    {
      id: 3,
      title: "Tuition Payment Reminder",
      message:
        "The deadline for tuition payment is April 30. Please ensure all payments are made on time.",
      timestamp: "2025-04-19 10:00",
      type: "warning",
      isRead: false,
    },
    {
      id: 4,
      title: "Campus Maintenance",
      message:
        "Building B will be closed for maintenance on Saturday, April 26. Classes will be relocated.",
      timestamp: "2025-04-18 16:45",
      type: "warning",
      isRead: true,
    },
    {
      id: 5,
      title: "Scholarship Application Open",
      message:
        "Applications for the Merit Scholarship for the upcoming academic year are now open.",
      timestamp: "2025-04-15 11:20",
      type: "info",
      isRead: false,
    },
  ],
};

// Course Announcements
export const mockCourseAnnouncements = {
  announcements: [
    {
      id: 1,
      course: "CS101 - Introduction to Programming",
      message:
        "The deadline for Project 2 has been extended to May 5. Please submit via the learning portal.",
      timestamp: "2025-04-23 13:00",
      isRead: false,
    },
    {
      id: 2,
      course: "MATH202 - Linear Algebra",
      message:
        "The review session for the midterm exam will be held on April 28 at 3 PM in Room A120.",
      timestamp: "2025-04-21 09:45",
      isRead: true,
    },
    {
      id: 3,
      course: "ENG105 - Academic Writing",
      message:
        "Please bring your draft essays to class on Thursday for peer review.",
      timestamp: "2025-04-20 15:30",
      isRead: false,
    },
    {
      id: 4,
      course: "PHY201 - Mechanics",
      message: "Lab reports for Experiment 4 are due this Friday by midnight.",
      timestamp: "2025-04-19 10:15",
      isRead: true,
    },
    {
      id: 5,
      course: "HIST101 - World History",
      message:
        "The museum visit scheduled for next week has been postponed to May 10.",
      timestamp: "2025-04-18 14:20",
      isRead: false,
    },
  ],
};

// Consultation Hours
export const mockConsultationHours = {
  consultations: [
    {
      id: 1,
      instructor: "Dr. Sarah Johnson",
      course: "CS101 - Introduction to Programming",
      day: "Monday",
      time: "14:00 - 16:00",
      location: "Room B210",
    },
    {
      id: 2,
      instructor: "Prof. Michael Chen",
      course: "MATH202 - Linear Algebra",
      day: "Tuesday",
      time: "10:00 - 12:00",
      location: "Room A110",
    },
    {
      id: 3,
      instructor: "Dr. Emily Williams",
      course: "ENG105 - Academic Writing",
      day: "Wednesday",
      time: "15:30 - 17:30",
      location: "Room C305",
    },
    {
      id: 4,
      instructor: "Prof. Daniel Lee",
      course: "PHY201 - Mechanics",
      day: "Thursday",
      time: "13:00 - 15:00",
      location: "Room B220",
    },
    {
      id: 5,
      instructor: "Dr. Robert Smith",
      course: "HIST101 - World History",
      day: "Friday",
      time: "11:00 - 13:00",
      location: "Room A120",
    },
  ],
};

// Credentials
export const mockCredentials = {
  wifi: {
    username: "campus_wifi",
    password: "student2025",
  },
  email: "student@university.edu",
};

// User Profile
export const mockUserProfile = {
  id: "123456",
  name: "John Doe",
  email: "john.doe@university.edu",
  studentId: "S123456",
  program: "Computer Science",
  department: "School of Computing",
  faculty: "Faculty of Engineering",
  enrollmentYear: 2023,
  expectedGraduation: 2027,
  academicStatus: "Active",
  gpa: 3.75,
  credits: {
    completed: 45,
    inProgress: 15,
    required: 120,
  },
  contact: {
    phone: "+1 (555) 123-4567",
    address: "123 University Ave, College Town, CT 12345",
    emergencyContact: "Jane Doe (Parent) - +1 (555) 987-6543",
  },
};

// Current Courses
export const mockCurrentCourses = {
  courses: [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Programming",
      credits: 3,
      instructor: "Dr. Sarah Johnson",
      schedule: "Mon, Wed 14:00 - 15:30",
      room: "B210",
      syllabus: "http://university.edu/syllabi/cs101",
    },
    {
      id: 2,
      code: "MATH202",
      name: "Linear Algebra",
      credits: 4,
      instructor: "Prof. Michael Chen",
      schedule: "Tue, Thu 10:00 - 11:30",
      room: "A110",
      syllabus: "http://university.edu/syllabi/math202",
    },
    {
      id: 3,
      code: "ENG105",
      name: "Academic Writing",
      credits: 3,
      instructor: "Dr. Emily Williams",
      schedule: "Wed, Fri 15:30 - 17:00",
      room: "C305",
      syllabus: "http://university.edu/syllabi/eng105",
    },
    {
      id: 4,
      code: "PHY201",
      name: "Mechanics",
      credits: 4,
      instructor: "Prof. Daniel Lee",
      schedule: "Mon, Wed, Fri 13:00 - 14:00",
      room: "B220",
      syllabus: "http://university.edu/syllabi/phy201",
    },
    {
      id: 5,
      code: "HIST101",
      name: "World History",
      credits: 3,
      instructor: "Dr. Robert Smith",
      schedule: "Tue, Thu 11:00 - 12:30",
      room: "A120",
      syllabus: "http://university.edu/syllabi/hist101",
    },
  ],
};

// Course Attendance
export const mockAttendance = {
  courses: [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Programming",
      attendance: 92,
      totalClasses: 25,
      attendedClasses: 23,
      status: "Good",
    },
    {
      id: 2,
      code: "MATH202",
      name: "Linear Algebra",
      attendance: 88,
      totalClasses: 25,
      attendedClasses: 22,
      status: "Good",
    },
    {
      id: 3,
      code: "ENG105",
      name: "Academic Writing",
      attendance: 72,
      totalClasses: 25,
      attendedClasses: 18,
      status: "Warning",
    },
    {
      id: 4,
      code: "PHY201",
      name: "Mechanics",
      attendance: 64,
      totalClasses: 25,
      attendedClasses: 16,
      status: "Critical",
    },
    {
      id: 5,
      code: "HIST101",
      name: "World History",
      attendance: 80,
      totalClasses: 25,
      attendedClasses: 20,
      status: "Good",
    },
  ],
};

// Past Results
export const mockResults = {
  semesters: [
    {
      id: 1,
      name: "Fall 2024",
      gpa: 3.75,
      courses: [
        {
          code: "CS100",
          name: "Computer Fundamentals",
          credits: 3,
          grade: "A",
          points: 4.0,
        },
        {
          code: "MATH201",
          name: "Calculus I",
          credits: 4,
          grade: "A-",
          points: 3.7,
        },
        {
          code: "ENG104",
          name: "Composition",
          credits: 3,
          grade: "B+",
          points: 3.3,
        },
        {
          code: "PHYS101",
          name: "Physics I",
          credits: 4,
          grade: "A",
          points: 4.0,
        },
      ],
    },
    {
      id: 2,
      name: "Spring 2025",
      gpa: 3.8,
      courses: [
        {
          code: "CS102",
          name: "Data Structures",
          credits: 3,
          grade: "A",
          points: 4.0,
        },
        {
          code: "MATH203",
          name: "Calculus II",
          credits: 4,
          grade: "A",
          points: 4.0,
        },
        {
          code: "PHIL105",
          name: "Ethics",
          credits: 3,
          grade: "B+",
          points: 3.3,
        },
        {
          code: "PHYS102",
          name: "Physics II",
          credits: 4,
          grade: "A-",
          points: 3.7,
        },
      ],
    },
  ],
  cumulative: {
    gpa: 3.78,
    credits: 28,
    standing: "Good Standing",
  },
};
