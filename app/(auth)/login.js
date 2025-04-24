import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../src/context/ThemeContext";
import { useAuth } from "../../src/context/AuthContext";
import { SIZES, FONTS } from "../../src/theme/theme";
import InputField from "../../src/components/ui/InputField";
import Button from "../../src/components/ui/Button";
import LoadingIndicator from "../../src/components/ui/LoadingIndicator";

export default function LoginScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode } = getTheme();
  const { login, isLoading, authError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateInputs()) {
      await login(email, password);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
      >
        <StatusBar style={isDarkMode ? "light" : "dark"} />

        {/* University Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/university-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.appTitle, { color: colors.primary }]}>
            Hello! System
          </Text>
          <Text style={[styles.appSubtitle, { color: colors.text }]}>
            Student University Portal
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          {authError && (
            <View
              style={[
                styles.errorContainer,
                { backgroundColor: colors.error + "20" },
              ]}
            >
              <Ionicons
                name="alert-circle"
                size={24}
                color={colors.error}
                style={styles.errorIcon}
              />
              <Text style={[styles.errorText, { color: colors.error }]}>
                {authError}
              </Text>
            </View>
          )}

          <InputField
            label="University Email"
            value={email}
            onChangeText={setEmail}
            placeholder="youremail@university.edu"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            icon={<Ionicons name="mail" />}
            required
          />

          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password}
            icon={<Ionicons name="lock-closed" />}
            required
          />

          <Link href="/recover" asChild>
            <TouchableOpacity style={styles.forgotPassword}>
              <Text
                style={[styles.forgotPasswordText, { color: colors.primary }]}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </Link>

          <Button
            title="Login"
            onPress={handleLogin}
            loading={isLoading}
            style={styles.loginButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.inactive }]}>
            © 2025 University. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 2,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: SIZES.margin * 3,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: SIZES.margin,
  },
  appTitle: {
    ...FONTS.bold,
    fontSize: 32,
    marginBottom: 8,
  },
  appSubtitle: {
    ...FONTS.medium,
    fontSize: SIZES.large,
    opacity: 0.8,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    marginVertical: SIZES.margin * 3,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin,
  },
  errorIcon: {
    marginRight: 8,
  },
  errorText: {
    ...FONTS.medium,
    fontSize: SIZES.small,
    flex: 1,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: SIZES.margin * 2,
  },
  forgotPasswordText: {
    ...FONTS.medium,
    fontSize: SIZES.small,
  },
  loginButton: {
    height: 50,
  },
  footer: {
    alignItems: "center",
    marginTop: SIZES.margin * 2,
  },
  footerText: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
  },
});
