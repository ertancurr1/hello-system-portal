import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { FONTS, SIZES } from "../../theme/theme";

const SectionCard = ({
  title,
  icon,
  children,
  onSeeAll,
  style,
  contentStyle,
}) => {
  const { getTheme } = useTheme();
  const { colors, shadows } = getTheme();

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

        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll} style={styles.seeAllButton}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>
              See All
            </Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  title: {
    ...FONTS.bold,
    fontSize: SIZES.large,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    ...FONTS.medium,
    fontSize: SIZES.small,
    marginRight: 4,
  },
  content: {
    // Content styling handled by children
  },
});

export default SectionCard;
