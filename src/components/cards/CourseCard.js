import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { FONTS, SIZES } from "../../theme/theme";

const CourseCard = ({
  code,
  name,
  instructor,
  schedule,
  room,
  credits,
  syllabus,
  onPress,
  style,
}) => {
  const { getTheme } = useTheme();
  const { colors, shadows } = getTheme();

  const handleSyllabusPress = async () => {
    // Open syllabus link if available
    if (syllabus && (await Linking.canOpenURL(syllabus))) {
      await Linking.openURL(syllabus);
    }
  };

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
          style={[styles.creditsBadge, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.creditsText}>{credits} CR</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="person" size={16} color={colors.secondary} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            {instructor}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="time" size={16} color={colors.secondary} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            {schedule}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="location" size={16} color={colors.secondary} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            Room {room}
          </Text>
        </View>
      </View>

      {syllabus && (
        <TouchableOpacity
          style={[
            styles.syllabusButton,
            { backgroundColor: colors.secondary + "15" },
          ]}
          onPress={handleSyllabusPress}
        >
          <Ionicons name="document-text" size={16} color={colors.secondary} />
          <Text style={[styles.syllabusText, { color: colors.secondary }]}>
            View Syllabus
          </Text>
        </TouchableOpacity>
      )}
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
  infoContainer: {
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  infoText: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginLeft: 8,
  },
  syllabusButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: SIZES.radius - 4,
  },
  syllabusText: {
    ...FONTS.medium,
    fontSize: SIZES.small,
    marginLeft: 8,
  },
});

export default CourseCard;
