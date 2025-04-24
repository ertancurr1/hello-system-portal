import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../src/context/ThemeContext";
import { FONTS, SIZES } from "../../../src/theme/theme";
import Button from "../../../src/components/ui/Button";

const ServiceCard = ({
  title,
  description,
  icon,
  onPress,
  processing = false,
  lastRequested,
  colors,
  shadows,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.serviceCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          ...shadows.small,
        },
      ]}
      onPress={onPress}
      disabled={processing}
    >
      <View style={styles.serviceHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color={colors.primary} />
        </View>
        <View style={styles.serviceInfo}>
          <Text style={[styles.serviceTitle, { color: colors.text }]}>
            {title}
          </Text>
          <Text style={[styles.serviceDescription, { color: colors.inactive }]}>
            {description}
          </Text>
        </View>
      </View>

      {processing && (
        <View
          style={[
            styles.processingBadge,
            { backgroundColor: colors.warning + "20" },
          ]}
        >
          <Ionicons name="time" size={16} color={colors.warning} />
          <Text style={[styles.processingText, { color: colors.warning }]}>
            Processing
          </Text>
        </View>
      )}

      {lastRequested && !processing && (
        <Text style={[styles.lastRequestedText, { color: colors.inactive }]}>
          Last requested: {lastRequested}
        </Text>
      )}

      <View style={styles.actionContainer}>
        <Button
          title={processing ? "Processing..." : "Request"}
          variant={processing ? "outline" : "primary"}
          disabled={processing}
          size="small"
          style={styles.requestButton}
        />
      </View>
    </TouchableOpacity>
  );
};

export default function OnlineServicesScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode, shadows } = getTheme();

  const [services] = useState([
    {
      id: 1,
      title: "Student Certificate",
      description: "Official certificate stating your enrollment status",
      icon: "document-text",
      processing: false,
      lastRequested: "2025-04-10",
    },
    {
      id: 2,
      title: "Transcript",
      description: "Official record of your academic performance",
      icon: "list",
      processing: true,
      lastRequested: "2025-04-20",
    },
    {
      id: 3,
      title: "Enrollment Verification",
      description: "Verification of your current enrollment status",
      icon: "checkmark-circle",
      processing: false,
      lastRequested: null,
    },
    {
      id: 4,
      title: "GPA Certificate",
      description: "Certificate showing your current GPA",
      icon: "ribbon",
      processing: false,
      lastRequested: "2025-03-15",
    },
    {
      id: 5,
      title: "Student ID Replacement",
      description: "Request a replacement for a lost or damaged student ID",
      icon: "card",
      processing: false,
      lastRequested: null,
    },
    {
      id: 6,
      title: "Good Standing Certificate",
      description: "Certificate indicating you are in good academic standing",
      icon: "shield-checkmark",
      processing: false,
      lastRequested: null,
    },
  ]);

  const handleServicePress = (service) => {
    if (service.processing) {
      Alert.alert(
        "Request Processing",
        `Your request for ${service.title} is currently being processed. Please check back later.`,
        [{ text: "OK" }]
      );
      return;
    }

    Alert.alert(
      `Request ${service.title}`,
      `Are you sure you want to request a ${service.title}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Request",
          onPress: () => {
            // In a real app, this would call an API to request the service
            Alert.alert(
              "Request Submitted",
              `Your request for ${service.title} has been submitted. You will be notified when it's ready.`,
              [{ text: "OK" }]
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Online Services
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Request documents and certifications online
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle"
            size={24}
            color={colors.primary}
          />
          <Text style={[styles.infoText, { color: colors.text }]}>
            Documents typically take 1-3 business days to process. You will
            receive a notification when your document is ready.
          </Text>
        </View>

        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            processing={service.processing}
            lastRequested={service.lastRequested}
            onPress={() => handleServicePress(service)}
            colors={colors}
            shadows={shadows}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: SIZES.padding,
  },
  title: {
    ...FONTS.bold,
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
  },
  container: {
    padding: SIZES.padding,
    paddingTop: 0,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    padding: 16,
    borderRadius: SIZES.radius,
    marginBottom: 16,
  },
  infoText: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginLeft: 10,
    flex: 1,
  },
  serviceCard: {
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  serviceHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: 4,
  },
  serviceDescription: {
    ...FONTS.regular,
    fontSize: SIZES.small,
  },
  processingBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SIZES.radius - 4,
    marginBottom: 12,
  },
  processingText: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    marginLeft: 4,
  },
  lastRequestedText: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    marginBottom: 12,
  },
  actionContainer: {
    alignItems: "flex-end",
  },
  requestButton: {
    minWidth: 100,
  },
});
