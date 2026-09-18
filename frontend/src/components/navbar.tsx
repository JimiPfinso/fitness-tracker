import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        Fitness Tracker
      </NavLink>

      <div className="navbar-links">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/log">Log</NavLink>
        <NavLink to="/tdee">TDEE</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
        <NavLink to="/resources">Resources</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;