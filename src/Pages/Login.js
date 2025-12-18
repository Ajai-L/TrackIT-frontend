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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Set authentication in localStorage
    localStorage.setItem("auth", "true");
    localStorage.setItem("user", JSON.stringify({ email: formData.email, name: formData.name }));
    
    const action = isLogin ? "Login" : "Sign Up";
    alert(`${action} successful!`);
    
    // Redirect to home page
    navigate("/home");
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