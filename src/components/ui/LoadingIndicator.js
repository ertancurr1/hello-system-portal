import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { FONTS, SIZES } from "../../theme/theme";

const LoadingIndicator = ({
  size = "large",
  text = "Loading...",
  fullScreen = false,
  color,
  textStyle,
  containerStyle,
}) => {
  const { getTheme } = useTheme();
  const { colors } = getTheme();

  return (
    <View
      style={[
        styles.container,
        fullScreen && styles.fullScreen,
        { backgroundColor: fullScreen ? colors.background : "transparent" },
        containerStyle,
      ]}
    >
      <ActivityIndicator size={size} color={color || colors.primary} />
      {text && (
        <Text style={[styles.text, { color: colors.text }, textStyle]}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.padding,
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  text: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    marginTop: 10,
  },
});

export default LoadingIndicator;
