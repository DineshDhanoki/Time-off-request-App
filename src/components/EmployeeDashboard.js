// src/components/EmployeeDashboard.js
import React, { useState } from "react";
import { FiUser, FiCalendar } from "react-icons/fi";
import TimeOffForm from "./TimeOffForm";
import EmployeeRequestsTable from "./EmployeeRequestsTable";

const EmployeeDashboard = ({ requests, handleSubmit }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="employee-section card">
      <div className="section-header">
        <div className="section-title">
          <FiUser className="section-icon" />
          <h2>Employee Dashboard</h2>
        </div>
        <button className="request-button" onClick={() => setShowForm(true)}>
          <FiCalendar className="btn-icon" />
          Request Time Off
        </button>
      </div>

      {showForm && (
        <TimeOffForm handleSubmit={handleSubmit} setShowForm={setShowForm} />
      )}

      <EmployeeRequestsTable requests={requests} />
    </section>
  );
};

export default EmployeeDashboard;
