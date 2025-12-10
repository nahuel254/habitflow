import React from 'react';
import './Navbar.css';

const Navbar = ({ userName, onLogout, currentView, onViewChange }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/*logo de la App */}
        <span className="logo-text">HabitFlow</span>
      </div>
    
      <div className="navbar-user">
        <span className="user-info">{userName}</span>
        <button className="logout-button-nav" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;