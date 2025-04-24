import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../src/context/ThemeContext";
import { useAuth } from "../src/context/AuthContext";
import { FONTS, SIZES } from "../src/theme/theme";
import Button from "../src/components/ui/Button"; // Make sure this import is correct

export default function HomeScreen() {
  const { isDarkMode, toggleTheme, getTheme } = useTheme();
  const { colors } = getTheme();
  const { user, logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <Text style={[styles.title, { color: colors.primary }]}>
        Hello! System Dashboard
      </Text>

      {user && (
        <Text style={[styles.welcomeText, { color: colors.text }]}>
          Welcome, {user.name || "Student"}!
        </Text>
      )}

      <View style={styles.themeToggle}>
        <Text style={[styles.toggleText, { color: colors.text }]}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={isDarkMode ? colors.accent : "#f4f3f4"}
        />
      </View>

      <Button
        title="Logout"
        onPress={logout}
        variant="outline"
        style={styles.logoutButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...FONTS.bold,
    fontSize: 28,
    marginBottom: 10,
  },
  welcomeText: {
    ...FONTS.medium,
    fontSize: SIZES.large,
    marginBottom: 30,
  },
  themeToggle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  toggleText: {
    ...FONTS.medium,
    marginRight: 10,
  },
  logoutButton: {
    width: 200,
    marginTop: 20,
  },
});
