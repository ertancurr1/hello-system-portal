import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../src/context/ThemeContext";
import { useAuth } from "../../src/context/AuthContext";
import { FONTS, SIZES } from "../../src/theme/theme";

export default function DashboardScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode } = getTheme();
  const { user } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.welcomeText, { color: colors.text }]}>
          Welcome, {user?.name || "Student"}!
        </Text>

        <Text style={[styles.heading, { color: colors.primary }]}>
          Dashboard
        </Text>

        <Text style={[styles.infoText, { color: colors.text }]}>
          This is the dashboard screen. We will implement the rest of the
          features in the next steps.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SIZES.padding,
  },
  welcomeText: {
    ...FONTS.medium,
    fontSize: SIZES.large,
    marginBottom: 10,
  },
  heading: {
    ...FONTS.bold,
    fontSize: 26,
    marginBottom: 20,
  },
  infoText: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
  },
});
