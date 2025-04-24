import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../src/context/ThemeContext";
import { FONTS, SIZES } from "../../../src/theme/theme";

// Mock data for past courses
const mockPastCourses = {
  semesters: [
    {
      id: 1,
      name: "Fall 2024",
      courses: [
        {
          id: 101,
          code: "CS100",
          name: "Computer Fundamentals",
          credits: 3,
          instructor: "Dr. Sarah Johnson",
          grade: "A",
          completed: true,
        },
        {
          id: 102,
          code: "MATH201",
          name: "Calculus I",
          credits: 4,
          instructor: "Prof. Michael Chen",
          grade: "A-",
          completed: true,
        },
        {
          id: 103,
          code: "ENG104",
          name: "Composition",
          credits: 3,
          instructor: "Dr. Emily Williams",
          grade: "B+",
          completed: true,
        },
        {
          id: 104,
          code: "PHYS101",
          name: "Physics I",
          credits: 4,
          instructor: "Prof. Daniel Lee",
          grade: "A",
          completed: true,
        },
      ],
    },
    {
      id: 2,
      name: "Spring 2025",
      courses: [
        {
          id: 201,
          code: "CS102",
          name: "Data Structures",
          credits: 3,
          instructor: "Dr. Robert Smith",
          grade: "A",
          completed: true,
        },
        {
          id: 202,
          code: "MATH203",
          name: "Calculus II",
          credits: 4,
          instructor: "Prof. Lisa Wang",
          grade: "A",
          completed: true,
        },
        {
          id: 203,
          code: "PHIL105",
          name: "Ethics",
          credits: 3,
          instructor: "Dr. James Brown",
          grade: "B+",
          completed: true,
        },
        {
          id: 204,
          code: "PHYS102",
          name: "Physics II",
          credits: 4,
          instructor: "Prof. Daniel Lee",
          grade: "A-",
          completed: true,
        },
      ],
    },
  ],
};

const PastCourseCard = ({ course, onPress, colors, shadows }) => {
  // Get grade color
  const getGradeColor = (grade) => {
    const firstChar = grade.charAt(0);
    switch (firstChar) {
      case "A":
        return colors.success;
      case "B":
        return colors.primary;
      case "C":
        return colors.secondary;
      case "D":
        return colors.warning;
      case "F":
        return colors.error;
      default:
        return colors.text;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.courseCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          ...shadows.small,
        },
      ]}
      onPress={() => onPress(course)}
    >
      <View style={styles.courseHeader}>
        <View>
          <Text style={[styles.courseCode, { color: colors.primary }]}>
            {course.code}
          </Text>
          <Text style={[styles.courseName, { color: colors.text }]}>
            {course.name}
          </Text>
        </View>

        <View
          style={[
            styles.gradeBadge,
            { backgroundColor: getGradeColor(course.grade) + "20" },
          ]}
        >
          <Text
            style={[styles.gradeText, { color: getGradeColor(course.grade) }]}
          >
            {course.grade}
          </Text>
        </View>
      </View>

      <View style={styles.courseDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="person" size={16} color={colors.secondary} />
          <Text style={[styles.detailText, { color: colors.text }]}>
            {course.instructor}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="school" size={16} color={colors.secondary} />
          <Text style={[styles.detailText, { color: colors.text }]}>
            {course.credits} Credits
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SemesterSection = ({ semester, onPressCourse, colors, shadows }) => {
  return (
    <View style={styles.semesterSection}>
      <View style={styles.semesterHeader}>
        <Text style={[styles.semesterName, { color: colors.text }]}>
          {semester.name}
        </Text>
        <Text style={[styles.courseCount, { color: colors.inactive }]}>
          {semester.courses.length} Courses
        </Text>
      </View>

      {semester.courses.map((course) => (
        <PastCourseCard
          key={course.id}
          course={course}
          onPress={onPressCourse}
          colors={colors}
          shadows={shadows}
        />
      ))}
    </View>
  );
};

export default function PastCoursesScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode, shadows } = getTheme();

  const [refreshing, setRefreshing] = useState(false);
  const [pastCourses, setPastCourses] = useState(mockPastCourses);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleCoursePress = (course) => {
    // In a real app, this would navigate to course details
    alert(
      `Course: ${course.code} - ${course.name}\nGrade: ${course.grade}\nInstructor: ${course.instructor}`
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Past Courses
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Courses from previous semesters
        </Text>
      </View>

      <FlatList
        data={pastCourses.semesters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SemesterSection
            semester={item}
            onPressCourse={handleCoursePress}
            colors={colors}
            shadows={shadows}
          />
        )}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book" size={50} color={colors.inactive} />
            <Text style={[styles.emptyText, { color: colors.inactive }]}>
              No past courses found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: SIZES.padding,
  },
  title: {
    ...FONTS.bold,
    fontSize: 24,
    marginBottom: 4,
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
  },
  container: {
    padding: SIZES.padding,
    paddingTop: 0,
  },
  semesterSection: {
    marginBottom: 24,
  },
  semesterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  semesterName: {
    ...FONTS.bold,
    fontSize: SIZES.large,
  },
  courseCount: {
    ...FONTS.medium,
    fontSize: SIZES.small,
  },
  courseCard: {
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  courseCode: {
    ...FONTS.bold,
    fontSize: SIZES.large,
  },
  courseName: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    marginTop: 4,
  },
  gradeBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  gradeText: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
  },
  courseDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.padding * 4,
  },
  emptyText: {
    ...FONTS.medium,
    fontSize: SIZES.large,
    marginTop: 16,
  },
});
