import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../src/context/ThemeContext";
import { SIZES, FONTS } from "../src/theme/theme";
import InputField from "../src/components/ui/InputField";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { isDarkMode, toggleTheme, getTheme } = useTheme();
  const { colors } = getTheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <Text style={[styles.title, { color: colors.primary }]}>
        Hello! System Test
      </Text>

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

      <View style={styles.form}>
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          icon={<Ionicons name="mail" />}
          required
        />

        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          icon={<Ionicons name="lock-closed" />}
          required
        />
      </View>

      <Text style={[styles.info, { color: colors.text }]}>
        This is a test screen for the first phase. Our theming works!
      </Text>
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
  form: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 30,
  },
  info: {
    ...FONTS.regular,
    textAlign: "center",
  },
});
