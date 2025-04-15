// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import Footer from "./components/Footer";

function App() {
  // State for theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");

  // State for employee time-off requests
  const [requests, setRequests] = useState([]);

  // State for manager form data
  const [managerActions, setManagerActions] = useState({});

  // Theme management
  useEffect(() => {
    const handleSystemThemeChange = (event) => {
      if (theme === "system") {
        document.documentElement.setAttribute(
          "data-theme",
          event.matches ? "dark" : "light"
        );
      }
    };

    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      // System theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      document.documentElement.setAttribute(
        "data-theme",
        prefersDark.matches ? "dark" : "light"
      );
      prefersDark.addEventListener("change", handleSystemThemeChange);
    }

    localStorage.setItem("theme", theme);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  // Function to handle new request submission
  const handleSubmit = (newRequest) => {
    setRequests([...requests, newRequest]);
    setManagerActions((prev) => ({
      ...prev,
      [newRequest.id]: {
        status: "",
        comments: "",
      },
    }));
  };

  // Function to submit manager's decision
  const submitManagerDecision = (id) => {
    if (!managerActions[id]?.status) {
      alert("Please select either Approve or Reject before submitting.");
      return;
    }

    const updatedRequests = requests.map((request) => {
      if (request.id === id) {
        return {
          ...request,
          status: managerActions[id].status,
          comments: managerActions[id].comments,
          reviewDate: new Date(),
        };
      }
      return request;
    });

    setRequests(updatedRequests);
  };

  return (
    <div className="app-container">
      <Header theme={theme} setTheme={setTheme} />
      <EmployeeDashboard
        requests={requests}
        handleSubmit={handleSubmit}
        // TODO: Maybe add user auth later?
      />
      <ManagerDashboard
        requests={requests}
        managerActions={managerActions}
        setManagerActions={setManagerActions}
        submitManagerDecision={submitManagerDecision}
      />
      <Footer />
    </div>
  );
}

export default App;
