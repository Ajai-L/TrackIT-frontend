import { useState, useEffect } from "react";
import { apiGet, apiPut } from "../utils/api";
import "../Styles/Profile.css";

function Profile() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "Student",
        phone: "",
        bio: "",
        createdAt: ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ ...user });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch user profile on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");
                console.log('Fetching profile...');
                console.log('Token in localStorage:', localStorage.getItem('token') ? 'Present' : 'Missing');
                
                const response = await apiGet('/profile');
                console.log('Profile response:', response);
                
                if (response.status === 'success') {
                    console.log('Profile loaded successfully:', response.data.user);
                    setUser(response.data.user);
                    setEditForm(response.data.user);
                } else {
                    console.error('Profile fetch failed:', response.message);
                    setError(response.message || 'Failed to load profile');
                }
            } catch (err) {
                console.error('Profile fetch error:', err);
                setError('Error loading profile: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setEditForm({ ...user });
        setSuccess("");
        setError("");
    };

    const handleSave = async () => {
        try {
            setError("");
            setSuccess("");
            
            const response = await apiPut('/profile', {
                name: editForm.name,
                email: editForm.email,
                role: editForm.role,
                phone: editForm.phone,
                bio: editForm.bio
            });

            if (response.status === 'success') {
                setUser(response.data.user);
                setIsEditing(false);
                setSuccess('Profile updated successfully!');
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError(response.message || 'Failed to update profile');
            }
        } catch (err) {
            console.error('Profile update error:', err);
            setError('Error updating profile: ' + err.message);
        }
    };

    const handleCancel = () => {
        setEditForm({ ...user });
        setIsEditing(false);
        setError("");
        setSuccess("");
    };

    if (loading) {
        return <div className="profile-container"><p>Loading profile...</p></div>;
    }

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="profile-container">
            <h1 className="profile-h1">Profile</h1>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

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
                            <strong>Phone:</strong> {user.phone || "Not provided"}
                        </div>
                        <div className="info-item">
                            <strong>Bio:</strong> {user.bio || "Not provided"}
                        </div>
                        <div className="info-item">
                            <strong>Member Since:</strong> {formatDate(user.createdAt)}
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
                            <label>Phone:</label>
                            <input
                                type="tel"
                                value={editForm.phone || ""}
                                onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                            />
                        </div>
                        <div className="edit-item">
                            <label>Bio:</label>
                            <textarea
                                value={editForm.bio || ""}
                                onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                                rows="4"
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