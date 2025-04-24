import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");

export const COLORS = {
  // Light theme colors
  light: {
    primary: "#1E3A8A", // University dark blue
    secondary: "#3B82F6", // University light blue
    accent: "#F59E0B", // University gold
    background: "#FFFFFF",
    card: "#F8FAFC",
    text: "#0F172A",
    border: "#E2E8F0",
    notification: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    inactive: "#94A3B8",
  },

  // Dark theme colors
  dark: {
    primary: "#3B82F6", // Lighter blue for dark mode
    secondary: "#60A5FA", // Even lighter blue for dark mode
    accent: "#FBBF24", // Brighter gold for dark mode
    background: "#0F172A",
    card: "#1E293B",
    text: "#F8FAFC",
    border: "#334155",
    notification: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    inactive: "#64748B",
  },
};

export const SIZES = {
  // Font sizes
  xs: 10,
  small: 12,
  medium: 14,
  large: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,

  // Padding and margin
  padding: 15,
  margin: 15,
  radius: 8,

  // Width percentages
  width25: width * 0.25,
  width50: width * 0.5,
  width75: width * 0.75,
  width100: width,

  // Height percentages
  height25: height * 0.25,
  height50: height * 0.5,
  height75: height * 0.75,
  height100: height,
};

export const FONTS = {
  regular: {
    fontFamily: "System",
    fontWeight: "normal",
  },
  medium: {
    fontFamily: "System",
    fontWeight: "500",
  },
  bold: {
    fontFamily: "System",
    fontWeight: "bold",
  },
  light: {
    fontFamily: "System",
    fontWeight: "300",
  },
};

export const SHADOWS = {
  light: {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  dark: {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.4,
      shadowRadius: 1.41,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.43,
      shadowRadius: 2.62,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};
