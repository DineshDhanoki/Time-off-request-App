// src/components/EmployeeRequestsTable.js
import React from "react";
import "../styles/table.css";
import "../styles/empty-state.css";

const EmployeeRequestsTable = ({ requests }) => {
  // Format date to display in a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return "status-approved";
      case "rejected":
        return "status-rejected";
      case "pending":
      default:
        return "status-pending";
    }
  };

  if (!requests || requests.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📅</div>
        <h3>No Time-Off Requests</h3>
        <p>You haven't submitted any time-off requests yet.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{formatDate(request.startDate)}</td>
              <td>{formatDate(request.endDate)}</td>
              <td className="reason-cell">{request.reason}</td>
              <td>
                <span
                  className={`status-badge ${getStatusClass(request.status)}`}
                >
                  {request.status}
                </span>
              </td>
              <td>
                {request.responseReason ? (
                  request.responseReason
                ) : request.status === "pending" ? (
                  <span className="awaiting">Awaiting response</span>
                ) : (
                  <span className="no-reason">No reason provided</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeRequestsTable;
