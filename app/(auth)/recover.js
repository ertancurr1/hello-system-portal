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
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../src/context/ThemeContext";
import { useAuth } from "../../src/context/AuthContext";
import { SIZES, FONTS } from "../../src/theme/theme";
import InputField from "../../src/components/ui/InputField";
import Button from "../../src/components/ui/Button";

export default function RecoverPasswordScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode } = getTheme();
  const { recoverPassword, isLoading, authError } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleRecoverPassword = async () => {
    if (validateEmail()) {
      const success = await recoverPassword(email);
      if (success) {
        setIsSuccess(true);
        Alert.alert(
          "Password Recovery",
          "A password reset link has been sent to your email.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/login"),
            },
          ]
        );
      }
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

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        {/* University Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/university-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.appTitle, { color: colors.primary }]}>
            Password Recovery
          </Text>
          <Text style={[styles.appSubtitle, { color: colors.text }]}>
            Enter your university email to recover your password
          </Text>
        </View>

        {/* Recovery Form */}
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

          {isSuccess && (
            <View
              style={[
                styles.successContainer,
                { backgroundColor: colors.success + "20" },
              ]}
            >
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={colors.success}
                style={styles.errorIcon}
              />
              <Text style={[styles.successText, { color: colors.success }]}>
                Password recovery email sent. Check your inbox.
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
            error={emailError}
            icon={<Ionicons name="mail" />}
            required
          />

          <Button
            title="Send Recovery Link"
            onPress={handleRecoverPassword}
            loading={isLoading}
            style={styles.recoverButton}
          />

          <Button
            title="Back to Login"
            onPress={() => router.replace("/login")}
            variant="outline"
            style={styles.backToLoginButton}
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
  backButton: {
    position: "absolute",
    top: SIZES.padding,
    left: SIZES.padding,
    zIndex: 10,
    padding: 8,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: SIZES.margin * 5,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: SIZES.margin,
  },
  appTitle: {
    ...FONTS.bold,
    fontSize: 28,
    marginBottom: 8,
  },
  appSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    opacity: 0.8,
    textAlign: "center",
    maxWidth: 300,
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
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin,
  },
  successText: {
    ...FONTS.medium,
    fontSize: SIZES.small,
    flex: 1,
  },
  recoverButton: {
    height: 50,
    marginBottom: SIZES.margin,
  },
  backToLoginButton: {
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
