import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../src/context/ThemeContext";
import { QueryProvider } from "../src/context/QueryProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryProvider>
    </ThemeProvider>
  );
}
