// src/components/Header.js
import React from "react";
import { FiClock } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const Header = ({ theme, setTheme }) => {
  return (
    <header>
      <div className="logo">
        <FiClock className="logo-icon" />
        <h1>TimeOff Portal</h1>
      </div>

      <ThemeToggle theme={theme} setTheme={setTheme} />
    </header>
  );
};

export default Header;
