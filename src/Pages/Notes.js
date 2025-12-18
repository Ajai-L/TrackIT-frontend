import "../Styles/Notes.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

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

  const onSubmitHandler = (data) => {
    if (editingNote) {
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, ...data, updatedAt: new Date().toLocaleString() }
          : note
      ));
      setEditingNote(null);
      alert("Note updated successfully");
    } else {
      const newNote = {
        id: Date.now(),
        ...data,
        createdAt: new Date().toLocaleString()
      };
      setNotes([newNote, ...notes]);
      alert("Note added successfully");
    }
    reset();
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (note) => {
    setEditingNote(note);
    setValue("name", note.name);
    setValue("date", note.date);
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
            <div key={note.id} className="note-card">
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
                    onClick={() => deleteNote(note.id)} 
                    className="delete-btn"
                    title="Delete note"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="note-meta">
                <span>By: {note.name}</span>
                <span>Date: {note.date}</span>
              </div>
              <p className="note-description">{note.description}</p>
              <small className="note-timestamp">
                Created: {note.createdAt}
                {note.updatedAt && ` | Updated: ${note.updatedAt}`}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default Notes;
