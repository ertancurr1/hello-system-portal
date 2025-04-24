import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { SIZES, FONTS } from "../../theme/theme";

const Button = ({
  title,
  onPress,
  variant = "primary", // primary, secondary, outline, text
  size = "medium", // small, medium, large
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  style,
  textStyle,
  ...props
}) => {
  const { getTheme } = useTheme();
  const { colors, shadows } = getTheme();

  // Determine button style based on variant
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
          ...shadows.small,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: colors.primary,
          borderWidth: 1,
        };
      case "text":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        };
      case "primary":
      default:
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
          ...shadows.small,
        };
    }
  };

  // Determine button size
  const getButtonSizeStyle = () => {
    switch (size) {
      case "small":
        return {
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: SIZES.radius - 2,
        };
      case "large":
        return {
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: SIZES.radius + 2,
        };
      case "medium":
      default:
        return {
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: SIZES.radius,
        };
    }
  };

  // Determine text color based on variant
  const getTextColor = () => {
    switch (variant) {
      case "outline":
        return colors.primary;
      case "text":
        return colors.primary;
      default:
        return "#FFFFFF";
    }
  };

  // Determine text size based on button size
  const getTextSize = () => {
    switch (size) {
      case "small":
        return SIZES.small;
      case "large":
        return SIZES.large;
      case "medium":
      default:
        return SIZES.medium;
    }
  };

  // Combine all styles
  const buttonStyle = {
    ...getButtonStyle(),
    ...getButtonSizeStyle(),
    opacity: disabled ? 0.7 : 1,
  };

  const textColorStyle = {
    color: getTextColor(),
    fontSize: getTextSize(),
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "outline" || variant === "text"
              ? colors.primary
              : "#FFFFFF"
          }
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === "left" && (
            <View style={styles.iconLeft}>{icon}</View>
          )}

          <Text style={[styles.text, textColorStyle, textStyle]}>{title}</Text>

          {icon && iconPosition === "right" && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    minWidth: 80,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...FONTS.medium,
    textAlign: "center",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default Button;
