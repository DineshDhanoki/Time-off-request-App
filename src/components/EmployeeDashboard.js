// src/components/EmployeeDashboard.js
import React, { useState, useEffect } from "react";
import TimeOffForm from "./TimeOffForm";
import EmployeeRequestsTable from "./EmployeeRequestsTable";
import "../styles/card.css";

const EmployeeDashboard = ({ employee }) => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching employee requests
    const fetchRequests = async () => {
      // This would be an actual API call in a real implementation
      setTimeout(() => {
        // Sample data
        const sampleRequests = [
          {
            id: "req-1001",
            employeeId: employee.id,
            employeeName: employee.name,
            role: employee.role,
            startDate: "2025-05-01",
            endDate: "2025-05-05",
            reason: "Family vacation",
            status: "approved",
            requestedAt: "2025-04-10T10:30:00",
            responseAt: "2025-04-12T14:20:00",
            responseReason: "Approved as requested. Enjoy your vacation!",
          },
          {
            id: "req-1002",
            employeeId: employee.id,
            employeeName: employee.name,
            role: employee.role,
            startDate: "2025-06-15",
            endDate: "2025-06-16",
            reason: "Medical appointment",
            status: "pending",
            requestedAt: "2025-04-14T09:15:00",
          },
        ];

        setRequests(sampleRequests);
        setLoading(false);
      }, 1000);
    };

    fetchRequests();
  }, [employee]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleRequestSubmitted = (newRequest) => {
    setRequests([...requests, newRequest]);
    setShowForm(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Employee Dashboard</h1>
        <button className="action-button" onClick={toggleForm}>
          {showForm ? "Cancel" : "Request Time Off"}
        </button>
      </div>

      <div className="dashboard-content">
        <div className="card employee-info-card">
          <div className="card-header">
            <h2>Employee Information</h2>
          </div>
          <div className="card-content">
            <p>
              <strong>Name:</strong> {employee.name}
            </p>
            <p>
              <strong>ID:</strong> {employee.id}
            </p>
            <p>
              <strong>Role:</strong> {employee.role}
            </p>
            <p>
              <strong>Manager:</strong> {employee.managerName}
            </p>
          </div>
        </div>

        {showForm && (
          <div className="card form-card">
            <TimeOffForm
              employee={employee}
              onRequestSubmitted={handleRequestSubmitted}
            />
          </div>
        )}

        <div className="card requests-card">
          <div className="card-header">
            <h2>My Time-Off Requests</h2>
          </div>
          <div className="card-content">
            {loading ? (
              <div className="loading">Loading your requests...</div>
            ) : (
              <EmployeeRequestsTable requests={requests} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
