import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import { apiGet } from "../utils/api";

function Dashboard() {
  const [assignmentData, setAssignmentData] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const result = await apiGet("/assignments");
        if (result.status === "success") {
          setAssignmentData(result.assignments || []);
        }
      } catch (error) {
        console.error("Failed to load assignments:", error);
        setAssignmentData([]);
      }
    };
    fetchAssignments();
  }, []);

  const pendingCount = (assignmentData || []).filter(
    (assignment) => assignment.status === "Pending"
  ).length;
  const recentAssignments = [...(assignmentData || [])].reverse().slice(0, 6);

  return (
    <div className="dashboard-container">
      <div className="break">
        
        <h1 className="dashboard-h1">Recent Tasks</h1>
        <div className="assignments-lists">
          {recentAssignments.length > 0 ? (
            recentAssignments.map((assignment) => (
              <div key={assignment._id} className="assignment-card">
                <div className="card-head">
                  <div className="header-left">
                    <h3>{assignment.title}</h3>
                    <span className="subject-tag">{assignment.subject}</span>
                  </div>

                  <div className="header-right">
                    <span className="due-date">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    <span className={`status-badge ${assignment.status.toLowerCase()}`}>
                      {assignment.status}
                    </span>
                </div>
                </div>

                <div className="card-body">
                  <p>{assignment.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No assignments available. Create some assignments to see them here!</p>
          )}
        </div>
      </div>
      <div className="break-2">
      <h1 className="dashboard-h1">Pending</h1>
      <div className="dashboard-pending">
        <h3>Assignments pending: {pendingCount}</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;