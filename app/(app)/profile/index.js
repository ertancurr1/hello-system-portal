import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../../src/context/ThemeContext";
import { FONTS, SIZES } from "../../../src/theme/theme";
import InputField from "../../../src/components/ui/InputField";
import Button from "../../../src/components/ui/Button";
import { useAuth } from "../../../src/context/AuthContext";
import { mockUserProfile } from "../../../src/services/mockData";

export default function ProfileScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode, shadows } = getTheme();
  const { user, updateProfile } = useAuth();
  const router = useRouter();

  // Use mock data for demonstration
  const profile = mockUserProfile;

  // State for form fields
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.contact.phone,
    address: profile.contact.address,
    emergencyContact: profile.contact.emergencyContact,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.emergencyContact)
      newErrors.emergencyContact = "Emergency contact is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // Cancel editing
      setFormData({
        name: profile.name,
        email: profile.email,
        phone: profile.contact.phone,
        address: profile.contact.address,
        emergencyContact: profile.contact.emergencyContact,
      });
      setErrors({});
    }
    setIsEditing(!isEditing);
  };

  // Save profile changes
  const handleSave = async () => {
    if (validateForm()) {
      setIsLoading(true);

      try {
        // In a real app, this would call the updateProfile function from AuthContext
        // For demo, we'll just simulate a successful update
        await new Promise((resolve) => setTimeout(resolve, 1000));

        Alert.alert("Success", "Profile updated successfully", [
          { text: "OK" },
        ]);

        setIsEditing(false);
      } catch (error) {
        Alert.alert("Error", "Failed to update profile. Please try again.", [
          { text: "OK" },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.primary }]}>
            My Profile
          </Text>

          <TouchableOpacity
            style={[
              styles.editButton,
              {
                backgroundColor: isEditing ? colors.error : colors.primary,
              },
            ]}
            onPress={toggleEditMode}
          >
            <Ionicons
              name={isEditing ? "close" : "create-outline"}
              size={18}
              color="#FFFFFF"
            />
            <Text style={styles.editButtonText}>
              {isEditing ? "Cancel" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Picture Section */}
        <View
          style={[
            styles.profileImageContainer,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              ...shadows.medium,
            },
          ]}
        >
          <Image
            source={require("../../../assets/profile-placeholder.png")}
            style={styles.profileImage}
          />

          {isEditing && (
            <TouchableOpacity
              style={[
                styles.changePhotoButton,
                { backgroundColor: colors.primary },
              ]}
            >
              <Ionicons name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          <Text style={[styles.studentId, { color: colors.inactive }]}>
            Student ID: {profile.studentId}
          </Text>
        </View>

        {/* Academic Info (Read-only) */}
        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Academic Information
          </Text>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.inactive }]}>
              Program
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {profile.program}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.inactive }]}>
              Department
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {profile.department}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.inactive }]}>
              Faculty
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {profile.faculty}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.inactive }]}>
              Enrollment Year
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {profile.enrollmentYear}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.inactive }]}>
              Expected Graduation
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {profile.expectedGraduation}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.inactive }]}>
              Academic Status
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {profile.academicStatus}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.inactive }]}>
              Current GPA
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {profile.gpa}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.inactive }]}>
              Credits Completed
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {profile.credits.completed} / {profile.credits.required}
            </Text>
          </View>
        </View>

        {/* Personal Info (Editable) */}
        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Personal Information
          </Text>

          {isEditing ? (
            <View style={styles.form}>
              <InputField
                label="Full Name"
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
                placeholder="Enter your full name"
                error={errors.name}
                required
              />

              <InputField
                label="Email Address"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                placeholder="Enter your email address"
                keyboardType="email-address"
                error={errors.email}
                required
              />

              <InputField
                label="Phone Number"
                value={formData.phone}
                onChangeText={(text) => handleChange("phone", text)}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                error={errors.phone}
                required
              />

              <InputField
                label="Address"
                value={formData.address}
                onChangeText={(text) => handleChange("address", text)}
                placeholder="Enter your address"
                error={errors.address}
                required
              />

              <InputField
                label="Emergency Contact"
                value={formData.emergencyContact}
                onChangeText={(text) => handleChange("emergencyContact", text)}
                placeholder="Name (Relationship) - Phone Number"
                error={errors.emergencyContact}
                required
              />

              <Button
                title="Save Changes"
                onPress={handleSave}
                loading={isLoading}
                style={styles.saveButton}
              />
            </View>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.inactive }]}>
                  Full Name
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {profile.name}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.inactive }]}>
                  Email Address
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {profile.email}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.inactive }]}>
                  Phone Number
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {profile.contact.phone}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.inactive }]}>
                  Address
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {profile.contact.address}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.inactive }]}>
                  Emergency Contact
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {profile.contact.emergencyContact}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Account Settings */}
        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Account Settings
          </Text>

          <TouchableOpacity
            style={[styles.settingButton, { borderBottomColor: colors.border }]}
            onPress={() => router.push("/profile/password")}
          >
            <Ionicons name="key" size={20} color={colors.primary} />
            <Text style={[styles.settingButtonText, { color: colors.text }]}>
              Change Password
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.inactive}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingButton, { borderBottomColor: colors.border }]}
            onPress={() => router.push("/profile/notifications")}
          >
            <Ionicons name="notifications" size={20} color={colors.primary} />
            <Text style={[styles.settingButtonText, { color: colors.text }]}>
              Notification Preferences
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.inactive}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => router.push("/profile/language")}
          >
            <Ionicons name="language" size={20} color={colors.primary} />
            <Text style={[styles.settingButtonText, { color: colors.text }]}>
              Language Settings
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.inactive}
            />
          </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    ...FONTS.bold,
    fontSize: 24,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radius,
  },
  editButtonText: {
    ...FONTS.medium,
    color: "#FFFFFF",
    marginLeft: 5,
  },
  profileImageContainer: {
    alignItems: "center",
    padding: 20,
    borderRadius: SIZES.radius,
    marginBottom: 20,
    borderWidth: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoButton: {
    position: "absolute",
    right: "auto",
    bottom: 65,
    marginLeft: 70,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  studentId: {
    ...FONTS.medium,
    marginTop: 10,
  },
  section: {
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  infoLabel: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
  },
  infoValue: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    textAlign: "right",
    flex: 1,
    marginLeft: 10,
  },
  form: {
    marginTop: 10,
  },
  saveButton: {
    marginTop: 20,
  },
  settingButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  settingButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    flex: 1,
    marginLeft: 10,
  },
});
