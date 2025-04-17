// src/components/NotificationCenter.js
import React, { useState, useEffect } from "react";
import "../styles/notifications.css";

const NotificationCenter = ({ onNotificationClick }) => {
  const [notifications, setNotifications] = useState([]);

  // For demonstration, we'll add some sample notifications
  useEffect(() => {
    // This would normally come from WebSocket events
    const demoNotifications = [
      // Empty initially
    ];

    setNotifications(demoNotifications);

    // Simulate receiving a new notification after 5 seconds
    const timer = setTimeout(() => {
      const newNotification = {
        id: `notif-${Date.now()}`,
        message: "New time-off request from Jane Smith",
        type: "new_request",
        data: { id: "req-12345", employeeName: "Jane Smith" },
        timestamp: new Date(),
      };

      setNotifications((prev) => [...prev, newNotification]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const dismissNotification = (notificationId, e) => {
    e.stopPropagation();
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  };

  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification-center">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
          onClick={() => onNotificationClick(notification)}
        >
          <div className="notification-content">
            <p>{notification.message}</p>
            <span className="notification-time">
              {notification.timestamp.toLocaleTimeString()}
            </span>
          </div>
          <button
            className="dismiss-button"
            onClick={(e) => dismissNotification(notification.id, e)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
