// src/components/ManagerRequestsTable.js
import React from "react";
import { FiCalendar } from "react-icons/fi";

const ManagerRequestsTable = ({
  requests,
  managerActions,
  setManagerActions,
  submitManagerDecision,
}) => {
  const calculateDays = (start, end) => {
    const differenceInTime = end.getTime() - start.getTime();
    return Math.floor(differenceInTime / (1000 * 3600 * 24)) + 1;
  };

  const handleStatusChange = (id, status) => {
    setManagerActions((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        status: status,
      },
    }));
  };

  const handleCommentsChange = (id, comments) => {
    setManagerActions((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        comments: comments,
      },
    }));
  };

  return (
    <div className="table-container">
      <h3>Employee Time-Off Requests</h3>
      {requests.length > 0 ? (
        <div className="table-responsive">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date Requested</th>
                <th>Period</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.employeeName}</td>
                  <td>{request.requestDate.toLocaleDateString()}</td>
                  <td>
                    {request.startDate.toLocaleDateString()} -{" "}
                    {request.endDate.toLocaleDateString()}
                  </td>
                  <td>{calculateDays(request.startDate, request.endDate)}</td>
                  <td>{request.reason}</td>
                  <td>
                    <span
                      className={`status-badge ${request.status.toLowerCase()}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td>
                    {request.status === "Requested" ? (
                      <div className="action-container">
                        <div className="radio-group">
                          <label className="radio-label">
                            <input
                              type="radio"
                              name={`status-${request.id}`}
                              value="Approved"
                              checked={
                                managerActions[request.id]?.status ===
                                "Approved"
                              }
                              onChange={() =>
                                handleStatusChange(request.id, "Approved")
                              }
                            />
                            <span className="radio-text">Approve</span>
                          </label>
                          <label className="radio-label">
                            <input
                              type="radio"
                              name={`status-${request.id}`}
                              value="Rejected"
                              checked={
                                managerActions[request.id]?.status ===
                                "Rejected"
                              }
                              onChange={() =>
                                handleStatusChange(request.id, "Rejected")
                              }
                            />
                            <span className="radio-text">Reject</span>
                          </label>
                        </div>

                        <div className="comments-group">
                          <textarea
                            value={managerActions[request.id]?.comments || ""}
                            onChange={(e) =>
                              handleCommentsChange(request.id, e.target.value)
                            }
                            placeholder="Add comments..."
                            className="manager-comments"
                          />

                          <button
                            className="btn-primary submit-button"
                            onClick={() => submitManagerDecision(request.id)}
                          >
                            Submit Decision
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="decision-info">
                        <span className="decision-status">
                          {request.status} on{" "}
                          {request.reviewDate?.toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </td>
                  <td>
                    {request.status !== "Requested" ? (
                      request.comments
                    ) : (
                      <span className="pending-text">Pending decision</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <FiCalendar className="empty-icon" />
          <p>No pending requests to review.</p>
          <p>Time-off requests will appear here once submitted.</p>
        </div>
      )}
    </div>
  );
};

export default ManagerRequestsTable;
