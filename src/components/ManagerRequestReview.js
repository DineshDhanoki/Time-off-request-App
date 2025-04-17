// src/components/ManagerRequestReview.js
import React, { useState, useEffect } from "react";
import "../styles/modal.css";

const ManagerRequestReview = ({
  requestId,
  request,
  onClose,
  onDecisionSubmit,
}) => {
  const [loading, setLoading] = useState(true);
  const [availabilityData, setAvailabilityData] = useState(null);
  const [jobConflicts, setJobConflicts] = useState(null);
  const [decision, setDecision] = useState("");
  const [responseReason, setResponseReason] = useState("");
  const [error, setError] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate fetching availability data and job conflicts
    const fetchData = async () => {
      try {
        // This would be an actual API call in a real implementation
        setTimeout(() => {
          // Simulate availability data
          const mockAvailability = [
            {
              date: new Date(request.startDate),
              totalTechs: 5,
              availableTechs: 4,
              percentage: 80,
            },
            {
              date: new Date(
                new Date(request.startDate).setDate(
                  new Date(request.startDate).getDate() + 1
                )
              ),
              totalTechs: 5,
              availableTechs: 3,
              percentage: 60,
            },
            {
              date: new Date(request.endDate),
              totalTechs: 5,
              availableTechs: 4,
              percentage: 80,
            },
          ];

          // Simulate job conflicts
          const mockJobConflicts = {
            hasConflicts: Math.random() > 0.5,
            conflictingJobs:
              Math.random() > 0.5
                ? [
                    {
                      id: "JOB-1001",
                      scheduledDate: request.startDate,
                      description: "Annual maintenance at Site A",
                    },
                    {
                      id: "JOB-1004",
                      scheduledDate: request.endDate,
                      description: "Equipment installation at Site B",
                    },
                  ]
                : [],
            totalConflicts: Math.random() > 0.5 ? 2 : 0,
          };

          setAvailabilityData(mockAvailability);
          setJobConflicts(mockJobConflicts);

          // Generate recommendation
          const shouldApprove =
            mockAvailability.every((day) => day.percentage >= 60) &&
            !mockJobConflicts.hasConflicts;

          setRecommendation({
            action: shouldApprove ? "approve" : "reject",
            reason: shouldApprove
              ? "Sufficient coverage available and no job conflicts"
              : mockJobConflicts.hasConflicts
              ? `Employee has ${mockJobConflicts.totalConflicts} scheduled jobs during this period`
              : "Insufficient role coverage during requested period",
          });

          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load availability data");
        setLoading(false);
      }
    };

    fetchData();
  }, [request]);

  const handleDecision = (selectedDecision) => {
    setDecision(selectedDecision);

    // Pre-fill reason with recommendation if rejecting
    if (
      selectedDecision === "rejected" &&
      recommendation &&
      recommendation.action === "reject"
    ) {
      setResponseReason(recommendation.reason);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // This would be an actual API call in a real implementation
      setTimeout(() => {
        console.log("Decision submitted:", {
          requestId,
          decision,
          responseReason,
        });
        setIsSubmitting(false);

        if (onDecisionSubmit) {
          onDecisionSubmit(requestId, decision, responseReason);
        }
      }, 1000);
    } catch (err) {
      setError("Failed to submit decision");
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="loading">Loading request data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content review-modal">
        <div className="modal-header">
          <h2>Review Time-Off Request</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="request-details">
          <h3>Request Details</h3>
          <p>
            <strong>Employee:</strong> {request.employeeName}
          </p>
          <p>
            <strong>Role:</strong> {request.role}
          </p>
          <p>
            <strong>Dates:</strong> {formatDate(request.startDate)} to{" "}
            {formatDate(request.endDate)}
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
          {availabilityData.map((day, index) => (
            <div key={index} className="availability-day">
              <span className="date">{formatDate(day.date)}</span>
              <span
                className={`coverage ${day.percentage < 50 ? "low" : "good"}`}
              >
                {day.availableTechs}/{day.totalTechs} available (
                {day.percentage}%)
              </span>
            </div>
          ))}
        </div>

        <div className="job-conflicts">
          <h3>Job Schedule Conflicts</h3>
          {jobConflicts.hasConflicts ? (
            <>
              <p className="warning">
                This technician has {jobConflicts.totalConflicts} jobs scheduled
                during this period:
              </p>
              <ul>
                {jobConflicts.conflictingJobs.map((job, index) => (
                  <li key={index}>
                    Job #{job.id}: {formatDate(job.scheduledDate)} -{" "}
                    {job.description}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="good">No scheduled jobs during this period</p>
          )}
        </div>

        <div
          className={`recommendation recommendation-${recommendation.action}`}
        >
          <h3>System Recommendation</h3>
          <p>
            <strong>Recommended action:</strong>{" "}
            {recommendation.action.toUpperCase()}
          </p>
          <p>
            <strong>Reason:</strong> {recommendation.reason}
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
    </div>
  );
};

export default ManagerRequestReview;
