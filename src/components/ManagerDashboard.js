// src/components/ManagerDashboard.js
import React, { useState, useEffect } from 'react';
import ManagerRequestsTable from './ManagerRequestsTable';
import ManagerRequestReview from './ManagerRequestReview';
import '../styles/card.css';

const ManagerDashboard = ({ manager }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Simulate fetching requests for this manager
    const fetchRequests = async () => {
      // This would be an actual API call in a real implementation
      setTimeout(() => {
        // Sample data
        const sampleRequests = [
          {
            id: 'req-2001',
            employeeId: 'emp-101',
            employeeName: 'John Smith',
            role: 'Field Technician',
            managerId: manager.id,
            startDate: '2025-05-10',
            endDate: '2025-05-12',
            reason: 'Family event',
            status: 'pending',
            requestedAt: '2025-04-14T11:20:00'
          },
          {
            id: 'req-2002',
            employeeId: 'emp-102',
            employeeName: 'Jane Doe',
            role: 'Network Specialist',
            managerId: manager.id,
            startDate: '2025-05-15',
            endDate: '2025-05-20',
            reason: 'Vacation',
            status: 'approved',
            requestedAt: '2025-04-10T09:00:00',
            responseAt: '2025-04-11T14:30:00',
            responseReason: 'Request approved. Coverage arranged.'
          },
          {
            id: 'req-2003',
            employeeId: 'emp-103',
            employeeName: 'Robert Chen',
            role: 'Field Technician',
            managerId: manager.id,
            startDate: '2025-05-05',
            endDate: '2025-05-06',
            reason: 'Personal appointment',
            status: 'rejected',
            requestedAt: '2025-04-08T10:15:00',
            responseAt: '2025-04-09T11:45:00',
            responseReason: 'Critical job scheduled during this period.'
          }
        ];
        
        setRequests(sampleRequests);
        setLoading(false);
      }, 1000);
    };
    
    fetchRequests();
  }, [manager]);

  const handleReviewRequest = (requestId) => {
    const request = requests.find(req => req.id === requestId);
    if (request) {
      setSelectedRequestId(requestId);
      setSelectedRequest(request);
    }
  };

  const handleCloseReview = () => {
    setSelectedRequestId(null);
    setSelectedRequest(null);
  };

  const handleDecisionSubmit = (requestId, decision, responseReason) => {
    // Update the request in state
    const updatedRequests = requests.map(req => 
      req.id === requestId 
        ? {
            ...req, 
            status: decision,
            responseReason,
            responseAt: new Date().toISOString()
          } 
        : req
    );
    
    setRequests(updatedRequests);
    handleCloseReview();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Manager Dashboard</h1>
      </div>
      
      <div className="dashboard-content">
        <div className="card manager-info-card">
          <div className="card-header">
            <h2>Manager Information</h2>
          </div>
          <div className="card-content">
            <p><strong>Name:</strong> {manager.name}</p>
            <p><strong>ID:</strong> {manager.id}</p>
            <p><strong>Department:</strong> {manager.department}</p>
          </div>
        </div>
        
        <div className="card requests-card">
          <div className="card-header">
            <h2>Time-Off Requests</h2>
          </div>
          <div className="card-content">
            {loading ? (
              <div className="loading">Loading requests...</div>
            ) : (
              <ManagerRequestsTable 
                requests={requests} 
                onReviewRequest={handleReviewRequest} 
              />
            )}
          </div>
        </div>
      </div>