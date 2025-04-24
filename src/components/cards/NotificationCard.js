import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { FONTS, SIZES } from "../../theme/theme";

const NotificationCard = ({
  title,
  message,
  timestamp,
  type = "info", // info, success, warning, error
  onPress,
  isRead = false,
  style,
}) => {
  const { getTheme } = useTheme();
  const { colors, shadows } = getTheme();

  // Get icon based on notification type
  const getIcon = () => {
    switch (type) {
      case "success":
        return {
          name: "checkmark-circle",
          color: colors.success,
        };
      case "warning":
        return {
          name: "alert-circle",
          color: colors.warning,
        };
      case "error":
        return {
          name: "close-circle",
          color: colors.error,
        };
      case "info":
      default:
        return {
          name: "information-circle",
          color: colors.secondary,
        };
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    // For simple string timestamp
    if (typeof timestamp === "string") {
      return timestamp;
    }

    // If it's a date object
    if (timestamp instanceof Date) {
      return timestamp.toLocaleString();
    }

    return "";
  };

  const icon = getIcon();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderLeftColor: icon.color,
          ...shadows.small,
          opacity: isRead ? 0.8 : 1,
        },
        style,
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon.name} size={24} color={icon.color} />
      </View>

      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontWeight: isRead ? "normal" : "bold",
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

        <Text
          style={[styles.message, { color: colors.text }]}
          numberOfLines={2}
        >
          {message}
        </Text>

        <Text style={[styles.timestamp, { color: colors.inactive }]}>
          {formatTimestamp(timestamp)}
        </Text>
      </View>

      {!isRead && (
        <View
          style={[
            styles.unreadIndicator,
            { backgroundColor: colors.notification },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: SIZES.radius,
    padding: 12,
    marginVertical: 6,
    borderLeftWidth: 4,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    marginBottom: 4,
  },
  message: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginBottom: 6,
  },
  timestamp: {
    ...FONTS.light,
    fontSize: SIZES.xs,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default NotificationCard;
