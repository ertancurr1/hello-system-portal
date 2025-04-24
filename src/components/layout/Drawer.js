import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { FONTS, SIZES } from "../../theme/theme";

const DrawerItem = ({ label, icon, route, active, onPress, colors }) => {
  return (
    <TouchableOpacity
      style={[
        styles.drawerItem,
        active && { backgroundColor: colors.primary + "20" },
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={20}
        color={active ? colors.primary : colors.text}
      />
      <Text
        style={[
          styles.drawerItemText,
          {
            color: active ? colors.primary : colors.text,
            fontWeight: active ? "bold" : "normal",
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const DrawerSection = ({ title, children, colors }) => {
  return (
    <View style={styles.drawerSection}>
      <Text style={[styles.drawerSectionTitle, { color: colors.inactive }]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const Drawer = ({ closeDrawer }) => {
  const { getTheme } = useTheme();
  const { colors } = getTheme();
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (route) => {
    router.push(route);
    closeDrawer();
  };

  const handleLogout = async () => {
    await logout();
    closeDrawer();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Summary */}
      <View
        style={[styles.profileContainer, { backgroundColor: colors.primary }]}
      >
        <Image
          source={require("../../../assets/profile-placeholder.png")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user?.name || "Student Name"}</Text>
        <Text style={styles.profileId}>ID: {user?.id || "123456"}</Text>
        <Text style={styles.profileEmail}>
          {user?.email || "student@university.edu"}
        </Text>
      </View>

      <ScrollView style={styles.drawerContent}>
        {/* Main Links */}
        <DrawerSection title="MAIN" colors={colors}>
          <DrawerItem
            label="Dashboard"
            icon="home"
            route="/"
            active={pathname === "/"}
            onPress={() => navigateTo("/")}
            colors={colors}
          />
          <DrawerItem
            label="My Profile"
            icon="person"
            route="/profile"
            active={pathname === "/profile"}
            onPress={() => navigateTo("/profile")}
            colors={colors}
          />
          <DrawerItem
            label="Semester Registration"
            icon="calendar"
            route="/registration"
            active={pathname === "/registration"}
            onPress={() => navigateTo("/registration")}
            colors={colors}
          />
        </DrawerSection>

        {/* Academic Section */}
        <DrawerSection title="ACADEMIC" colors={colors}>
          <DrawerItem
            label="Current Courses"
            icon="book"
            route="/academic/current-courses"
            active={pathname === "/academic/current-courses"}
            onPress={() => navigateTo("/academic/current-courses")}
            colors={colors}
          />
          <DrawerItem
            label="My Results"
            icon="trophy"
            route="/academic/results"
            active={pathname === "/academic/results"}
            onPress={() => navigateTo("/academic/results")}
            colors={colors}
          />
          <DrawerItem
            label="Course Attendance"
            icon="calendar-number"
            route="/academic/attendance"
            active={pathname === "/academic/attendance"}
            onPress={() => navigateTo("/academic/attendance")}
            colors={colors}
          />
          <DrawerItem
            label="Past Courses"
            icon="time"
            route="/academic/past-courses"
            active={pathname === "/academic/past-courses"}
            onPress={() => navigateTo("/academic/past-courses")}
            colors={colors}
          />
        </DrawerSection>

        {/* Requests & Services */}
        <DrawerSection title="REQUESTS & SERVICES" colors={colors}>
          <DrawerItem
            label="Online Services"
            icon="globe"
            route="/requests/online-services"
            active={pathname === "/requests/online-services"}
            onPress={() => navigateTo("/requests/online-services")}
            colors={colors}
          />
          <DrawerItem
            label="University Policies"
            icon="document-text"
            route="/requests/policies"
            active={pathname === "/requests/policies"}
            onPress={() => navigateTo("/requests/policies")}
            colors={colors}
          />
          <DrawerItem
            label="Lost Card"
            icon="card"
            route="/requests/lost-card"
            active={pathname === "/requests/lost-card"}
            onPress={() => navigateTo("/requests/lost-card")}
            colors={colors}
          />
          <DrawerItem
            label="Student Wellbeing"
            icon="heart"
            route="/requests/wellbeing"
            active={pathname === "/requests/wellbeing"}
            onPress={() => navigateTo("/requests/wellbeing")}
            colors={colors}
          />
          <DrawerItem
            label="Instructor Appointments"
            icon="people"
            route="/requests/appointments"
            active={pathname === "/requests/appointments"}
            onPress={() => navigateTo("/requests/appointments")}
            colors={colors}
          />
          <DrawerItem
            label="Requests"
            icon="create"
            route="/requests/general"
            active={pathname === "/requests/general"}
            onPress={() => navigateTo("/requests/general")}
            colors={colors}
          />
        </DrawerSection>

        {/* Support */}
        <DrawerSection title="SUPPORT" colors={colors}>
          <DrawerItem
            label="Helpdesk"
            icon="help-buoy"
            route="/support/helpdesk"
            active={pathname === "/support/helpdesk"}
            onPress={() => navigateTo("/support/helpdesk")}
            colors={colors}
          />
          <DrawerItem
            label="Video Tutorials"
            icon="videocam"
            route="/support/tutorials"
            active={pathname === "/support/tutorials"}
            onPress={() => navigateTo("/support/tutorials")}
            colors={colors}
          />
        </DrawerSection>
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.logoutButton, { borderTopColor: colors.border }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out" size={20} color={colors.error} />
        <Text style={[styles.logoutText, { color: colors.error }]}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    padding: SIZES.padding,
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  profileName: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  profileId: {
    ...FONTS.medium,
    fontSize: SIZES.small,
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: 4,
  },
  profileEmail: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginBottom: 10,
  },
  drawerSectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.small,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 10,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: SIZES.padding,
  },
  drawerItemText: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.padding,
    borderTopWidth: 1,
  },
  logoutText: {
    ...FONTS.medium,
    marginLeft: 10,
  },
});

export default Drawer;
