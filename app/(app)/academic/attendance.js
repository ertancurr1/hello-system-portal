import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useTheme } from "../../../src/context/ThemeContext";
import { FONTS, SIZES } from "../../../src/theme/theme";
import LoadingIndicator from "../../../src/components/ui/LoadingIndicator";
import AttendanceCard from "../../../src/components/cards/AttendanceCard";
import useAttendance from "../../../src/hooks/useAttendance";

export default function AttendanceScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode } = getTheme();
  const router = useRouter();

  const { data, isLoading, refetch } = useAttendance();

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleCoursePress = (courseId) => {
    router.push(`/academic/attendance-details/${courseId}`);
  };

  // Calculate overall attendance
  const calculateOverallAttendance = () => {
    if (!data?.courses || data.courses.length === 0) return 0;

    const totalAttendance = data.courses.reduce(
      (sum, course) => sum + course.attendance,
      0
    );

    return Math.round(totalAttendance / data.courses.length);
  };

  const overallAttendance = calculateOverallAttendance();

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 85) return "Good";
    if (percentage >= 70) return "Warning";
    return "Critical";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Good":
        return colors.success;
      case "Warning":
        return colors.warning;
      case "Critical":
        return colors.error;
      default:
        return colors.inactive;
    }
  };

  const overallStatus = getAttendanceStatus(overallAttendance);
  const statusColor = getStatusColor(overallStatus);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Course Attendance
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Spring 2025
        </Text>
      </View>

      {isLoading ? (
        <LoadingIndicator text="Loading attendance data..." />
      ) : (
        <>
          <View
            style={[
              styles.overallContainer,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.overallTitle, { color: colors.text }]}>
              Overall Attendance
            </Text>

            <View style={styles.overallContent}>
              <View style={styles.overallPercentageContainer}>
                <Text
                  style={[styles.overallPercentage, { color: statusColor }]}
                >
                  {overallAttendance}%
                </Text>
                <Text style={[styles.overallStatus, { color: statusColor }]}>
                  {overallStatus}
                </Text>
              </View>

              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${overallAttendance}%`,
                      backgroundColor: statusColor,
                    },
                  ]}
                />
              </View>
            </View>
          </View>

          <FlatList
            data={data?.courses || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <AttendanceCard
                code={item.code}
                name={item.name}
                attendance={item.attendance}
                totalClasses={item.totalClasses}
                attendedClasses={item.attendedClasses}
                status={item.status}
                onPress={() => handleCoursePress(item.id)}
              />
            )}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={handleRefresh} />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colors.inactive }]}>
                  No attendance data available
                </Text>
              </View>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: SIZES.padding,
    paddingBottom: 0,
  },
  title: {
    ...FONTS.bold,
    fontSize: 24,
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    marginTop: 4,
    marginBottom: 16,
  },
  overallContainer: {
    margin: SIZES.padding,
    padding: 16,
    borderRadius: SIZES.radius,
    borderWidth: 1,
  },
  overallTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: 16,
  },
  overallContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  overallPercentageContainer: {
    width: 70,
    marginRight: 15,
  },
  overallPercentage: {
    ...FONTS.bold,
    fontSize: 24,
    marginBottom: 4,
  },
  overallStatus: {
    ...FONTS.medium,
    fontSize: SIZES.small,
  },
  progressBarContainer: {
    flex: 1,
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
  listContainer: {
    padding: SIZES.padding,
  },
  emptyContainer: {
    padding: SIZES.padding * 2,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    textAlign: "center",
  },
});
