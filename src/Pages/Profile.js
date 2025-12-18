import { useState } from "react";

function Profile() {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Student",
        joinDate: "2024-01-15"
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ ...user });

    const handleEdit = () => {
        setIsEditing(true);
        setEditForm({ ...user });
    };

    const handleSave = () => {
        setUser({ ...editForm });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditForm({ ...user });
        setIsEditing(false);
    };

    return (
        <div className="profile-container">
            <h1 className="profile-h1">Profile</h1>
            <div className="profile-info">
                <h2 className="profile-h2">User Information</h2>
                
                {!isEditing ? (
                    <div className="profile-display">
                        <div className="info-item">
                            <strong>Name:</strong> {user.name}
                        </div>
                        <div className="info-item">
                            <strong>Email:</strong> {user.email}
                        </div>
                        <div className="info-item">
                            <strong>Role:</strong> {user.role}
                        </div>
                        <div className="info-item">
                            <strong>Join Date:</strong> {user.joinDate}
                        </div>
                        <button onClick={handleEdit} className="edit-btn">
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <div className="profile-edit">
                        <div className="edit-item">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            />
                        </div>
                        <div className="edit-item">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                            />
                        </div>
                        <div className="edit-item">
                            <label>Role:</label>
                            <select
                                value={editForm.role}
                                onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                            >
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div className="edit-buttons">
                            <button onClick={handleSave} className="save-btn">Save</button>
                            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Profile;