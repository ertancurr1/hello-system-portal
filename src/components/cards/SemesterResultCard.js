import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { FONTS, SIZES } from "../../theme/theme";

const SemesterResultCard = ({ name, gpa, courses, onPress, style }) => {
  const { getTheme } = useTheme();
  const { colors, shadows } = getTheme();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Get GPA color
  const getGpaColor = (gpa) => {
    if (gpa >= 3.5) return colors.success;
    if (gpa >= 2.5) return colors.primary;
    if (gpa >= 1.5) return colors.warning;
    return colors.error;
  };

  const gpaColor = getGpaColor(gpa);

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
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          ...shadows.small,
        },
        style,
      ]}
    >
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View>
          <Text style={[styles.semesterName, { color: colors.text }]}>
            {name}
          </Text>
          <Text style={[styles.coursesCount, { color: colors.inactive }]}>
            {courses.length} Courses
          </Text>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.gpaContainer}>
            <Text style={[styles.gpaLabel, { color: colors.inactive }]}>
              GPA
            </Text>
            <Text style={[styles.gpaValue, { color: gpaColor }]}>
              {gpa.toFixed(2)}
            </Text>
          </View>

          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={colors.inactive}
            style={styles.expandIcon}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.coursesContainer}>
          <View
            style={[styles.tableHeader, { borderBottomColor: colors.border }]}
          >
            <Text style={[styles.codeHeader, { color: colors.inactive }]}>
              Course
            </Text>
            <Text style={[styles.nameHeader, { color: colors.inactive }]}>
              Title
            </Text>
            <Text style={[styles.creditsHeader, { color: colors.inactive }]}>
              CR
            </Text>
            <Text style={[styles.gradeHeader, { color: colors.inactive }]}>
              Grade
            </Text>
          </View>

          {courses.map((course, index) => (
            <View
              key={index}
              style={[
                styles.courseRow,
                index < courses.length - 1 && {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}
            >
              <Text style={[styles.courseCode, { color: colors.primary }]}>
                {course.code}
              </Text>
              <Text style={[styles.courseName, { color: colors.text }]}>
                {course.name}
              </Text>
              <Text style={[styles.courseCredits, { color: colors.text }]}>
                {course.credits}
              </Text>
              <Text
                style={[
                  styles.courseGrade,
                  { color: getGradeColor(course.grade) },
                ]}
              >
                {course.grade}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    marginVertical: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  semesterName: {
    ...FONTS.bold,
    fontSize: SIZES.large,
  },
  coursesCount: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginTop: 4,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  gpaContainer: {
    alignItems: "center",
  },
  gpaLabel: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
  },
  gpaValue: {
    ...FONTS.bold,
    fontSize: SIZES.large,
  },
  expandIcon: {
    marginLeft: 16,
  },
  coursesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  codeHeader: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    width: "20%",
  },
  nameHeader: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    width: "50%",
  },
  creditsHeader: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    width: "10%",
    textAlign: "center",
  },
  gradeHeader: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    width: "20%",
    textAlign: "center",
  },
  courseRow: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  courseCode: {
    ...FONTS.medium,
    fontSize: SIZES.small,
    width: "20%",
  },
  courseName: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    width: "50%",
  },
  courseCredits: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    width: "10%",
    textAlign: "center",
  },
  courseGrade: {
    ...FONTS.bold,
    fontSize: SIZES.small,
    width: "20%",
    textAlign: "center",
  },
});

export default SemesterResultCard;
