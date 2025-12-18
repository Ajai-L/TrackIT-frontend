import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Home.css";

function Home() {
  return (
    <div className="home-landing">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Master Your Assignments. Declutter Your Mind.</h1>
          <p className="hero-subtitle">
            The all-in-one workspace for students to track assignments, manage deadlines, 
            and take focused notes. Stop juggling apps and start finishing tasks.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn-primary">Get Started for Free</Link>
            <Link to="/" className="btn-secondary">View Dashboard</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="dashboard-mockup">
            <div className="mockup-header">Dashboard</div>
            <div className="mockup-stats">
              <div className="stat">
                <span className="stat-number">12</span>
                <span className="stat-label">Total Tasks</span>
              </div>
              <div className="stat pending">
                <span className="stat-number">5</span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat completed">
                <span className="stat-number">7</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
            <div className="recent-tasks">
              <h4>Recent Tasks</h4>
              <div className="task-item">
                <span>Mathematics Problem Set</span>
                <span className="badge pending">Pending</span>
              </div>
              <div className="task-item">
                <span>History Essay</span>
                <span className="badge completed">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
     
      <section className="use-cases">
        <h2 className="section-title">For Every Student</h2>
        <div className="cases-grid">
          <div className="case">
            <div className="case-icon">🎓</div>
            <h3>High School</h3>
            <p>Keep track of 7 different subjects without breaking a sweat.</p>
          </div>
          <div className="case">
            <div className="case-icon">📚</div>
            <h3>University</h3>
            <p>Manage long-term thesis projects alongside daily homework.</p>
          </div>
          <div className="case">
            <div className="case-icon">💡</div>
            <h3>Self-Learners</h3>
            <p>Build your own curriculum and stick to it.</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <Link to="/login" className="footer-link">Login</Link>
          <p className="copyright">&copy; 2024 TrackIT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;