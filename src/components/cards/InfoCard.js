import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { FONTS, SIZES } from "../../theme/theme";

const InfoCard = ({
  title,
  value,
  icon,
  onPress,
  style,
  copyable = false,
  onCopy,
}) => {
  const { getTheme } = useTheme();
  const { colors, shadows } = getTheme();

  const handleCopy = () => {
    if (onCopy && copyable) {
      onCopy(value);
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
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={colors.primary}
              style={styles.icon}
            />
          )}
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        </View>
        {copyable && (
          <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
            <Ionicons name="copy-outline" size={18} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>

      {onPress && (
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: colors.primary + "10" },
          ]}
          onPress={onPress}
        >
          <Text style={[styles.actionText, { color: colors.primary }]}>
            View Details
          </Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
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
    alignItems: "center",
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  title: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
  },
  copyButton: {
    padding: 4,
  },
  value: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: SIZES.radius - 4,
    marginTop: 4,
  },
  actionText: {
    ...FONTS.medium,
    fontSize: SIZES.small,
    marginRight: 4,
  },
});

export default InfoCard;
