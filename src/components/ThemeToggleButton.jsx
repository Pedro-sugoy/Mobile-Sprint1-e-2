import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggleButton() {
  const { toggleTheme, colors, theme } = useTheme();

  const icon = theme === "dark" ? "☀️" : "🌑";

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.button }]}
      onPress={toggleTheme}
    >
      <Text style={[styles.texto, { color: colors.buttonText }]}>{icon}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 0, 
  },
  texto: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
