import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../src/context/ThemeContext";
import { FONTS, SIZES } from "../../../src/theme/theme";

const { width } = Dimensions.get("window");
const CARD_WIDTH =
  width > 700
    ? (width - SIZES.padding * 2 - 16) / 3
    : (width - SIZES.padding * 2 - 8) / 2;

const VideoCard = ({ video, onPress, colors, shadows }) => {
  return (
    <TouchableOpacity
      style={[
        styles.videoCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          ...shadows.small,
          width: CARD_WIDTH,
        },
      ]}
      onPress={() => onPress(video)}
    >
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: video.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View
          style={[
            styles.durationBadge,
            { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          ]}
        >
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
        <View style={styles.playButton}>
          <Ionicons name="play" size={24} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.videoInfo}>
        <Text
          style={[styles.videoTitle, { color: colors.text }]}
          numberOfLines={2}
        >
          {video.title}
        </Text>

        <View style={styles.categoryContainer}>
          <Ionicons name="folder" size={14} color={colors.primary} />
          <Text style={[styles.categoryText, { color: colors.primary }]}>
            {video.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function VideoTutorialsScreen() {
  const { getTheme } = useTheme();
  const { colors, isDarkMode, shadows } = getTheme();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Getting Started",
    "Registration",
    "Financial",
    "eLearning",
    "Technical",
  ];

  const [tutorials] = useState([
    {
      id: 1,
      title: "How to Navigate the Student Portal",
      description:
        "Learn how to navigate around the Hello! System student portal and find all the features you need.",
      thumbnail: "https://picsum.photos/400/225",
      duration: "5:23",
      category: "Getting Started",
      videoUrl: "https://www.youtube.com/watch?v=example1",
    },
    {
      id: 2,
      title: "Course Registration Tutorial",
      description:
        "Step-by-step guide on how to register for courses each semester, check prerequisites, and manage your schedule.",
      thumbnail: "https://picsum.photos/400/226",
      duration: "8:17",
      category: "Registration",
      videoUrl: "https://www.youtube.com/watch?v=example2",
    },
    {
      id: 3,
      title: "Understanding Your Tuition Statement",
      description:
        "This tutorial explains how to read your tuition statement, understand fees, and find payment options.",
      thumbnail: "https://picsum.photos/400/227",
      duration: "6:45",
      category: "Financial",
      videoUrl: "https://www.youtube.com/watch?v=example3",
    },
    {
      id: 4,
      title: "Using the eLearning Platform",
      description:
        "Learn how to access course materials, submit assignments, participate in discussions, and check grades on the eLearning platform.",
      thumbnail: "https://picsum.photos/400/228",
      duration: "10:32",
      category: "eLearning",
      videoUrl: "https://www.youtube.com/watch?v=example4",
    },
    {
      id: 5,
      title: "How to Apply for Scholarships",
      description:
        "Guide to finding scholarship opportunities, eligibility requirements, and submitting applications through the portal.",
      thumbnail: "https://picsum.photos/400/229",
      duration: "7:19",
      category: "Financial",
      videoUrl: "https://www.youtube.com/watch?v=example5",
    },
    {
      id: 6,
      title: "Troubleshooting Common Login Issues",
      description:
        "Solutions to common login problems, password resets, and account security features.",
      thumbnail: "https://picsum.photos/400/230",
      duration: "4:55",
      category: "Technical",
      videoUrl: "https://www.youtube.com/watch?v=example6",
    },
    {
      id: 7,
      title: "Creating and Managing Study Groups",
      description:
        "How to create study groups, invite classmates, and use collaborative tools within the system.",
      thumbnail: "https://picsum.photos/400/231",
      duration: "6:10",
      category: "Getting Started",
      videoUrl: "https://www.youtube.com/watch?v=example7",
    },
    {
      id: 8,
      title: "Accessing Library Resources Online",
      description:
        "Tutorial on how to search the library database, access e-books, journals, and research materials from your student account.",
      thumbnail: "https://picsum.photos/400/232",
      duration: "8:42",
      category: "eLearning",
      videoUrl: "https://www.youtube.com/watch?v=example8",
    },
  ]);

  const handlePlayVideo = (video) => {
    // In a real app, this would play the video in a modal or navigate to a video player
    // For this demo, we'll try to open the URL
    Linking.openURL(video.videoUrl).catch((err) => {
      console.error("Error opening video URL:", err);
      alert("Could not open the video. URL may be invalid.");
    });
  };

  const filteredTutorials =
    selectedCategory === "All"
      ? tutorials
      : tutorials.filter((video) => video.category === selectedCategory);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Video Tutorials
        </Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Learn how to use the student portal
        </Text>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                {
                  backgroundColor:
                    selectedCategory === item
                      ? colors.primary
                      : colors.background,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  {
                    color: selectedCategory === item ? "#FFFFFF" : colors.text,
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <FlatList
        data={filteredTutorials}
        numColumns={width > 700 ? 3 : 2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            onPress={handlePlayVideo}
            colors={colors}
            shadows={shadows}
          />
        )}
        contentContainerStyle={styles.videosContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="videocam-off" size={50} color={colors.inactive} />
            <Text style={[styles.emptyText, { color: colors.inactive }]}>
              No tutorials found
            </Text>
          </View>
        }
      />
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
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesList: {
    paddingHorizontal: SIZES.padding,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.small,
  },
  videosContainer: {
    padding: SIZES.padding,
    paddingTop: 0,
  },
  videoCard: {
    borderRadius: SIZES.radius,
    overflow: "hidden",
    borderWidth: 1,
    margin: 4,
    marginBottom: 16,
  },
  thumbnailContainer: {
    position: "relative",
    height: 120,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  durationBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    color: "#FFFFFF",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    marginBottom: 8,
    height: 40,
  },
  categoryContainer: {
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
    padding: SIZES.padding * 4,
  },
  emptyText: {
    ...FONTS.medium,
    fontSize: SIZES.large,
    marginTop: 16,
  },
});
