// src/components/ThemeToggle.js
import React from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

const ThemeToggle = ({ theme, setTheme }) => {
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="theme-toggle">
      <button
        className={`theme-btn ${theme === "light" ? "active" : ""}`}
        onClick={() => handleThemeChange("light")}
        title="Light Mode"
      >
        <FiSun />
      </button>
      <button
        className={`theme-btn ${theme === "system" ? "active" : ""}`}
        onClick={() => handleThemeChange("system")} // Quick fix for system theme
        title="System Preference"
      >
        <FiMonitor />
      </button>
      <button
        className={`theme-btn ${theme === "dark" ? "active" : ""}`}
        onClick={() => handleThemeChange("dark")}
        title="Dark Mode"
      >
        <FiMoon />
      </button>
    </div>
  );
};

export default ThemeToggle;
