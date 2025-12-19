import "./../Styles/Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Email and password are required!");
      return;
    }
    
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    
    if (!isLogin) {
      if (!formData.name) {
        alert("Name is required for signup!");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
    }
    
    try {
      const endpoint = isLogin ? "http://localhost:5001/api/v1/auth/login" : "http://localhost:5001/api/v1/auth/signup";
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password, passwordConfirm: formData.confirmPassword };
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (data.status === "success") {
        localStorage.setItem("auth", "true");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert(`${isLogin ? "Login" : "Sign Up"} successful!`);
        navigate("/home");
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Connection error. Please make sure the backend server is running on port 5001.");
    }
  };

  return (
    <div className="big-container">
    <div className="login-container">
      <div className="auth-card">
        <div className="toggle-container">
          <div className="toggle-switch">
            <input 
              type="checkbox" 
              id="authToggle" 
              checked={!isLogin}
              onChange={() => setIsLogin(!isLogin)}
            />
            <label htmlFor="authToggle" className="toggle-label">
              <span className="toggle-text login">Login</span>
              <span className="toggle-text signup">Sign Up</span>
              <div className="toggle-slider"></div>
            </label>
          </div>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="Enter your full name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirm your password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
            </div>
          )}
          
          <button className="auth-button" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          

        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;