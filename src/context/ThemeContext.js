import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SHADOWS } from "../theme/theme";

// Create the context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Load theme preference from storage on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const themePreference = await AsyncStorage.getItem("themePreference");

        if (themePreference !== null) {
          setIsDarkMode(themePreference === "dark");
        } else {
          // If no preference is set, use device theme
          setIsDarkMode(deviceTheme === "dark");
        }

        setIsThemeLoaded(true);
      } catch (error) {
        console.error("Failed to load theme preference:", error);
        setIsDarkMode(deviceTheme === "dark");
        setIsThemeLoaded(true);
      }
    };

    loadThemePreference();
  }, [deviceTheme]);

  // Save theme preference when it changes
  useEffect(() => {
    if (isThemeLoaded) {
      const saveThemePreference = async () => {
        try {
          await AsyncStorage.setItem(
            "themePreference",
            isDarkMode ? "dark" : "light"
          );
        } catch (error) {
          console.error("Failed to save theme preference:", error);
        }
      };

      saveThemePreference();
    }
  }, [isDarkMode, isThemeLoaded]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Get current theme colors
  const getTheme = () => ({
    colors: isDarkMode ? COLORS.dark : COLORS.light,
    shadows: isDarkMode ? SHADOWS.dark : SHADOWS.light,
    isDarkMode,
  });

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme, getTheme, isThemeLoaded }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
