import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useTheme } from "../../../src/context/ThemeContext";
import { FONTS, SIZES } from "../../../src/theme/theme";
import LoadingIndicator from "../../../src/components/ui/LoadingIndicator";
import CourseCard from "../../../src/components/cards/CourseCard";
import useCurrentCourses from "../../../src/hooks/useCurrentCourses";

export default function CurrentCoursesScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode } = getTheme();
  const router = useRouter();

  const { data, isLoading, refetch } = useCurrentCourses();

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleCoursePress = (courseId) => {
    router.push(`/academic/course-details/${courseId}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Current Courses
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Spring 2025
        </Text>
      </View>

      {isLoading ? (
        <LoadingIndicator text="Loading courses..." />
      ) : (
        <FlatList
          data={data?.courses || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CourseCard
              code={item.code}
              name={item.name}
              instructor={item.instructor}
              schedule={item.schedule}
              room={item.room}
              credits={item.credits}
              syllabus={item.syllabus}
              onPress={() => handleCoursePress(item.id)}
            />
          )}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.inactive }]}>
                No current courses found
              </Text>
            </View>
          }
        />
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
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    marginTop: 4,
    marginBottom: 16,
  },
  listContainer: {
    padding: SIZES.padding,
    paddingTop: 0,
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
