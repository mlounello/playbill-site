// src/components/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img
          src="/images/DOMEMARK_PMS_YellowDomeWhiteText.png"
          alt="Siena College Logo"
          className="navbar-logo-img"
        />
      </Link>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* Future: Add more links like About, Contact, etc. */}
      </ul>
    </nav>
  );
};

export default NavBar;