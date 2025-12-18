import { NavLink } from 'react-router-dom';
function Header() {
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
          <NavLink to={"/login"}>Login</NavLink>
        </div>
      </header>
  )
}
export default Header;
