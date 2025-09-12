import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const colorScheme = Appearance.getColorScheme();

  const [theme, setTheme] = useState(colorScheme || "light");

  useEffect(() => {
    (async () => {
      const savedTheme = await AsyncStorage.getItem("appTheme");
      if (savedTheme) setTheme(savedTheme);
    })();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("appTheme", newTheme);
  };

  const themeColors = {
    light: {
      background: "#fff",
      text: "#000",
      button: "#4CAF50",
      buttonText: "#fff",
      inputBackground: "#fff",
      inputBorder: "#000",
    },
    dark: {
      background: "#000",
      text: "#00FF00",
      button: "#0bf359ff",
      buttonText: "#000",
      inputBackground: "#222", 
      inputBorder: "#00FF00",
    },
  };

  return (
  <ThemeContext.Provider value={{ toggleTheme, colors: themeColors[theme], theme }}>
    {children}
  </ThemeContext.Provider>
);

}
