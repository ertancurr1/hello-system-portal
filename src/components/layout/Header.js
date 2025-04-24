import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { FONTS, SIZES } from "../../theme/theme";
import { useRouter } from "expo-router";

const Header = ({
  showMenuButton = true,
  onMenuPress,
  showLogoutButton = false,
  onLogoutPress,
  showBackButton = false,
  onBackPress,
  title = "Hello! System",
}) => {
  const { getTheme } = useTheme();
  const { colors, shadows } = getTheme();
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background,
          ...shadows.small,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity style={styles.iconButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        )}

        {showMenuButton && (
          <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
            <Ionicons name="menu" size={24} color={colors.text} />
          </TouchableOpacity>
        )}

        <Image
          source={require("../../../assets/university-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={[styles.title, { color: colors.primary }]}>{title}</Text>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-twitter" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-instagram" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.ibuPayButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.ibuPayText}>IBUPay</Text>
        </TouchableOpacity>

        {showLogoutButton && (
          <TouchableOpacity style={styles.iconButton} onPress={onLogoutPress}>
            <Ionicons name="log-out" size={22} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === "ios" ? 100 : 80,
    paddingTop: Platform.OS === "ios" ? 40 : 20,
    paddingHorizontal: SIZES.padding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginRight: 10,
    padding: 5,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  title: {
    ...FONTS.bold,
    fontSize: SIZES.large,
  },
  socialButton: {
    marginHorizontal: 7,
  },
  ibuPayButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: SIZES.radius - 4,
    marginLeft: 15,
  },
  ibuPayText: {
    color: "#FFFFFF",
    ...FONTS.medium,
    fontSize: SIZES.small,
  },
});

export default Header;
