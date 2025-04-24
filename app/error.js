import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../src/context/ThemeContext";
import { FONTS, SIZES } from "../src/theme/theme";
import Button from "../src/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";

export default function ErrorScreen({ errorMessage }) {
  const router = useRouter();
  const { getTheme } = useTheme();
  const { colors } = getTheme();

  const message =
    errorMessage || "Something went wrong. Please try again later.";

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Ionicons
          name="alert-circle-outline"
          size={80}
          color={colors.error}
          style={styles.icon}
        />

        <Text style={[styles.title, { color: colors.text }]}>Oops!</Text>

        <Text style={[styles.message, { color: colors.text }]}>{message}</Text>

        <Button
          title="Go Back"
          onPress={handleGoBack}
          icon={<Ionicons name="arrow-back" size={20} color="#FFFFFF" />}
          style={styles.button}
        />
      </View>

      <Text style={[styles.footerText, { color: colors.inactive }]}>
        Error code: 500
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.padding * 2,
  },
  content: {
    alignItems: "center",
    maxWidth: 400,
  },
  icon: {
    marginBottom: SIZES.margin * 2,
  },
  title: {
    ...FONTS.bold,
    fontSize: 28,
    marginBottom: SIZES.margin,
  },
  message: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    textAlign: "center",
    marginBottom: SIZES.margin * 2,
  },
  button: {
    width: 150,
  },
  footerText: {
    ...FONTS.light,
    fontSize: SIZES.small,
    position: "absolute",
    bottom: SIZES.padding * 2,
  },
});
