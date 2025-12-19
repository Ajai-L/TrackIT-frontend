import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsAuthenticated(auth === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className='header'>
        <span className='project-name'>TrackIT</span>
        <div className='links'>
          <NavLink to={"/home"}>Home</NavLink>
          <NavLink to={"/"}><p className='para'>Dashboard</p></NavLink>
          <NavLink to={"/tasks"}>Tasks</NavLink>
          <NavLink to={"/notes"}>Notes</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/profile"}>Profile</NavLink>
          <div className="auth-buttons">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            ) : (
              <NavLink to={"/login"}>Login</NavLink>
            )}
          </div>
        </div>
      </header>
  )
}
export default Header;
