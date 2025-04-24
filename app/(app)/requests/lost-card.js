import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../src/context/ThemeContext";
import { FONTS, SIZES } from "../../../src/theme/theme";
import InputField from "../../../src/components/ui/InputField";
import Button from "../../../src/components/ui/Button";

export default function LostCardScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode, shadows } = getTheme();

  const [formData, setFormData] = useState({
    reason: "lost", // lost, damaged, stolen
    location: "",
    additionalInfo: "",
    deliveryMethod: "pickup", // pickup, mail
    deliveryAddress: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestId, setRequestId] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (formData.reason === "lost" && !formData.location.trim()) {
      newErrors.location = "Please specify where you lost your card";
    }

    if (
      formData.deliveryMethod === "mail" &&
      !formData.deliveryAddress.trim()
    ) {
      newErrors.deliveryAddress = "Delivery address is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        const newRequestId = `LC-${Math.floor(1000 + Math.random() * 9000)}`;
        setRequestId(newRequestId);
        setRequestSubmitted(true);
        setIsSubmitting(false);
      }, 1500);
    }
  };

  const handleNewRequest = () => {
    setFormData({
      reason: "lost",
      location: "",
      additionalInfo: "",
      deliveryMethod: "pickup",
      deliveryAddress: "",
    });
    setRequestSubmitted(false);
    setRequestId("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Lost Card Request
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Request a replacement for your student ID card
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {requestSubmitted ? (
          // Success screen
          <View style={styles.successContainer}>
            <View
              style={[
                styles.successCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.success,
                  ...shadows.medium,
                },
              ]}
            >
              <Ionicons
                name="checkmark-circle"
                size={60}
                color={colors.success}
              />

              <Text style={[styles.successTitle, { color: colors.success }]}>
                Request Submitted
              </Text>

              <Text style={[styles.successMessage, { color: colors.text }]}>
                Your request for a new student ID card has been submitted
                successfully.
              </Text>

              <View
                style={[
                  styles.requestIdContainer,
                  { backgroundColor: colors.success + "15" },
                ]}
              >
                <Text style={[styles.requestIdLabel, { color: colors.text }]}>
                  Request ID:
                </Text>
                <Text style={[styles.requestId, { color: colors.success }]}>
                  {requestId}
                </Text>
              </View>

              <Text style={[styles.instructionsTitle, { color: colors.text }]}>
                Next steps:
              </Text>

              <View style={styles.instructionItem}>
                <Ionicons name="time" size={20} color={colors.primary} />
                <Text style={[styles.instructionText, { color: colors.text }]}>
                  Your request will be processed within 1-2 business days.
                </Text>
              </View>

              <View style={styles.instructionItem}>
                <Ionicons
                  name={
                    formData.deliveryMethod === "pickup" ? "location" : "mail"
                  }
                  size={20}
                  color={colors.primary}
                />
                <Text style={[styles.instructionText, { color: colors.text }]}>
                  {formData.deliveryMethod === "pickup"
                    ? "You will receive a notification when your card is ready for pickup at the Student Services office."
                    : "Your new card will be mailed to the address you provided."}
                </Text>
              </View>

              <View style={styles.instructionItem}>
                <Ionicons name="card" size={20} color={colors.primary} />
                <Text style={[styles.instructionText, { color: colors.text }]}>
                  A fee of $25 will be added to your student account for the
                  replacement card.
                </Text>
              </View>

              <Button
                title="New Request"
                onPress={handleNewRequest}
                variant="outline"
                style={styles.newRequestButton}
              />
            </View>
          </View>
        ) : (
          // Request form
          <>
            <View style={styles.cardPreview}>
              <Image
                source={require("../../../assets/student-card.png")}
                style={styles.cardImage}
                resizeMode="contain"
              />
              <Text style={[styles.feeNote, { color: colors.error }]}>
                Note: A $25 fee will be charged for replacement cards
              </Text>
            </View>

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
              <Text style={[styles.formSectionTitle, { color: colors.text }]}>
                Reason for Replacement
              </Text>

              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setFormData({ ...formData, reason: "lost" })}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        borderColor: colors.primary,
                        backgroundColor:
                          formData.reason === "lost"
                            ? colors.primary
                            : "transparent",
                      },
                    ]}
                  />
                  <Text style={[styles.radioLabel, { color: colors.text }]}>
                    Lost
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() =>
                    setFormData({ ...formData, reason: "damaged" })
                  }
                >
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        borderColor: colors.primary,
                        backgroundColor:
                          formData.reason === "damaged"
                            ? colors.primary
                            : "transparent",
                      },
                    ]}
                  />
                  <Text style={[styles.radioLabel, { color: colors.text }]}>
                    Damaged
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setFormData({ ...formData, reason: "stolen" })}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        borderColor: colors.primary,
                        backgroundColor:
                          formData.reason === "stolen"
                            ? colors.primary
                            : "transparent",
                      },
                    ]}
                  />
                  <Text style={[styles.radioLabel, { color: colors.text }]}>
                    Stolen
                  </Text>
                </TouchableOpacity>
              </View>

              {formData.reason === "lost" && (
                <InputField
                  label="Where did you lose your card?"
                  value={formData.location}
                  onChangeText={(text) =>
                    setFormData({ ...formData, location: text })
                  }
                  placeholder="E.g., Library, Cafeteria, etc."
                  error={errors.location}
                  required
                />
              )}

              <InputField
                label="Additional Information"
                value={formData.additionalInfo}
                onChangeText={(text) =>
                  setFormData({ ...formData, additionalInfo: text })
                }
                placeholder="Any other details you'd like to provide"
                multiline
                numberOfLines={3}
              />

              <Text style={[styles.formSectionTitle, { color: colors.text }]}>
                Delivery Method
              </Text>

              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() =>
                    setFormData({ ...formData, deliveryMethod: "pickup" })
                  }
                >
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        borderColor: colors.primary,
                        backgroundColor:
                          formData.deliveryMethod === "pickup"
                            ? colors.primary
                            : "transparent",
                      },
                    ]}
                  />
                  <Text style={[styles.radioLabel, { color: colors.text }]}>
                    Pick up at Student Services
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() =>
                    setFormData({ ...formData, deliveryMethod: "mail" })
                  }
                >
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        borderColor: colors.primary,
                        backgroundColor:
                          formData.deliveryMethod === "mail"
                            ? colors.primary
                            : "transparent",
                      },
                    ]}
                  />
                  <Text style={[styles.radioLabel, { color: colors.text }]}>
                    Mail to my address
                  </Text>
                </TouchableOpacity>
              </View>

              {formData.deliveryMethod === "mail" && (
                <InputField
                  label="Delivery Address"
                  value={formData.deliveryAddress}
                  onChangeText={(text) =>
                    setFormData({ ...formData, deliveryAddress: text })
                  }
                  placeholder="Enter your full mailing address"
                  multiline
                  numberOfLines={3}
                  error={errors.deliveryAddress}
                  required
                />
              )}

              <Button
                title="Submit Request"
                onPress={handleSubmit}
                loading={isSubmitting}
                style={styles.submitButton}
              />
            </View>
          </>
        )}
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
    paddingBottom: SIZES.padding * 3,
  },
  cardPreview: {
    alignItems: "center",
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: 180,
    marginBottom: 8,
  },
  feeNote: {
    ...FONTS.medium,
    fontSize: SIZES.small,
  },
  formContainer: {
    padding: 16,
    borderRadius: SIZES.radius,
    borderWidth: 1,
  },
  formSectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: 16,
    marginTop: 20,
  },
  radioGroup: {
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
  },
  radioLabel: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
  },
  submitButton: {
    marginTop: 24,
  },
  successContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  successCard: {
    padding: 24,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    alignItems: "center",
    width: "100%",
  },
  successTitle: {
    ...FONTS.bold,
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  successMessage: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    textAlign: "center",
    marginBottom: 24,
  },
  requestIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: SIZES.radius,
    marginBottom: 24,
  },
  requestIdLabel: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    marginRight: 8,
  },
  requestId: {
    ...FONTS.bold,
    fontSize: SIZES.large,
  },
  instructionsTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    width: "100%",
  },
  instructionText: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    marginLeft: 12,
    flex: 1,
  },
  newRequestButton: {
    marginTop: 16,
    width: "100%",
  },
});
