// src/components/EmployeeRequestsTable.js
import React from "react";
import { FiCalendar } from "react-icons/fi";

const EmployeeRequestsTable = ({ requests }) => {
  const calculateDays = (start, end) => {
    const differenceInTime = end.getTime() - start.getTime();
    return Math.floor(differenceInTime / (1000 * 3600 * 24)) + 1;
  };

  return (
    <div className="table-container">
      <h3>My Time-Off Requests</h3>
      {requests.length > 0 ? (
        <div className="table-responsive">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Date Requested</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Manager Comments</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.requestDate.toLocaleDateString()}</td>
                  <td>{request.startDate.toLocaleDateString()}</td>
                  <td>{request.endDate.toLocaleDateString()}</td>
                  <td>{calculateDays(request.startDate, request.endDate)}</td>
                  <td>{request.reason}</td>
                  <td>
                    <span
                      className={`status-badge ${request.status.toLowerCase()}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td>{request.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <FiCalendar className="empty-icon" />
          <p>No time-off requests submitted yet.</p>
          <p>Click the "Request Time Off" button to get started.</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeRequestsTable;
