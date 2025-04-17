// src/components/TimeOffForm.js
import React, { useState } from "react";
import "../styles/modal.css";

const TimeOffForm = ({ employee, onRequestSubmitted }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate dates
      if (new Date(startDate) > new Date(endDate)) {
        throw new Error("End date must be after start date");
      }

      const requestData = {
        employeeId: employee.id,
        employeeName: employee.name,
        role: employee.role,
        managerId: employee.managerId,
        startDate,
        endDate,
        reason,
        status: "pending",
        requestedAt: new Date(),
      };

      // In a real implementation, this would call your API service
      // For now, we'll simulate the API call
      setTimeout(() => {
        console.log("Submitting request:", requestData);
        setIsSubmitting(false);

        // Reset form
        setStartDate("");
        setEndDate("");
        setReason("");

        if (onRequestSubmitted) {
          // Add a fake ID for demonstration
          onRequestSubmitted({ ...requestData, id: `req-${Date.now()}` });
        }
      }, 1000);
    } catch (error) {
      setError(error.message || "Failed to submit request");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="time-off-form-container">
      <h2>Request Time Off</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // Prevent past dates
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            placeholder="Please provide a reason for your time-off request"
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimeOffForm;
