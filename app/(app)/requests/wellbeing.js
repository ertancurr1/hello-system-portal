import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../src/context/ThemeContext";
import { FONTS, SIZES } from "../../../src/theme/theme";
import Button from "../../../src/components/ui/Button";

const ServicesCard = ({
  title,
  description,
  icon,
  onPress,
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
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.primary + "15" },
        ]}
      >
        <Ionicons name={icon} size={28} color={colors.primary} />
      </View>

      <View style={styles.serviceContent}>
        <Text style={[styles.serviceTitle, { color: colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.serviceDescription, { color: colors.inactive }]}>
          {description}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={24} color={colors.inactive} />
    </TouchableOpacity>
  );
};

const ResourceCard = ({
  title,
  description,
  url,
  onPress,
  colors,
  shadows,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.resourceCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          ...shadows.small,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.resourceTitle, { color: colors.text }]}>
        {title}
      </Text>
      <Text style={[styles.resourceDescription, { color: colors.inactive }]}>
        {description}
      </Text>

      <View
        style={[
          styles.resourceLinkContainer,
          { backgroundColor: colors.primary + "10" },
        ]}
      >
        <Ionicons name="link" size={16} color={colors.primary} />
        <Text
          style={[styles.resourceLink, { color: colors.primary }]}
          numberOfLines={1}
        >
          {url}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function WellbeingScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode, shadows } = getTheme();

  const [isEmergency, setIsEmergency] = useState(false);

  const services = [
    {
      id: 1,
      title: "Counseling Services",
      description:
        "Speak with a professional counselor about personal, academic, or mental health concerns",
      icon: "people",
      action: "book",
      url: "https://university.edu/counseling",
    },
    {
      id: 2,
      title: "Health Services",
      description:
        "Medical care, immunizations, and health education resources",
      icon: "medkit",
      action: "book",
      url: "https://university.edu/health",
    },
    {
      id: 3,
      title: "Fitness & Recreation",
      description: "Gym access, fitness classes, and recreational activities",
      icon: "fitness",
      action: "view",
      url: "https://university.edu/fitness",
    },
    {
      id: 4,
      title: "Nutrition Services",
      description: "Nutrition counseling and dietary resources",
      icon: "nutrition",
      action: "book",
      url: "https://university.edu/nutrition",
    },
    {
      id: 5,
      title: "Mindfulness & Meditation",
      description: "Guided meditation sessions and mindfulness resources",
      icon: "leaf",
      action: "view",
      url: "https://university.edu/mindfulness",
    },
  ];

  const resources = [
    {
      id: 1,
      title: "Mental Health Resources",
      description: "Articles, videos, and self-help tools for mental wellbeing",
      url: "https://university.edu/mental-health",
    },
    {
      id: 2,
      title: "Stress Management Guide",
      description: "Techniques and strategies for managing academic stress",
      url: "https://university.edu/stress-management",
    },
    {
      id: 3,
      title: "Healthy Eating on Campus",
      description: "Guide to nutritious meal options on and around campus",
      url: "https://university.edu/healthy-eating",
    },
  ];

  const emergencyContacts = [
    {
      name: "Campus Security",
      phone: "(555) 123-4567",
    },
    {
      name: "Crisis Counselor (24/7)",
      phone: "(555) 987-6543",
    },
    {
      name: "Emergency Services",
      phone: "911",
    },
  ];

  const handleServicePress = (service) => {
    if (service.action === "book") {
      Alert.alert(
        "Book Appointment",
        `Would you like to book an appointment with ${service.title}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Book Now",
            onPress: () => {
              // In a real app, this would navigate to a booking screen
              Alert.alert(
                "Booking",
                "This would open the appointment booking interface"
              );
            },
          },
          {
            text: "Visit Website",
            onPress: () => Linking.openURL(service.url),
          },
        ]
      );
    } else {
      Linking.openURL(service.url);
    }
  };

  const handleResourcePress = (resource) => {
    Linking.openURL(resource.url);
  };

  const handleEmergencyCall = (contact) => {
    Linking.openURL(`tel:${contact.phone.replace(/[^\d]/g, "")}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      {isEmergency ? (
        // Emergency Screen
        <View style={styles.emergencyContainer}>
          <View
            style={[styles.emergencyHeader, { backgroundColor: colors.error }]}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setIsEmergency(false)}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.emergencyTitleContainer}>
              <Ionicons name="alert-circle" size={32} color="#FFFFFF" />
              <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.emergencyContent}>
            <Text style={[styles.emergencyMessage, { color: colors.text }]}>
              If you are experiencing a mental health emergency or crisis,
              please contact one of the following resources immediately:
            </Text>

            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.emergencyContactCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    ...shadows.small,
                  },
                ]}
                onPress={() => handleEmergencyCall(contact)}
              >
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactName, { color: colors.text }]}>
                    {contact.name}
                  </Text>
                  <Text
                    style={[styles.contactPhone, { color: colors.primary }]}
                  >
                    {contact.phone}
                  </Text>
                </View>

                <View
                  style={[
                    styles.callButton,
                    { backgroundColor: colors.success },
                  ]}
                >
                  <Ionicons name="call" size={20} color="#FFFFFF" />
                  <Text style={styles.callText}>Call</Text>
                </View>
              </TouchableOpacity>
            ))}

            <Text style={[styles.emergencyNote, { color: colors.text }]}>
              Remember that help is always available. If you are in immediate
              danger, please call emergency services at 911.
            </Text>
          </ScrollView>
        </View>
      ) : (
        // Normal Wellbeing Screen
        <>
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, { color: colors.primary }]}>
                Student Wellbeing
              </Text>
              <Text style={[styles.subtitle, { color: colors.text }]}>
                Resources to support your health and wellness
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.emergencyButton,
                { backgroundColor: colors.error },
              ]}
              onPress={() => setIsEmergency(true)}
            >
              <Ionicons name="alert-circle" size={20} color="#FFFFFF" />
              <Text style={styles.emergencyButtonText}>Emergency</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.container}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Wellbeing Services
            </Text>

            {services.map((service) => (
              <ServicesCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                onPress={() => handleServicePress(service)}
                colors={colors}
                shadows={shadows}
              />
            ))}

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Self-Help Resources
            </Text>

            <View style={styles.resourcesContainer}>
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  url={resource.url}
                  onPress={() => handleResourcePress(resource)}
                  colors={colors}
                  shadows={shadows}
                />
              ))}
            </View>

            <View
              style={[
                styles.wellbeingTips,
                { backgroundColor: colors.secondary + "15" },
              ]}
            >
              <Text style={[styles.tipsTitle, { color: colors.secondary }]}>
                Wellness Tips
              </Text>

              <View style={styles.tipItem}>
                <Ionicons name="water" size={20} color={colors.secondary} />
                <Text style={[styles.tipText, { color: colors.text }]}>
                  Stay hydrated by drinking at least 8 glasses of water daily
                </Text>
              </View>

              <View style={styles.tipItem}>
                <Ionicons name="bed" size={20} color={colors.secondary} />
                <Text style={[styles.tipText, { color: colors.text }]}>
                  Aim for 7-9 hours of quality sleep each night
                </Text>
              </View>

              <View style={styles.tipItem}>
                <Ionicons name="time" size={20} color={colors.secondary} />
                <Text style={[styles.tipText, { color: colors.text }]}>
                  Take regular breaks during study sessions
                </Text>
              </View>

              <View style={styles.tipItem}>
                <Ionicons name="walk" size={20} color={colors.secondary} />
                <Text style={[styles.tipText, { color: colors.text }]}>
                  Incorporate physical activity into your daily routine
                </Text>
              </View>
            </View>

            <Button
              title="Book a Wellbeing Consultation"
              onPress={() =>
                Alert.alert(
                  "Book Consultation",
                  "This would open the consultation booking interface"
                )
              }
              style={styles.consultationButton}
            />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: SIZES.padding,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...FONTS.bold,
    fontSize: 24,
    marginBottom: 4,
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
  },
  emergencyButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
  },
  emergencyButtonText: {
    ...FONTS.bold,
    color: "#FFFFFF",
    fontSize: SIZES.small,
    marginLeft: 4,
  },
  container: {
    padding: SIZES.padding,
    paddingTop: 0,
    paddingBottom: 40,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: 16,
    marginTop: 8,
  },
  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: SIZES.radius,
    marginBottom: 12,
    borderWidth: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    marginBottom: 4,
  },
  serviceDescription: {
    ...FONTS.regular,
    fontSize: SIZES.small,
  },
  resourcesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  resourceCard: {
    width: "48%",
    padding: 16,
    borderRadius: SIZES.radius,
    marginBottom: 12,
    borderWidth: 1,
  },
  resourceTitle: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    marginBottom: 8,
  },
  resourceDescription: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginBottom: 12,
  },
  resourceLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: SIZES.radius - 4,
  },
  resourceLink: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    marginLeft: 4,
    flex: 1,
  },
  wellbeingTips: {
    padding: 16,
    borderRadius: SIZES.radius,
    marginBottom: 24,
  },
  tipsTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipText: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    marginLeft: 12,
    flex: 1,
  },
  consultationButton: {
    marginTop: 8,
  },
  emergencyContainer: {
    flex: 1,
  },
  emergencyHeader: {
    padding: SIZES.padding,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 16,
  },
  emergencyTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  emergencyTitle: {
    ...FONTS.bold,
    fontSize: 24,
    color: "#FFFFFF",
    marginLeft: 12,
  },
  emergencyContent: {
    padding: SIZES.padding,
    paddingBottom: 40,
  },
  emergencyMessage: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    marginBottom: 24,
  },
  emergencyContactCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: SIZES.radius,
    marginBottom: 16,
    borderWidth: 1,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    marginBottom: 4,
  },
  contactPhone: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: SIZES.radius - 4,
  },
  callText: {
    ...FONTS.bold,
    fontSize: SIZES.small,
    color: "#FFFFFF",
    marginLeft: 4,
  },
  emergencyNote: {
    ...FONTS.italic,
    fontSize: SIZES.small,
    marginTop: 16,
    textAlign: "center",
  },
});
