import React, { useEffect } from "react";
import { Slot, SplashScreen } from "expo-router";
import { ThemeProvider } from "../src/context/ThemeContext";
import { QueryProvider } from "../src/context/QueryProvider";
import { AuthProvider } from "../src/context/AuthContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after resources are loaded
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
