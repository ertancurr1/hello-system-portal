import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../src/context/ThemeContext";
import { FONTS, SIZES } from "../../../src/theme/theme";

const PolicyCategory = ({
  title,
  policies,
  expanded,
  onToggle,
  colors,
  shadows,
}) => {
  return (
    <View
      style={[
        styles.categoryContainer,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          ...shadows.small,
        },
      ]}
    >
      <TouchableOpacity style={styles.categoryHeader} onPress={onToggle}>
        <Text style={[styles.categoryTitle, { color: colors.text }]}>
          {title}
        </Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.inactive}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.policiesList}>
          {policies.map((policy, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.policyItem,
                index < policies.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
              ]}
              onPress={() => Linking.openURL(policy.url)}
            >
              <View style={styles.policyInfo}>
                <Text style={[styles.policyTitle, { color: colors.text }]}>
                  {policy.title}
                </Text>
                <Text
                  style={[styles.policyDescription, { color: colors.inactive }]}
                >
                  {policy.description}
                </Text>
              </View>

              <View style={styles.policyActions}>
                <View
                  style={[
                    styles.policyBadge,
                    { backgroundColor: colors.primary + "20" },
                  ]}
                >
                  <Text
                    style={[styles.policyBadgeText, { color: colors.primary }]}
                  >
                    {policy.type}
                  </Text>
                </View>
                <Ionicons
                  name="document-text"
                  size={20}
                  color={colors.primary}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default function PoliciesScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode, shadows } = getTheme();

  const [expandedCategories, setExpandedCategories] = useState({
    academic: true, // Open by default
    conduct: false,
    financial: false,
    it: false,
    campus: false,
  });

  const toggleCategory = (category) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    });
  };

  const policiesData = {
    academic: [
      {
        title: "Academic Integrity Policy",
        description:
          "Guidelines on plagiarism, cheating, and academic dishonesty",
        type: "PDF",
        url: "https://example.com/academic-integrity",
      },
      {
        title: "Grading Policy",
        description: "Explanation of the grading system and GPA calculation",
        type: "PDF",
        url: "https://example.com/grading",
      },
      {
        title: "Course Registration Policy",
        description: "Rules and deadlines for registering and dropping courses",
        type: "PDF",
        url: "https://example.com/registration",
      },
      {
        title: "Attendance Policy",
        description: "Requirements for class attendance and participation",
        type: "PDF",
        url: "https://example.com/attendance",
      },
    ],
    conduct: [
      {
        title: "Student Code of Conduct",
        description:
          "Expectations for student behavior and disciplinary procedures",
        type: "PDF",
        url: "https://example.com/conduct",
      },
      {
        title: "Anti-Harassment Policy",
        description: "Policies against discrimination and harassment",
        type: "PDF",
        url: "https://example.com/harassment",
      },
      {
        title: "Alcohol and Drug Policy",
        description: "Rules regarding alcohol and drugs on campus",
        type: "PDF",
        url: "https://example.com/alcohol-drugs",
      },
    ],
    financial: [
      {
        title: "Tuition and Fees Policy",
        description: "Information on tuition, fees, and payment deadlines",
        type: "PDF",
        url: "https://example.com/tuition",
      },
      {
        title: "Refund Policy",
        description: "Conditions for receiving tuition refunds",
        type: "PDF",
        url: "https://example.com/refunds",
      },
      {
        title: "Financial Aid Policy",
        description:
          "Eligibility requirements and application procedures for financial aid",
        type: "PDF",
        url: "https://example.com/financial-aid",
      },
      {
        title: "Scholarship Policy",
        description: "Types of scholarships and application process",
        type: "PDF",
        url: "https://example.com/scholarships",
      },
    ],
    it: [
      {
        title: "Acceptable Use Policy",
        description:
          "Guidelines for appropriate use of university IT resources",
        type: "PDF",
        url: "https://example.com/acceptable-use",
      },
      {
        title: "Data Privacy Policy",
        description: "How the university protects student data and privacy",
        type: "PDF",
        url: "https://example.com/data-privacy",
      },
      {
        title: "Email Policy",
        description: "Rules for using university email accounts",
        type: "PDF",
        url: "https://example.com/email",
      },
    ],
    campus: [
      {
        title: "Residential Life Policy",
        description: "Rules and guidelines for on-campus housing",
        type: "PDF",
        url: "https://example.com/residential",
      },
      {
        title: "Parking and Transportation Policy",
        description: "Campus parking regulations and transportation services",
        type: "PDF",
        url: "https://example.com/parking",
      },
      {
        title: "Campus Safety Policy",
        description: "Emergency procedures and safety guidelines",
        type: "PDF",
        url: "https://example.com/safety",
      },
      {
        title: "Facilities Use Policy",
        description: "Rules for using campus facilities and equipment",
        type: "PDF",
        url: "https://example.com/facilities",
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>
          University Policies
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Important guidelines and regulations
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.secondary + "20" },
          ]}
        >
          <Ionicons
            name="information-circle"
            size={24}
            color={colors.secondary}
          />
          <Text style={[styles.infoText, { color: colors.text }]}>
            These policies are provided for reference. All students are
            responsible for understanding and following these policies.
          </Text>
        </View>

        <PolicyCategory
          title="Academic Policies"
          policies={policiesData.academic}
          expanded={expandedCategories.academic}
          onToggle={() => toggleCategory("academic")}
          colors={colors}
          shadows={shadows}
        />

        <PolicyCategory
          title="Student Conduct Policies"
          policies={policiesData.conduct}
          expanded={expandedCategories.conduct}
          onToggle={() => toggleCategory("conduct")}
          colors={colors}
          shadows={shadows}
        />

        <PolicyCategory
          title="Financial Policies"
          policies={policiesData.financial}
          expanded={expandedCategories.financial}
          onToggle={() => toggleCategory("financial")}
          colors={colors}
          shadows={shadows}
        />

        <PolicyCategory
          title="IT and Technology Policies"
          policies={policiesData.it}
          expanded={expandedCategories.it}
          onToggle={() => toggleCategory("it")}
          colors={colors}
          shadows={shadows}
        />

        <PolicyCategory
          title="Campus Life Policies"
          policies={policiesData.campus}
          expanded={expandedCategories.campus}
          onToggle={() => toggleCategory("campus")}
          colors={colors}
          shadows={shadows}
        />
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
    marginBottom: 4,
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
    padding: 16,
    borderRadius: SIZES.radius,
    marginBottom: 20,
  },
  infoText: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginLeft: 10,
    flex: 1,
  },
  categoryContainer: {
    borderRadius: SIZES.radius,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  categoryTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
  },
  policiesList: {
    borderTopWidth: 1,
  },
  policyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  policyInfo: {
    flex: 1,
    marginRight: 10,
  },
  policyTitle: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    marginBottom: 4,
  },
  policyDescription: {
    ...FONTS.regular,
    fontSize: SIZES.small,
  },
  policyActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  policyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SIZES.radius - 4,
    marginRight: 10,
  },
  policyBadgeText: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
  },
});
