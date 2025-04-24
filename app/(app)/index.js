import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Alert,
  FlatList,
  Clipboard,
  useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";

import { useTheme } from "../../src/context/ThemeContext";
import { useAuth } from "../../src/context/AuthContext";
import { FONTS, SIZES } from "../../src/theme/theme";
import LoadingIndicator from "../../src/components/ui/LoadingIndicator";
import NotificationCard from "../../src/components/cards/NotificationCard";
import QuickActionCard from "../../src/components/cards/QuickActionCard";
import InfoCard from "../../src/components/cards/InfoCard";
import SectionCard from "../../src/components/cards/SectionCard";

import useNotifications from "../../src/hooks/useNotifications";
import useCourseAnnouncements from "../../src/hooks/useCourseAnnouncements";
import useConsultationHours from "../../src/hooks/useConsultationHours";
import useCredentials from "../../src/hooks/useCredentials";

export default function DashboardScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode } = getTheme();
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { width } = useWindowDimensions();

  // Determine number of cards per row based on screen width
  const cardsPerRow = width > 700 ? 4 : width > 500 ? 3 : 2;
  const cardWidth =
    (width - SIZES.padding * 2 - (cardsPerRow - 1) * 16) / cardsPerRow;

  // React Query hooks
  const {
    data: notifications,
    isLoading: isLoadingNotifications,
    refetch: refetchNotifications,
  } = useNotifications(5);

  const {
    data: courseAnnouncements,
    isLoading: isLoadingAnnouncements,
    refetch: refetchAnnouncements,
  } = useCourseAnnouncements(5);

  const {
    data: consultationHours,
    isLoading: isLoadingConsultations,
    refetch: refetchConsultations,
  } = useConsultationHours();

  const {
    data: credentials,
    isLoading: isLoadingCredentials,
    refetch: refetchCredentials,
  } = useCredentials();

  // Refresh all data
  const onRefresh = useCallback(() => {
    refetchNotifications();
    refetchAnnouncements();
    refetchConsultations();
    refetchCredentials();
  }, [
    refetchNotifications,
    refetchAnnouncements,
    refetchConsultations,
    refetchCredentials,
  ]);

  // Handle notification press
  const handleNotificationPress = (notification) => {
    // Mark as read and navigate if needed
    Alert.alert("Notification", notification.message);
  };

  // Handle copy to clipboard
  const handleCopyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Copied", "Text copied to clipboard");
  };

  // Quick actions data
  const quickActions = [
    {
      id: "profile",
      title: "My Profile",
      icon: "person",
      onPress: () => router.push("/profile"),
    },
    {
      id: "invoices",
      title: "Invoices",
      icon: "receipt",
      onPress: () => router.push("/finance/invoices"),
    },
    {
      id: "courses",
      title: "Current Courses",
      icon: "book",
      onPress: () => router.push("/academic/current-courses"),
      badge: "5",
    },
    {
      id: "elearning",
      title: "eLearning",
      icon: "globe",
      onPress: () => router.push("/academic/elearning"),
    },
    {
      id: "results",
      title: "Results",
      icon: "trophy",
      onPress: () => router.push("/academic/results"),
    },
    {
      id: "attendance",
      title: "Attendance",
      icon: "calendar",
      onPress: () => router.push("/academic/attendance"),
    },
    {
      id: "services",
      title: "Online Services",
      icon: "document-text",
      onPress: () => router.push("/requests/online-services"),
    },
    {
      id: "requests",
      title: "Requests",
      icon: "create",
      onPress: () => router.push("/requests/general"),
    },
    {
      id: "graduation",
      title: "Graduation",
      icon: "school",
      onPress: () => router.push("/academic/graduation"),
    },
    {
      id: "international",
      title: "International Relations",
      icon: "earth",
      onPress: () => router.push("/requests/international"),
    },
    {
      id: "helpdesk",
      title: "Helpdesk",
      icon: "help-buoy",
      onPress: () => router.push("/support/helpdesk"),
    },
    {
      id: "tutorials",
      title: "Video Tutorials",
      icon: "videocam",
      onPress: () => router.push("/support/tutorials"),
    },
  ];

  const renderConsultationItem = ({ item }) => (
    <View
      style={[styles.consultationItem, { borderBottomColor: colors.border }]}
    >
      <View style={styles.consultationInfo}>
        <Text style={[styles.instructorName, { color: colors.text }]}>
          {item.instructor}
        </Text>
        <Text style={[styles.courseCode, { color: colors.inactive }]}>
          {item.course}
        </Text>
      </View>
      <View>
        <Text style={[styles.consultationDay, { color: colors.text }]}>
          {item.day}
        </Text>
        <Text style={[styles.consultationTime, { color: colors.secondary }]}>
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      >
        <Text style={[styles.welcomeText, { color: colors.text }]}>
          Welcome, {user?.name || "Student"}!
        </Text>

        {/* Credentials */}
        <View style={styles.row}>
          {isLoadingCredentials ? (
            <LoadingIndicator text="Loading credentials..." />
          ) : (
            <>
              <InfoCard
                title="Wi-Fi Credentials"
                value={
                  credentials?.wifi
                    ? `${credentials.wifi.username} / ${credentials.wifi.password}`
                    : "Loading..."
                }
                icon="wifi"
                copyable
                onCopy={handleCopyToClipboard}
                style={{ flex: 1, marginRight: 8 }}
              />
              <InfoCard
                title="Email Credentials"
                value={credentials?.email || "student@university.edu"}
                icon="mail"
                copyable
                onCopy={handleCopyToClipboard}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </>
          )}
        </View>

        {/* University Notifications */}
        <SectionCard
          title="Last 5 University Notifications"
          icon="notifications"
          onSeeAll={() => router.push("/notifications")}
        >
          {isLoadingNotifications ? (
            <LoadingIndicator text="Loading notifications..." />
          ) : (
            <>
              {notifications?.notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  title={notification.title}
                  message={notification.message}
                  timestamp={notification.timestamp}
                  type={notification.type}
                  isRead={notification.isRead}
                  onPress={() => handleNotificationPress(notification)}
                />
              ))}
              {(!notifications?.notifications ||
                notifications.notifications.length === 0) && (
                <Text style={[styles.emptyText, { color: colors.inactive }]}>
                  No notifications at this time
                </Text>
              )}
            </>
          )}
        </SectionCard>

        {/* Course Announcements */}
        <SectionCard
          title="Course Announcements"
          icon="megaphone"
          onSeeAll={() => router.push("/academic/announcements")}
        >
          {isLoadingAnnouncements ? (
            <LoadingIndicator text="Loading announcements..." />
          ) : (
            <>
              {courseAnnouncements?.announcements.map((announcement) => (
                <NotificationCard
                  key={announcement.id}
                  title={announcement.course}
                  message={announcement.message}
                  timestamp={announcement.timestamp}
                  type="info"
                  isRead={announcement.isRead}
                  onPress={() => handleNotificationPress(announcement)}
                />
              ))}
              {(!courseAnnouncements?.announcements ||
                courseAnnouncements.announcements.length === 0) && (
                <Text style={[styles.emptyText, { color: colors.inactive }]}>
                  No course announcements at this time
                </Text>
              )}
            </>
          )}
        </SectionCard>

        {/* Consultation Hours */}
        <SectionCard
          title="Consultation Hours"
          icon="time"
          onSeeAll={() => router.push("/academic/consultation-hours")}
        >
          {isLoadingConsultations ? (
            <LoadingIndicator text="Loading consultation hours..." />
          ) : (
            <>
              {consultationHours?.consultations && (
                <FlatList
                  data={consultationHours.consultations}
                  renderItem={renderConsultationItem}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
                />
              )}
              {(!consultationHours?.consultations ||
                consultationHours.consultations.length === 0) && (
                <Text style={[styles.emptyText, { color: colors.inactive }]}>
                  No consultation hours available
                </Text>
              )}
            </>
          )}
        </SectionCard>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Ionicons name="flash" size={24} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quick Actions
          </Text>
        </View>

        <View style={styles.quickActionsContainer}>
          {quickActions.map((action) => (
            <QuickActionCard
              key={action.id}
              title={action.title}
              icon={action.icon}
              badge={action.badge}
              onPress={action.onPress}
              style={{ width: cardWidth, height: 110 }}
              color={action.color || colors.primary}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SIZES.padding,
  },
  welcomeText: {
    ...FONTS.bold,
    fontSize: 22,
    marginBottom: SIZES.margin,
  },
  row: {
    flexDirection: "row",
    marginVertical: 8,
  },
  emptyText: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    textAlign: "center",
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    marginLeft: 8,
  },
  quickActionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8, // Compensate for card margins
  },
  consultationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  consultationInfo: {
    flex: 1,
  },
  instructorName: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    marginBottom: 4,
  },
  courseCode: {
    ...FONTS.regular,
    fontSize: SIZES.small,
  },
  consultationDay: {
    ...FONTS.medium,
    fontSize: SIZES.small,
    textAlign: "right",
  },
  consultationTime: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    textAlign: "right",
  },
});
