import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../src/context/ThemeContext";
import { FONTS, SIZES } from "../../../src/theme/theme";
import Button from "../../../src/components/ui/Button";
import InputField from "../../../src/components/ui/InputField";

const TicketCard = ({ ticket, onPress, colors, shadows }) => {
  // Get status color
  const getStatusColor = () => {
    switch (ticket.status) {
      case "Open":
        return colors.warning;
      case "In Progress":
        return colors.secondary;
      case "Resolved":
        return colors.success;
      case "Closed":
        return colors.inactive;
      default:
        return colors.text;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.ticketCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          ...shadows.small,
        },
      ]}
      onPress={() => onPress(ticket)}
    >
      <View style={styles.ticketHeader}>
        <Text style={[styles.ticketId, { color: colors.inactive }]}>
          #{ticket.id}
        </Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor() + "20" },
          ]}
        >
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {ticket.status}
          </Text>
        </View>
      </View>

      <Text style={[styles.ticketSubject, { color: colors.text }]}>
        {ticket.subject}
      </Text>

      <Text style={[styles.ticketDescription, { color: colors.inactive }]}>
        {ticket.description.length > 100
          ? ticket.description.substring(0, 100) + "..."
          : ticket.description}
      </Text>

      <View style={styles.ticketFooter}>
        <Text style={[styles.ticketDate, { color: colors.inactive }]}>
          {ticket.date}
        </Text>

        <View style={styles.ticketCategory}>
          <Ionicons name="pricetag" size={14} color={colors.inactive} />
          <Text style={[styles.categoryText, { color: colors.inactive }]}>
            {ticket.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HelpdeskScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode, shadows } = getTheme();

  const [activeTab, setActiveTab] = useState("my-tickets");
  const [tickets, setTickets] = useState([
    {
      id: "T-1001",
      subject: "Cannot access eLearning platform",
      description:
        'I have been trying to access the eLearning platform since yesterday but I keep getting an error message saying "Access Denied".',
      category: "Technical",
      date: "2025-04-22",
      status: "Open",
      replies: [
        {
          from: "system",
          message: "Ticket received. A support agent will assist you shortly.",
          date: "2025-04-22 14:30",
        },
      ],
    },
    {
      id: "T-995",
      subject: "Issues with Wi-Fi connection in Library",
      description:
        "I cannot connect to the Wi-Fi network in the library on the 3rd floor. My laptop shows the network but fails to connect.",
      category: "Network",
      date: "2025-04-18",
      status: "In Progress",
      replies: [
        {
          from: "system",
          message: "Ticket received. A support agent will assist you shortly.",
          date: "2025-04-18 10:15",
        },
        {
          from: "support",
          name: "David Technical Support",
          message:
            "Thank you for reporting this issue. We are aware of Wi-Fi problems in the library and our network team is working on it. We expect to resolve it by end of day. Please try again later and let us know if you still face issues.",
          date: "2025-04-18 11:30",
        },
      ],
    },
    {
      id: "T-982",
      subject: "Student Portal login fails after password reset",
      description:
        'I recently reset my password but I still cannot log into the Student Portal. It says "Invalid credentials" even though I am sure the password is correct.',
      category: "Account",
      date: "2025-04-10",
      status: "Resolved",
      replies: [
        {
          from: "system",
          message: "Ticket received. A support agent will assist you shortly.",
          date: "2025-04-10 09:22",
        },
        {
          from: "support",
          name: "Alice Account Services",
          message:
            "I have reset your account. Please try logging in with your username and the temporary password: TempPass123. You will be prompted to change it upon first login.",
          date: "2025-04-10 11:45",
        },
        {
          from: "user",
          message: "Thank you! I was able to log in successfully now.",
          date: "2025-04-10 12:30",
        },
      ],
    },
  ]);

  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    category: "Technical", // Default category
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { id: "technical", name: "Technical" },
    { id: "account", name: "Account" },
    { id: "financial", name: "Financial" },
    { id: "academic", name: "Academic" },
    { id: "network", name: "Network" },
    { id: "other", name: "Other" },
  ];

  const handleTicketPress = (ticket) => {
    Alert.alert(
      `Ticket #${ticket.id}`,
      `Status: ${ticket.status}\n\n${ticket.description}`,
      [
        {
          text: "View Details",
          onPress: () => {
            // In a real app, navigate to a ticket detail screen
            Alert.alert(
              "View Ticket Details",
              "This would navigate to a detailed ticket view"
            );
          },
        },
        { text: "Close", style: "cancel" },
      ]
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newTicket.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!newTicket.description.trim()) {
      newErrors.description = "Description is required";
    } else if (newTicket.description.length < 20) {
      newErrors.description = "Description should be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitTicket = () => {
    if (validateForm()) {
      Alert.alert(
        "Submit Support Ticket",
        "Are you sure you want to submit this support ticket?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Submit",
            onPress: () => {
              // Create a new ticket
              const newTicketObj = {
                id: `T-${1000 + tickets.length + 1}`,
                subject: newTicket.subject,
                description: newTicket.description,
                category: newTicket.category,
                date: new Date().toISOString().split("T")[0], // Today's date
                status: "Open",
                replies: [
                  {
                    from: "system",
                    message:
                      "Ticket received. A support agent will assist you shortly.",
                    date: new Date().toLocaleString(),
                  },
                ],
              };

              // Add to tickets array
              setTickets([newTicketObj, ...tickets]);

              // Reset form
              setNewTicket({
                subject: "",
                description: "",
                category: "Technical",
              });

              // Show confirmation
              Alert.alert(
                "Ticket Submitted",
                `Your ticket has been submitted successfully. Ticket ID: ${newTicketObj.id}`,
                [{ text: "OK" }]
              );

              // Switch to My Tickets tab
              setActiveTab("my-tickets");
            },
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Helpdesk Support
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Get help with technical issues
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "my-tickets" && {
              borderBottomColor: colors.primary,
              borderBottomWidth: 2,
            },
          ]}
          onPress={() => setActiveTab("my-tickets")}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "my-tickets" ? colors.primary : colors.inactive,
              },
            ]}
          >
            My Tickets
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "create-ticket" && {
              borderBottomColor: colors.primary,
              borderBottomWidth: 2,
            },
          ]}
          onPress={() => setActiveTab("create-ticket")}
        >
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "create-ticket"
                    ? colors.primary
                    : colors.inactive,
              },
            ]}
          >
            Create Ticket
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {activeTab === "my-tickets" ? (
          // My Tickets Tab
          <>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onPress={handleTicketPress}
                  colors={colors}
                  shadows={shadows}
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="help-buoy"
                  size={50}
                  color={colors.inactive}
                  style={styles.emptyIcon}
                />
                <Text style={[styles.emptyText, { color: colors.inactive }]}>
                  No support tickets yet
                </Text>
                <Text style={[styles.emptySubtext, { color: colors.inactive }]}>
                  Create a new ticket to get help with your issues
                </Text>
                <Button
                  title="Create Ticket"
                  onPress={() => setActiveTab("create-ticket")}
                  style={styles.createButton}
                />
              </View>
            )}
          </>
        ) : (
          // Create Ticket Tab
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
            <InputField
              label="Subject"
              value={newTicket.subject}
              onChangeText={(text) =>
                setNewTicket({ ...newTicket, subject: text })
              }
              placeholder="Brief description of your issue"
              error={errors.subject}
              required
            />

            <Text style={[styles.formLabel, { color: colors.text }]}>
              Category <Text style={{ color: colors.error }}>*</Text>
            </Text>
            <View style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor:
                        newTicket.category === category.name
                          ? colors.primary
                          : colors.background,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() =>
                    setNewTicket({ ...newTicket, category: category.name })
                  }
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      {
                        color:
                          newTicket.category === category.name
                            ? "#FFFFFF"
                            : colors.text,
                      },
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

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
              value={newTicket.description}
              onChangeText={(text) =>
                setNewTicket({ ...newTicket, description: text })
              }
              placeholder="Please provide a detailed description of your issue"
              placeholderTextColor={colors.inactive}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />
            {errors.description && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.description}
              </Text>
            )}

            <Text style={[styles.tipText, { color: colors.inactive }]}>
              Please include all relevant details such as what you were doing
              when the issue occurred, any error messages, and steps you've
              already tried.
            </Text>

            <Button
              title="Submit Ticket"
              onPress={handleSubmitTicket}
              style={styles.submitButton}
            />
          </View>
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
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabText: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
  },
  container: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 3,
  },
  ticketCard: {
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  ticketId: {
    ...FONTS.medium,
    fontSize: SIZES.small,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SIZES.radius - 4,
  },
  statusText: {
    ...FONTS.bold,
    fontSize: SIZES.xs,
  },
  ticketSubject: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: 8,
  },
  ticketDescription: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginBottom: 12,
  },
  ticketFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ticketDate: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
  },
  ticketCategory: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.padding * 2,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: 8,
  },
  emptySubtext: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    textAlign: "center",
    marginBottom: 20,
  },
  createButton: {
    width: 150,
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
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: SIZES.radius - 4,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  categoryButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.small,
  },
  descriptionInput: {
    borderWidth: 1,
    borderRadius: SIZES.radius - 4,
    padding: 12,
    fontSize: SIZES.medium,
    marginBottom: 8,
    minHeight: 160,
  },
  errorText: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginBottom: 8,
  },
  tipText: {
    ...FONTS.italic,
    fontSize: SIZES.small,
    marginBottom: 16,
  },
  submitButton: {
    height: 50,
  },
});
