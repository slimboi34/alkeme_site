// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  return (
    <nav className="nav-bar">
      <ul>
        <li><Link to="/Home">Home</Link></li>

        {/* Crypto Tab with Submenu */}
        <li 
          className="dropdown" 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <span>Crypto</span>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li><Link to="/market-performance-visualisation">24 Hour Change Performance</Link></li>
              <li><Link to="/dashboard">Bitcoin Dashboard</Link></li>
              <li><Link to="/supply-info">Celebrity Portfolio</Link></li>
              <li><Link to="/price-info">Crypto Dashboard</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;