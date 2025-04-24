import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { SIZES, FONTS } from "../../theme/theme";

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  error,
  required = false,
  icon,
  disabled = false,
  onBlur,
  style,
  ...props
}) => {
  const { getTheme } = useTheme();
  const { colors } = getTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const borderColor = error
    ? colors.error
    : isFocused
    ? colors.primary
    : colors.border;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>
          {label} {required && <Text style={{ color: colors.error }}>*</Text>}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
            backgroundColor: disabled ? colors.border : colors.card,
          },
        ]}
      >
        {icon && (
          <View style={styles.iconContainer}>
            {React.cloneElement(icon, { color: colors.text, size: 20 })}
          </View>
        )}

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              backgroundColor: disabled ? colors.border : colors.card,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.inactive}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.toggleButton}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.margin,
    width: "100%",
  },
  label: {
    ...FONTS.medium,
    fontSize: SIZES.medium,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: SIZES.radius,
    paddingHorizontal: 12,
    height: 48,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    ...FONTS.regular,
    fontSize: SIZES.medium,
  },
  toggleButton: {
    padding: 8,
  },
  errorText: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    marginTop: 4,
  },
});

export default InputField;
