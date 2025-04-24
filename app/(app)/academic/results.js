import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useTheme } from "../../../src/context/ThemeContext";
import { FONTS, SIZES } from "../../../src/theme/theme";
import LoadingIndicator from "../../../src/components/ui/LoadingIndicator";
import SemesterResultCard from "../../../src/components/cards/SemesterResultCard";
import useResults from "../../../src/hooks/useResults";

export default function ResultsScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode, shadows } = getTheme();
  const router = useRouter();

  const { data, isLoading, refetch } = useResults();

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  // Get GPA color
  const getGpaColor = (gpa) => {
    if (gpa >= 3.5) return colors.success;
    if (gpa >= 2.5) return colors.primary;
    if (gpa >= 1.5) return colors.warning;
    return colors.error;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Academic Results
        </Text>
      </View>

      {isLoading ? (
        <LoadingIndicator text="Loading academic records..." />
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={handleRefresh} />
          }
        >
          {/* Summary Card */}
          {data?.cumulative && (
            <View
              style={[
                styles.summaryCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  ...shadows.medium,
                },
              ]}
            >
              <Text style={[styles.summaryTitle, { color: colors.text }]}>
                Cumulative GPA
              </Text>

              <Text
                style={[
                  styles.cumulativeGpa,
                  { color: getGpaColor(data.cumulative.gpa) },
                ]}
              >
                {data.cumulative.gpa.toFixed(2)}
              </Text>

              <View style={styles.summaryDetails}>
                <View style={styles.summaryItem}>
                  <Text
                    style={[styles.summaryLabel, { color: colors.inactive }]}
                  >
                    Credits
                  </Text>
                  <Text style={[styles.summaryValue, { color: colors.text }]}>
                    {data.cumulative.credits}
                  </Text>
                </View>

                <View style={styles.summaryItem}>
                  <Text
                    style={[styles.summaryLabel, { color: colors.inactive }]}
                  >
                    Standing
                  </Text>
                  <Text style={[styles.summaryValue, { color: colors.text }]}>
                    {data.cumulative.standing}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Semester Results */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Results by Semester
          </Text>

          {data?.semesters?.map((semester) => (
            <SemesterResultCard
              key={semester.id}
              name={semester.name}
              gpa={semester.gpa}
              courses={semester.courses}
            />
          ))}

          {(!data?.semesters || data.semesters.length === 0) && (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.inactive }]}>
                No academic records available
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: SIZES.padding,
    paddingBottom: 0,
  },
  title: {
    ...FONTS.bold,
    fontSize: 24,
    marginBottom: 16,
  },
  container: {
    padding: SIZES.padding,
    paddingTop: 0,
  },
  summaryCard: {
    borderRadius: SIZES.radius,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
  },
  summaryTitle: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    marginBottom: 8,
  },
  cumulativeGpa: {
    ...FONTS.bold,
    fontSize: 36,
    marginBottom: 16,
  },
  summaryDetails: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginBottom: 4,
  },
  summaryValue: {
    ...FONTS.bold,
    fontSize: SIZES.large,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: 12,
  },
  emptyContainer: {
    padding: SIZES.padding * 2,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    textAlign: "center",
  },
});
