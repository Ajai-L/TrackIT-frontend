import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.css";

function Dashboard() {
  const [assignmentData, setAssignmentData] = useState([]);

  useEffect(() => {
    fetch("/assignments.json")
      .then((res) => res.json())
      .then((data) => setAssignmentData(data))
      .catch((err) => console.error("Failed to load JSON:", err));
  }, []);

  const pendingCount = assignmentData.filter(
    (assignment) => assignment.status === "Pending"
  ).length;
  const recentAssignments = [...assignmentData].reverse().slice(0, 6);

  return (
    <div className="dashboard-container">
      <div className="break">
        
        <h1 className="dashboard-h1">Recent Tasks</h1>
        <div className="assignments-lists">
          {recentAssignments.map((assignment) => (
            <div key={assignment.id} className="assignment-card">
              <div className="card-head">
                <div className="header-left">
                  <h3>{assignment.title}</h3>
                  <span className="subject-tag">{assignment.subject}</span>
                </div>

                <div className="header-right">
                  <span className="due-date">Due: {assignment.dueDate}</span>
                  <span className={`status-badge ${assignment.status.toLowerCase()}`}>
                    {assignment.status}
                  </span>
              </div>
              </div>

              <div className="card-body">
                <p>{assignment.description}</p>
              </div>
            </div>
          ))}
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