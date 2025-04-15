// src/components/TimeOffForm.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimeOffForm = ({ handleSubmit, setShowForm }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState("");

  const calculateDays = (start, end) => {
    const differenceInTime = end.getTime() - start.getTime();
    return Math.floor(differenceInTime / (1000 * 3600 * 24)) + 1;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: Date.now(),
      employeeName: "John Smith", // Hardcoding for now
      startDate: startDate,
      endDate: endDate,
      reason: reason,
      status: "Requested",
      comments: "",
      requestDate: new Date(),
    };
    handleSubmit(newRequest);
    setReason("");
    setStartDate(new Date());
    setEndDate(new Date());
    setShowForm(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>New Time-Off Request</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="date-picker"
              dateFormat="MMMM d, yyyy"
            />
          </div>

          <div className="form-group">
            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="date-picker"
              minDate={startDate}
              dateFormat="MMMM d, yyyy"
            />
          </div>

          <div className="form-group">
            <label>Reason:</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              placeholder="Please describe the reason for your time off request..."
            />
          </div>

          <div className="time-summary">
            <span>
              Total days requested:{" "}
              <strong>{calculateDays(startDate, endDate)}</strong>
            </span>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Submit Request
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeOffForm;
