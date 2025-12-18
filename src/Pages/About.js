import React from "react";
import "../Styles/About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        {/* Hero Section */}
        <section className="about-hero">
          <h1 className="about-title">Built by a Student, For Students</h1>
          <p className="about-subtitle">
            TrackIT was born from the frustration of juggling multiple apps, 
            sticky notes, and scattered deadlines during my own academic journey.
          </p>
        </section>

        <section className="story-section">
          <h2 className="story-title">The Story</h2>
          <div className="story-content">
            <p>
              Like many students, I found myself drowning in a sea of assignments, 
              due dates, and lecture notes. I tried everything—from complex project 
              management tools to simple sticky note apps. Nothing felt right.
            </p>
            <p>
              The complex tools were overkill for tracking homework. The simple ones 
              lacked the structure I needed. So I built TrackIT—a tool that sits 
              perfectly in the middle, designed specifically for the academic workflow.
            </p>
            <p>
              Every feature you see was born from a real need I experienced as a student. 
              The status tracking? Because I needed to see my progress at a glance. 
              The notes integration? Because context switching between apps killed my focus.
            </p>
          </div>
        </section>

        
        <section className="philosophy-section">
          <h2 className="philosophy-title">Our Philosophy</h2>
          <div className="philosophy-grid">
            <div className="philosophy-item">
              <h3>Simplicity First</h3>
              <p>No bloat. Just the features you need to ship assignments. 
              Every button, every screen serves a purpose in your academic workflow.</p>
            </div>
            <div className="philosophy-item">
              <h3>Focus</h3>
              <p>Designed to minimize distractions. Clean interfaces, 
              intuitive navigation, and zero unnecessary complexity.</p>
            </div>
            <div className="philosophy-item">
              <h3>Open Source</h3>
              <p>Built for the community, improved by the community. 
              Your feedback shapes every update and new feature.</p>
            </div>
          </div>
        </section>

        
        <section className="tech-section">
          <h2 className="tech-title">Technical Stack</h2>
          <div className="tech-content">
            <p className="tech-intro">
              Built with modern web technologies for performance and reliability:
            </p>
            <div className="tech-grid">
              <div className="tech-item">
                <h4>Frontend</h4>
                <ul>
                  <li>React 18+ for component-based architecture</li>
                  <li>React Router for seamless navigation</li>
                  <li>React Hook Form for efficient form handling</li>
                  <li>CSS3 with Flexbox/Grid for responsive design</li>
                </ul>
              </div>
              <div className="tech-item">
                <h4>Development</h4>
                <ul>
                  <li>Create React App for rapid development</li>
                  <li>Modern JavaScript (ES6+)</li>
                  <li>Component-based architecture</li>
                  <li>Local storage for data persistence</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="mission-section">
          <h2 className="mission-title">Our Mission</h2>
          <div className="mission-content">
            <p>
              To help students focus on what matters most—learning and growing—by 
              removing the friction from academic organization. We believe that 
              when students spend less time managing their workflow, they can 
              spend more time mastering their subjects.
            </p>
            <p>
              TrackIT isn't just another productivity app. It's a purpose-built 
              tool that understands the unique challenges of academic life and 
              provides solutions that actually work for students.
            </p>
          </div>
        </section>

        <section className="contact-section">
          <h2 className="contact-title">Get Involved</h2>
          <div className="contact-content">
            <p>
              Have feedback? Found a bug? Want to contribute? We'd love to hear from you.
            </p>
            <div className="contact-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                GitHub Repository
              </a>
              <a href="mailto:feedback@trackit.com" className="contact-link">
                Send Feedback
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className="contact-us-container">
        <div className="contact-us-content">
          <h2 className="contact-us-title">Contact Us</h2>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-label">Name:</span>
              <span className="contact-value">Ajai</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">Phone Number:</span>
              <span className="contact-value">1234567890</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">Instagram:</span>
              <span className="contact-value">NitresLinn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;