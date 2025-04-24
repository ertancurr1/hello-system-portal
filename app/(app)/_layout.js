import React, { useState, useRef } from "react";
import { Stack } from "expo-router";
import { DrawerLayoutAndroid, Platform, View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Drawer from "../../src/components/layout/Drawer";
import Header from "../../src/components/layout/Header";
import { useTheme } from "../../src/context/ThemeContext";

export default function AppLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const { getTheme } = useTheme();
  const { colors } = getTheme();

  const openDrawer = () => {
    if (Platform.OS === "android") {
      drawerRef.current?.openDrawer();
    }
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    if (Platform.OS === "android") {
      drawerRef.current?.closeDrawer();
    }
    setIsDrawerOpen(false);
  };

  // Wrapper for iOS drawer since DrawerLayoutAndroid is Android specific
  if (Platform.OS === "ios") {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Header showMenuButton={true} onMenuPress={openDrawer} />

          {isDrawerOpen && (
            <View style={[StyleSheet.absoluteFill, { zIndex: 1000 }]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "80%" }}>
                  <Drawer closeDrawer={closeDrawer} />
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                  onTouchEnd={closeDrawer}
                />
              </View>
            </View>
          )}

          <Stack
            screenOptions={{
              header: () => null,
            }}
          />
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={() => <Drawer closeDrawer={closeDrawer} />}
      >
        <Header showMenuButton={true} onMenuPress={openDrawer} />
        <Stack
          screenOptions={{
            header: () => null,
          }}
        />
      </DrawerLayoutAndroid>
    </GestureHandlerRootView>
  );
}
