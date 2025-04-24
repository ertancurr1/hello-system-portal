import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { FONTS, SIZES } from "../../theme/theme";

const QuickActionCard = ({
  title,
  description,
  icon,
  onPress,
  color,
  badge,
  style,
}) => {
  const { getTheme } = useTheme();
  const { colors, shadows, isDarkMode } = getTheme();

  const cardColor = color || colors.primary;
  const textColor = isDarkMode
    ? "#FFFFFF"
    : cardColor === colors.primary
    ? "#FFFFFF"
    : colors.text;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: cardColor,
          ...shadows.medium,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {badge && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: colors.notification,
            },
          ]}
        >
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}

      <View style={styles.iconContainer}>
        {typeof icon === "string" ? (
          <Ionicons name={icon} size={28} color={textColor} />
        ) : (
          icon
        )}
      </View>

      <Text
        style={[
          styles.title,
          {
            color: textColor,
          },
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>

      {description && (
        <Text
          style={[
            styles.description,
            {
              color: textColor,
              opacity: 0.8,
            },
          ]}
          numberOfLines={2}
        >
          {description}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    padding: 16,
    minHeight: 120,
    minWidth: 120,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    ...FONTS.bold,
    fontSize: SIZES.xs,
    color: "#FFFFFF",
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    textAlign: "center",
    marginBottom: 4,
  },
  description: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    textAlign: "center",
  },
});

export default QuickActionCard;
