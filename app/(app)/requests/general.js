import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../src/context/ThemeContext";
import { FONTS, SIZES } from "../../../src/theme/theme";
import Button from "../../../src/components/ui/Button";
import InputField from "../../../src/components/ui/InputField";

export default function GeneralRequestsScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode, shadows } = getTheme();

  const requestTypes = [
    { id: "scholarship", label: "Scholarship Application" },
    { id: "refund", label: "Refund Request" },
    { id: "leave", label: "Leave of Absence" },
    { id: "freeze", label: "Freeze Semester" },
    { id: "transfer", label: "Credit Transfer" },
    { id: "other", label: "Other Request" },
  ];

  const [selectedRequestType, setSelectedRequestType] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!selectedRequestType) {
      newErrors.requestType = "Please select a request type";
    }

    if (!subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length < 10) {
      newErrors.description =
        "Description is too short (minimum 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        "Submit Request",
        "Are you sure you want to submit this request?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Submit",
            onPress: () => {
              // In a real app, this would call an API to submit the request
              Alert.alert(
                "Request Submitted",
                `Your ${selectedRequestType.label} request has been submitted successfully. You will be notified when there's an update.`,
                [
                  {
                    text: "OK",
                    onPress: () => {
                      // Reset form
                      setSelectedRequestType(null);
                      setSubject("");
                      setDescription("");
                    },
                  },
                ]
              );
            },
          },
        ]
      );
    }
  };

  const [activeRequests] = useState([
    {
      id: 1,
      type: "Scholarship Application",
      subject: "Merit Scholarship for Fall 2025",
      date: "2025-04-15",
      status: "Pending",
    },
    {
      id: 2,
      type: "Leave of Absence",
      subject: "Medical Leave Request",
      date: "2025-03-20",
      status: "Approved",
    },
    {
      id: 3,
      type: "Refund Request",
      subject: "Duplicate Payment Refund",
      date: "2025-04-01",
      status: "Processing",
    },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: colors.primary }]}>
          General Requests
        </Text>

        {/* Active Requests */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Active Requests
          </Text>

          {activeRequests.length > 0 ? (
            activeRequests.map((request) => (
              <TouchableOpacity
                key={request.id}
                style={[
                  styles.requestCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    ...shadows.small,
                  },
                ]}
                onPress={() =>
                  Alert.alert(
                    "Request Details",
                    `Details for ${request.subject}`
                  )
                }
              >
                <View style={styles.requestInfo}>
                  <Text style={[styles.requestType, { color: colors.primary }]}>
                    {request.type}
                  </Text>
                  <Text style={[styles.requestSubject, { color: colors.text }]}>
                    {request.subject}
                  </Text>
                  <Text
                    style={[styles.requestDate, { color: colors.inactive }]}
                  >
                    Submitted: {request.date}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        request.status === "Approved"
                          ? colors.success + "20"
                          : request.status === "Pending"
                          ? colors.warning + "20"
                          : colors.secondary + "20",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          request.status === "Approved"
                            ? colors.success
                            : request.status === "Pending"
                            ? colors.warning
                            : colors.secondary,
                      },
                    ]}
                  >
                    {request.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={[styles.emptyText, { color: colors.inactive }]}>
              No active requests
            </Text>
          )}
        </View>

        {/* New Request Form */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Submit a New Request
          </Text>

          <View
            style={[
              styles.formContainer,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                ...shadows.small,
              },
            ]}
          >
            <Text style={[styles.formLabel, { color: colors.text }]}>
              Request Type
            </Text>

            {errors.requestType && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.requestType}
              </Text>
            )}

            <View style={styles.requestTypeContainer}>
              {requestTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.requestTypeButton,
                    {
                      backgroundColor:
                        selectedRequestType?.id === type.id
                          ? colors.primary
                          : colors.background,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => setSelectedRequestType(type)}
                >
                  <Text
                    style={[
                      styles.requestTypeText,
                      {
                        color:
                          selectedRequestType?.id === type.id
                            ? "#FFFFFF"
                            : colors.text,
                      },
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <InputField
              label="Subject"
              value={subject}
              onChangeText={setSubject}
              placeholder="Enter a subject for your request"
              error={errors.subject}
              required
            />

            <Text style={[styles.formLabel, { color: colors.text }]}>
              Description <Text style={{ color: colors.error }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.descriptionInput,
                {
                  color: colors.text,
                  backgroundColor: colors.background,
                  borderColor: errors.description
                    ? colors.error
                    : colors.border,
                },
              ]}
              value={description}
              onChangeText={setDescription}
              placeholder="Provide details about your request..."
              placeholderTextColor={colors.inactive}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            {errors.description && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.description}
              </Text>
            )}

            <Text style={[styles.noteText, { color: colors.inactive }]}>
              Note: Please provide all relevant details to help us process your
              request faster.
            </Text>

            <Button
              title="Submit Request"
              onPress={handleSubmit}
              style={styles.submitButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SIZES.padding,
  },
  title: {
    ...FONTS.bold,
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: 16,
  },
  requestCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: SIZES.radius,
    marginBottom: 12,
    borderWidth: 1,
  },
  requestInfo: {
    flex: 1,
  },
  requestType: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    marginBottom: 4,
  },
  requestSubject: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    marginBottom: 4,
  },
  requestDate: {
    ...FONTS.regular,
    fontSize: SIZES.small,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radius - 4,
    marginLeft: 10,
  },
  statusText: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
  },
  emptyText: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    textAlign: "center",
    padding: 20,
  },
  formContainer: {
    padding: 16,
    borderRadius: SIZES.radius,
    borderWidth: 1,
  },
  formLabel: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    marginBottom: 8,
  },
  requestTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  requestTypeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: SIZES.radius - 4,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  requestTypeText: {
    ...FONTS.medium,
    fontSize: SIZES.small,
  },
  descriptionInput: {
    borderWidth: 1,
    borderRadius: SIZES.radius - 4,
    padding: 12,
    fontSize: SIZES.medium,
    marginBottom: 8,
    minHeight: 120,
  },
  errorText: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginBottom: 8,
  },
  noteText: {
    ...FONTS.italic,
    fontSize: SIZES.small,
    marginBottom: 16,
  },
  submitButton: {
    height: 50,
  },
});
