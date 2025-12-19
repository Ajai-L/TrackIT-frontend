import "../Styles/Tasks.css";
import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../utils/api";

function Tasks() {
  const [assignmentData, setAssignmentData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    subject: "",
    description: "",
    dueDate: "",
    status: "Pending"
  });

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

  const taskCount = (assignmentData || []).length;
  const pendingCount = (assignmentData || []).filter(
    (assignment) => assignment.status === "Pending"
  ).length;
  const inProgress = (assignmentData || []).filter(
    (assignment) => assignment.status === "In Progress"
  ).length;
  const completedCount = (assignmentData || []).filter(
    (assignment) => assignment.status === "Completed"
  ).length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    
    // Input validation
    if (!newTask.title.trim() || !newTask.subject.trim() || !newTask.description.trim() || !newTask.dueDate) {
      alert("All fields are required!");
      return;
    }
    
    if (new Date(newTask.dueDate) < new Date()) {
      alert("Due date cannot be in the past!");
      return;
    }
    
    try {
      const result = await apiPost("/assignments", newTask);
      if (result.status === "success") {
        setAssignmentData([result.assignment, ...(assignmentData || [])]);
        setShowModal(false);
        setNewTask({
          title: "",
          subject: "",
          description: "",
          dueDate: "",
          status: "Pending"
        });
        alert("Assignment added successfully!");
      } else {
        alert(result.message || "Failed to add assignment");
      }
    } catch (error) {
      console.error("Failed to add task:", error);
      alert("Error adding assignment: " + error.message);
    }
  };

  return (
    <div className="tasks-container">
      <h1 className="tasks-h1">Tasks Page</h1>

      <div className="task-addButton">
        <button className="addButton" onClick={() => setShowModal(true)}>
          Add Task
        </button>
      </div>

      <div className="status-icons">
        <h4>Total Task:</h4>
        <h4>Pending:</h4>
        <h4>In Progress:</h4>
        <h4>Completed:</h4>
        <h4 className="tottask">{taskCount}</h4>
        <h4 className="pen">{pendingCount}</h4>
        <h4 className="inPro">{inProgress}</h4>
        <h4 className="com">{completedCount}</h4>
      </div>

      <div className="tasks-list">
        {(assignmentData || []).length > 0 ? (
          (assignmentData || []).map((assignment) => (
            <div key={assignment._id} className="task-card">
              <h3>{assignment.title}</h3>
              <p>
                <strong>Subject:</strong> {assignment.subject}
              </p>
              <p>{assignment.description}</p>
              <div className="task-meta">
                <p>
                  <strong>Due:</strong> {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
                <p
                  className={`status-text ${assignment.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  <strong>Status:</strong> {assignment.status}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available. Click "Add Task" to create your first assignment!</p>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Assignment</h2>
            <form onSubmit={handleAddTask} className="task-form">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                required
              />

              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                value={newTask.subject}
                onChange={handleInputChange}
                required
              />

              <label>Description:</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                required
              />

              <label>Due Date:</label>
              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                required
              />
              <label>Status:</label>
              <select
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
