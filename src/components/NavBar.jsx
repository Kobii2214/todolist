import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaClipboardCheck, FaTrashAlt, FaFileAlt } from 'react-icons/fa'; 
import './NavBar.css';

const NavBar = ({ isNavOpen, toggleNav }) => {
  return (
    <div className={`navbar ${isNavOpen ? 'open' : 'closed'}`}>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <FaHome className="nav-icon" />
            <span className="nav-text">Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/complete" className="nav-link">
            <FaClipboardCheck className="nav-icon" />
            <span className="nav-text">Complete</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/delete" className="nav-link">
            <FaTrashAlt className="nav-icon" />
            <span className="nav-text">Delete</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/logs" className="nav-link">
            <FaFileAlt className="nav-icon" /> 
            <span className="nav-text">Logs</span> 
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
