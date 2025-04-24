import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { FONTS, SIZES } from "../../theme/theme";

const AttendanceCard = ({
  code,
  name,
  attendance,
  totalClasses,
  attendedClasses,
  status,
  onPress,
  style,
}) => {
  const { getTheme } = useTheme();
  const { colors, shadows } = getTheme();

  // Get status color
  const getStatusColor = () => {
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

  const statusColor = getStatusColor();

  return (
    <TouchableOpacity
      onPress={onPress}
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
      <View style={styles.header}>
        <View>
          <Text style={[styles.courseCode, { color: colors.primary }]}>
            {code}
          </Text>
          <Text style={[styles.courseName, { color: colors.text }]}>
            {name}
          </Text>
        </View>
        <View
          style={[styles.statusBadge, { backgroundColor: statusColor + "20" }]}
        >
          <Text style={[styles.statusText, { color: statusColor }]}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.attendanceContainer}>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${attendance}%`,
                backgroundColor: statusColor,
              },
            ]}
          />
        </View>
        <Text style={[styles.attendanceValue, { color: statusColor }]}>
          {attendance}%
        </Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={[styles.detailsText, { color: colors.text }]}>
          Attended {attendedClasses} of {totalClasses} classes
        </Text>
        <Ionicons name="chevron-forward" size={20} color={colors.inactive} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
  },
  header: {
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
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SIZES.radius - 4,
    minWidth: 70,
    alignItems: "center",
  },
  statusText: {
    ...FONTS.bold,
    fontSize: SIZES.small,
  },
  attendanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  progressBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 10,
  },
  progressBar: {
    height: "100%",
  },
  attendanceValue: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    minWidth: 45,
    textAlign: "right",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsText: {
    ...FONTS.regular,
    fontSize: SIZES.small,
  },
});

export default AttendanceCard;
