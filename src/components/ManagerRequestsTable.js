// src/components/ManagerRequestsTable.js
import React, { useState } from "react";
import "../styles/table.css";
import "../styles/empty-state.css";
import "../styles/manager-actions.css";

const ManagerRequestsTable = ({ requests, onReviewRequest }) => {
  const [expandedRequestId, setExpandedRequestId] = useState(null);

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

  const toggleExpandRequest = (requestId) => {
    if (expandedRequestId === requestId) {
      setExpandedRequestId(null);
    } else {
      setExpandedRequestId(requestId);
    }
  };

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  );
  const processedRequests = requests.filter(
    (request) => request.status !== "pending"
  );

  if (!requests || requests.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>
        <h3>No Requests to Review</h3>
        <p>There are currently no time-off requests to review.</p>
      </div>
    );
  }

  return (
    <div className="manager-requests-container">
      {pendingRequests.length > 0 && (
        <>
          <h3>Pending Requests</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Role</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((request) => (
                  <React.Fragment key={request.id}>
                    <tr
                      className={
                        expandedRequestId === request.id ? "expanded-row" : ""
                      }
                      onClick={() => toggleExpandRequest(request.id)}
                    >
                      <td>{request.employeeName}</td>
                      <td>{request.role}</td>
                      <td>{formatDate(request.startDate)}</td>
                      <td>{formatDate(request.endDate)}</td>
                      <td className="reason-cell">
                        {request.reason.length > 50
                          ? `${request.reason.substring(0, 50)}...`
                          : request.reason}
                      </td>
                      <td>
                        <button
                          className="review-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onReviewRequest(request.id);
                          }}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                    {expandedRequestId === request.id && (
                      <tr className="expanded-content">
                        <td colSpan="6">
                          <div className="request-details">
                            <h4>Full Request Details</h4>
                            <p>
                              <strong>Employee ID:</strong> {request.employeeId}
                            </p>
                            <p>
                              <strong>Full Reason:</strong> {request.reason}
                            </p>
                            <p>
                              <strong>Requested At:</strong>{" "}
                              {new Date(request.requestedAt).toLocaleString()}
                            </p>
                            <div className="expanded-actions">
                              <button
                                className="review-button-large"
                                onClick={() => onReviewRequest(request.id)}
                              >
                                Review Request
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {processedRequests.length > 0 && (
        <>
          <h3>Processed Requests</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Role</th>
                  <th>Dates</th>
                  <th>Status</th>
                  <th>Your Response</th>
                </tr>
              </thead>
              <tbody>
                {processedRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.employeeName}</td>
                    <td>{request.role}</td>
                    <td>
                      {formatDate(request.startDate)} to{" "}
                      {formatDate(request.endDate)}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${getStatusClass(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td>
                      {request.responseReason || (
                        <span className="no-reason">No reason provided</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ManagerRequestsTable;
