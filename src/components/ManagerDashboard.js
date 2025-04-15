// src/components/ManagerDashboard.js
import React from "react";
import { FiUserCheck } from "react-icons/fi";
import ManagerRequestsTable from "./ManagerRequestsTable";

const ManagerDashboard = ({
  requests,
  managerActions,
  setManagerActions,
  submitManagerDecision,
}) => {
  return (
    <section className="manager-section card">
      <div className="section-header">
        <div className="section-title">
          <FiUserCheck className="section-icon" />
          <h2>Manager Dashboard</h2>
        </div>
      </div>

      <div className="user-info-row">
        <div className="user-details">
          <span className="info-label">Name:</span> Hazel Wood
          <span className="info-label id-label">Manager ID:</span> 243ABZ
        </div>
      </div>

      <ManagerRequestsTable
        requests={requests}
        managerActions={managerActions}
        setManagerActions={setManagerActions}
        submitManagerDecision={submitManagerDecision}
      />
    </section>
  );
};

export default ManagerDashboard;
