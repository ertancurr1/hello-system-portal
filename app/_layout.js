// app/_layout.js
import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../src/context/ThemeContext";
import { QueryProvider } from "../src/context/QueryProvider";
import { AuthProvider } from "../src/context/AuthContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
