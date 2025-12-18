import "../Styles/Tasks.css";
import React, { useEffect, useState } from "react";

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
    fetch("/assignments.json")
      .then((res) => res.json())
      .then((data) => setAssignmentData(data))
      .catch((err) => console.error("Failed to load JSON:", err));
  }, []);

  const taskCount = assignmentData.length;
  const pendingCount = assignmentData.filter(
    (assignment) => assignment.status === "Pending"
  ).length;
  const inProgress = assignmentData.filter(
    (assignment) => assignment.status === "In Progress"
  ).length;
  const completedCount = assignmentData.filter(
    (assignment) => assignment.status === "Completed"
  ).length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    const newAssignment = {
      id: Date.now(),
      ...newTask
    };

    setAssignmentData([...assignmentData, newAssignment]);
    setShowModal(false);
    setNewTask({
      title: "",
      subject: "",
      description: "",
      dueDate: "",
      status: "Pending"
    });

    console.log("New Task Added:", newAssignment);
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
        {assignmentData.map((assignment) => (
          <div key={assignment.id} className="task-card">
            <h3>{assignment.title}</h3>
            <p>
              <strong>Subject:</strong> {assignment.subject}
            </p>
            <p>{assignment.description}</p>
            <div className="task-meta">
              <p>
                <strong>Due:</strong> {assignment.dueDate}
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
        ))}
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
