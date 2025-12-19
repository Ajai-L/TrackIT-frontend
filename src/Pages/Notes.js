import "../Styles/Notes.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/api";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const result = await apiGet("/notes");
      if (result.status === "success") {
        setNotes(result.notes || []);
      }
    } catch (error) {
      console.error("Failed to load notes:", error);
      setNotes([]);
    }
  };

  const onSubmitHandler = async (data) => {
    try {
      if (editingNote) {
        const result = await apiPut(`/notes/${editingNote._id}`, data);
        if (result.status === "success") {
          setNotes(notes.map(note => 
            note._id === editingNote._id ? result.note : note
          ));
          setEditingNote(null);
          alert("Note updated successfully");
        }
      } else {
        const result = await apiPost("/notes", data);
        if (result.status === "success") {
          setNotes([result.note, ...notes]);
          alert("Note added successfully");
        }
      }
      reset();
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Error saving note");
    }
  };

  const deleteNote = async (id) => {
    try {
      const result = await apiDelete(`/notes/${id}`);
      if (result.status === "success") {
        setNotes(notes.filter(note => note._id !== id));
        alert("Note deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Error deleting note");
    }
  };

  const editNote = (note) => {
    setEditingNote(note);
    setValue("name", note.name);
    setValue("date", new Date(note.date).toISOString().split('T')[0]);
    setValue("subject", note.subject);
    setValue("description", note.description);
  };

  const cancelEdit = () => {
    setEditingNote(null);
    reset();
  };

  return (
    <div className="notes-container">
      <h1 className="notes-h1">Notes Page</h1>
      
      <form onSubmit={handleSubmit(onSubmitHandler)} className="notes-form">
        <div className="form-group">
          <label>Author:</label>
          <input 
            {...register("name", { required: "Author name is required" })} 
            type="text" 
            placeholder="Enter author name"
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input 
            {...register("date", { required: "Date is required" })} 
            type="date"
          />
          {errors.date && <span className="error">{errors.date.message}</span>}
        </div>

        <div className="form-group">
          <label>Subject:</label>
          <input 
            {...register("subject", { required: "Subject is required" })} 
            type="text" 
            placeholder="Enter subject"
          />
          {errors.subject && <span className="error">{errors.subject.message}</span>}
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea 
            {...register("description", { required: "Description is required" })} 
            placeholder="Enter note description"
            rows="4"
          />
          {errors.description && <span className="error">{errors.description.message}</span>}
        </div>

        <div className="form-buttons">
          <button type="submit" className="add-note-btn">
            {editingNote ? "Update Note" : "Add Note"}
          </button>
          {editingNote && (
            <button type="button" onClick={cancelEdit} className="cancel-edit-btn">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="notes-list">
        <h2>My Notes</h2>
        {notes.length === 0 ? (
          <div className="no-notes">
            <img src="/notes-taking.jpg" alt="Taking notes" className="notes-image" />
            <p>No notes yet. Add your first note above!</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-card">
              <div className="note-header">
                <h3>{note.subject}</h3>
                <div className="note-actions">
                  <button 
                    onClick={() => editNote(note)} 
                    className="edit-note-btn"
                    title="Edit note"
                  >
                    ✎
                  </button>
                  <button 
                    onClick={() => deleteNote(note._id)} 
                    className="delete-btn"
                    title="Delete note"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="note-meta">
                <span>By: {note.name}</span>
                <span>Date: {new Date(note.date).toLocaleDateString()}</span>
              </div>
              <p className="note-description">{note.description}</p>
              <small className="note-timestamp">
                Created: {new Date(note.createdAt).toLocaleString()}
                {note.updatedAt && note.updatedAt !== note.createdAt && ` | Updated: ${new Date(note.updatedAt).toLocaleString()}`}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default Notes;
