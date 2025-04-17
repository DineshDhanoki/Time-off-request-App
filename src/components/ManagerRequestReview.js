// src/components/ManagerRequestReview.js
import React, { useState, useEffect } from "react";
import { getRequestApprovalData, processTimeOffDecision } from "../services/timeOffService";
import "../styles/manager-review.css";

const ManagerRequestReview = ({ requestId, onDecisionComplete }) => {
  const [request, setRequest] = useState(null);
  const [approvalData, setApprovalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [decision, setDecision] = useState("");
  const [responseReason, setResponseReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRequestApprovalData(requestId);
        setRequest(data.request);
        setApprovalData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load request data");
        setLoading(false);
      }
    };

    fetchData();
  }, [requestId]);

  const handleDecision = async (selectedDecision) => {
    setDecision(selectedDecision);

    // Pre-fill reason with recommendation if rejecting
    if (
      selectedDecision === "rejected" &&
      approvalData.recommendation.action === "reject"
    ) {
      setResponseReason(approvalData.recommendation.reason);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await processTimeOffDecision(requestId, decision, responseReason);
      setIsSubmitting(false);

      if (onDecisionComplete) {
        onDecisionComplete(requestId, decision);
      }
    } catch (err) {
      setError("Failed to process decision");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading request data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!request) {
    return <div className="error-message">Request not found</div>;
  }

  return (
    <div className="request-review-container">
      <h2>Review Time-Off Request</h2>

      <div className="request-details">
        <h3>Request Details</h3>
        <p>
          <strong>Employee:</strong> {request.employeeName}
        </p>
        <p>
          <strong>Role:</strong> {request.role}
        </p>
        <p>
          <strong>Dates:</strong>{" "}
          {new Date(request.startDate).toLocaleDateString()} to{" "}
          {new Date(request.endDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Reason:</strong> {request.reason}
        </p>
        <p>
          <strong>Requested:</strong>{" "}
          {new Date(request.requestedAt).toLocaleString()}
        </p>
      </div>

      <div className="availability-info">
        <h3>Role Availability</h3>
        {approvalData.roleAvailability.map((day) => (
          <div key={day.date} className="availability-day">
            <span className="date">
              {new Date(day.date).toLocaleDateString()}
            </span>
            <span
              className={`coverage ${day.percentage < 50 ? "low" : "good"}`}
            >
              {day.availableTechs}/{day.totalTechs} available (
              {day.percentage.toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>

      <div className="job-conflicts">
        <h3>Job Schedule Conflicts</h3>
        {approvalData.jobConflicts.hasConflicts ? (
          <>
            <p className="warning">
              This technician has {approvalData.jobConflicts.totalConflicts}{" "}
              jobs scheduled during this period:
            </p>
            <ul>
              {approvalData.jobConflicts.conflictingJobs.map((job) => (
                <li key={job.id}>
                  Job #{job.id}:{" "}
                  {new Date(job.scheduledDate).toLocaleDateString()} -{" "}
                  {job.description}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="good">No scheduled jobs during this period</p>
        )}
      </div>

      <div className="recommendation">
        <h3>System Recommendation</h3>
        <p className={`recommendation-${approvalData.recommendation.action}`}>
          <strong>Recommended action:</strong>{" "}
          {approvalData.recommendation.action.toUpperCase()}
        </p>
        <p>
          <strong>Reason:</strong> {approvalData.recommendation.reason}
        </p>
      </div>

      {decision ? (
        <form className="decision-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="responseReason">Response Reason</label>
            <textarea
              id="responseReason"
              value={responseReason}
              onChange={(e) => setResponseReason(e.target.value)}
              rows={3}
              placeholder="Provide a reason for your decision"
              required
            />
          </div>

          <div className="decision-summary">
            <p>
              You are about to <strong>{decision}</strong> this request.
            </p>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setDecision("")}
              disabled={isSubmitting}
            >
              Back
            </button>
            <button
              type="submit"
              className={`submit-button ${decision}-button`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : `Confirm ${decision}`}
            </button>
          </div>
        </form>
      ) : (
        <div className="decision-buttons">
          <button
            className="reject-button"
            onClick={() => handleDecision("rejected")}
          >
            Reject Request
          </button>
          <button
            className="approve-button"
            onClick={() => handleDecision("approved")}
          >
            Approve Request
          </button>
        </div>
      )}
    </div>
  );
};

export default ManagerRequestReview;
