import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "../../../src/context/ThemeContext";
import { FONTS, SIZES } from "../../../src/theme/theme";
import LoadingIndicator from "../../../src/components/ui/LoadingIndicator";
import Button from "../../../src/components/ui/Button";
import {
  useAvailableCourses,
  useSelectedCourses,
} from "../../../src/hooks/useSemesterCourses";

const CourseItem = ({
  course,
  isSelected,
  onSelectCourse,
  onRemoveCourse,
  prerequisites,
  colors,
  shadows,
}) => {
  const hasPrerequisites = !prerequisites || prerequisites.length === 0;

  return (
    <View
      style={[
        styles.courseItem,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          ...shadows.small,
        },
      ]}
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
          style={[styles.creditsBadge, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.creditsText}>{course.credits} CR</Text>
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
          <Ionicons name="time" size={16} color={colors.secondary} />
          <Text style={[styles.detailText, { color: colors.text }]}>
            {course.schedule}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="location" size={16} color={colors.secondary} />
          <Text style={[styles.detailText, { color: colors.text }]}>
            Room {course.room}
          </Text>
        </View>

        {course.capacity && (
          <View style={styles.detailItem}>
            <Ionicons name="people" size={16} color={colors.secondary} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {course.enrolled}/{course.capacity} Students
            </Text>
          </View>
        )}

        {course.prerequisites && course.prerequisites.length > 0 && (
          <View style={styles.detailItem}>
            <Ionicons name="git-branch" size={16} color={colors.secondary} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              Prerequisites: {course.prerequisites.join(", ")}
            </Text>
          </View>
        )}
      </View>

      {isSelected ? (
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: colors.error + "15" },
          ]}
          onPress={() => onRemoveCourse(course)}
        >
          <Ionicons name="remove-circle" size={18} color={colors.error} />
          <Text style={[styles.actionText, { color: colors.error }]}>
            Remove Course
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor:
                course.available && hasPrerequisites
                  ? colors.success + "15"
                  : colors.inactive + "15",
            },
          ]}
          onPress={() => onSelectCourse(course)}
          disabled={!course.available || !hasPrerequisites}
        >
          <Ionicons
            name="add-circle"
            size={18}
            color={
              course.available && hasPrerequisites
                ? colors.success
                : colors.inactive
            }
          />
          <Text
            style={[
              styles.actionText,
              {
                color:
                  course.available && hasPrerequisites
                    ? colors.success
                    : colors.inactive,
              },
            ]}
          >
            {!course.available
              ? "Course Full"
              : !hasPrerequisites
              ? "Missing Prerequisites"
              : "Add Course"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function RegistrationScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode, shadows } = getTheme();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSelected, setShowSelected] = useState(false);

  const {
    data: availableCoursesData,
    isLoading: isLoadingAvailable,
    refetch: refetchAvailable,
  } = useAvailableCourses(searchQuery);

  const {
    data: selectedCoursesData,
    isLoading: isLoadingSelected,
    refetch: refetchSelected,
  } = useSelectedCourses();

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
  }, []);

  const handleRefresh = useCallback(() => {
    refetchAvailable();
    refetchSelected();
  }, [refetchAvailable, refetchSelected]);

  const handleSelectCourse = useCallback(
    (course) => {
      // In a real app, this would call an API to add the course
      Alert.alert(
        "Add Course",
        `Are you sure you want to add ${course.code} - ${course.name}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Add",
            onPress: () => {
              // Simulate API call
              setTimeout(() => {
                queryClient.invalidateQueries({
                  queryKey: ["selected-courses"],
                });
                Alert.alert("Success", "Course added successfully");
              }, 500);
            },
          },
        ]
      );
    },
    [queryClient]
  );

  const handleRemoveCourse = useCallback(
    (course) => {
      // In a real app, this would call an API to remove the course
      Alert.alert(
        "Remove Course",
        `Are you sure you want to remove ${course.code} - ${course.name}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => {
              // Simulate API call
              setTimeout(() => {
                queryClient.invalidateQueries({
                  queryKey: ["selected-courses"],
                });
                Alert.alert("Success", "Course removed successfully");
              }, 500);
            },
          },
        ]
      );
    },
    [queryClient]
  );

  const handleSubmitRegistration = useCallback(() => {
    // In a real app, this would call an API to submit the registration
    Alert.alert(
      "Submit Registration",
      "Are you sure you want to submit your course registration?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Submit",
          onPress: () => {
            // Simulate API call
            setTimeout(() => {
              Alert.alert(
                "Registration Submitted",
                "Your course registration has been submitted for advisor approval."
              );
            }, 500);
          },
        },
      ]
    );
  }, []);

  // Check if registration is open
  const isRegistrationOpen = availableCoursesData?.registrationPeriod?.isOpen;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Semester Registration
        </Text>
        {availableCoursesData?.registrationPeriod && (
          <Text
            style={[
              styles.subtitle,
              {
                color: isRegistrationOpen ? colors.success : colors.error,
              },
            ]}
          >
            {isRegistrationOpen
              ? `Registration Open: ${availableCoursesData.registrationPeriod.startDate} - ${availableCoursesData.registrationPeriod.endDate}`
              : "Registration Closed"}
          </Text>
        )}
        <Text style={[styles.termText, { color: colors.text }]}>
          Term: {availableCoursesData?.registrationPeriod?.term || "Fall 2025"}
        </Text>
      </View>

      {/* Selected Courses Summary */}
      {!isLoadingSelected && selectedCoursesData && (
        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.summaryHeader}>
            <Text style={[styles.summaryTitle, { color: colors.text }]}>
              Selected Courses
            </Text>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                {
                  backgroundColor: showSelected
                    ? colors.primary
                    : colors.background,
                },
              ]}
              onPress={() => setShowSelected(!showSelected)}
            >
              <Text
                style={[
                  styles.viewToggleText,
                  {
                    color: showSelected ? "#FFFFFF" : colors.primary,
                  },
                ]}
              >
                {showSelected ? "Browse Courses" : "View Selected"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryDetails}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.inactive }]}>
                Courses
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {selectedCoursesData.courses.length}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.inactive }]}>
                Credits
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {selectedCoursesData.totalCredits}/
                {selectedCoursesData.maxCredits}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.inactive }]}>
                Status
              </Text>
              <Text
                style={[
                  styles.summaryValue,
                  {
                    color:
                      selectedCoursesData.status === "Approved"
                        ? colors.success
                        : selectedCoursesData.status === "Rejected"
                        ? colors.error
                        : colors.warning,
                  },
                ]}
              >
                {selectedCoursesData.status}
              </Text>
            </View>
          </View>

          <Button
            title="Submit Registration"
            onPress={handleSubmitRegistration}
            disabled={
              !isRegistrationOpen || selectedCoursesData.courses.length === 0
            }
            style={styles.submitButton}
          />
        </View>
      )}

      {/* Course List */}
      <View style={styles.coursesContainer}>
        {/* Search Bar */}
        {!showSelected && (
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons name="search" size={20} color={colors.inactive} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search courses by code or name"
              placeholderTextColor={colors.inactive}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                style={styles.clearButton}
              >
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={colors.inactive}
                />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Course List */}
        <ScrollView
          contentContainerStyle={styles.courseList}
          showsVerticalScrollIndicator={false}
        >
          {isLoadingAvailable || isLoadingSelected ? (
            <LoadingIndicator text="Loading courses..." />
          ) : showSelected ? (
            // Show selected courses
            selectedCoursesData?.courses.length > 0 ? (
              selectedCoursesData.courses.map((course) => (
                <CourseItem
                  key={course.id}
                  course={course}
                  isSelected={true}
                  onRemoveCourse={handleRemoveCourse}
                  colors={colors}
                  shadows={shadows}
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="book"
                  size={50}
                  color={colors.inactive}
                  style={styles.emptyIcon}
                />
                <Text style={[styles.emptyText, { color: colors.inactive }]}>
                  No courses selected yet
                </Text>
                <Text style={[styles.emptySubtext, { color: colors.inactive }]}>
                  Browse available courses to add them to your schedule
                </Text>
                <Button
                  title="Browse Courses"
                  variant="outline"
                  onPress={() => setShowSelected(false)}
                  style={styles.browseButton}
                />
              </View>
            )
          ) : // Show available courses
          availableCoursesData?.courses.length > 0 ? (
            availableCoursesData.courses.map((course) => {
              const isSelected =
                selectedCoursesData?.courses.some(
                  (selected) => selected.id === course.id
                ) || false;

              return (
                <CourseItem
                  key={course.id}
                  course={course}
                  isSelected={isSelected}
                  onSelectCourse={handleSelectCourse}
                  onRemoveCourse={handleRemoveCourse}
                  prerequisites={course.prerequisites}
                  colors={colors}
                  shadows={shadows}
                />
              );
            })
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="search"
                size={50}
                color={colors.inactive}
                style={styles.emptyIcon}
              />
              <Text style={[styles.emptyText, { color: colors.inactive }]}>
                No courses found
              </Text>
              <Text style={[styles.emptySubtext, { color: colors.inactive }]}>
                Try adjusting your search criteria
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: SIZES.padding,
    paddingBottom: 10,
  },
  title: {
    ...FONTS.bold,
    fontSize: 24,
  },
  subtitle: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    marginTop: 4,
  },
  termText: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    marginTop: 4,
  },
  summaryCard: {
    margin: SIZES.padding,
    marginTop: 0,
    padding: 16,
    borderRadius: SIZES.radius,
    borderWidth: 1,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
  },
  viewToggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radius - 4,
  },
  viewToggleText: {
    ...FONTS.medium,
    fontSize: SIZES.small,
  },
  summaryDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginBottom: 4,
  },
  summaryValue: {
    ...FONTS.bold,
    fontSize: SIZES.large,
  },
  submitButton: {
    height: 45,
  },
  coursesContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 45,
    borderRadius: SIZES.radius - 4,
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    marginLeft: 8,
    ...FONTS.regular,
  },
  clearButton: {
    padding: 5,
  },
  courseList: {
    paddingBottom: 16,
  },
  courseItem: {
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 16,
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
  creditsBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SIZES.radius - 4,
    minWidth: 45,
    alignItems: "center",
  },
  creditsText: {
    ...FONTS.bold,
    fontSize: SIZES.small,
    color: "#FFFFFF",
  },
  courseDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  detailText: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginLeft: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: SIZES.radius - 4,
  },
  actionText: {
    ...FONTS.medium,
    fontSize: SIZES.small,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.padding * 2,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: 8,
  },
  emptySubtext: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    textAlign: "center",
    marginBottom: 20,
  },
  browseButton: {
    width: 150,
  },
});
