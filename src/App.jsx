import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Complete from './pages/Complete';
import Delete from './pages/Delete';
import Logs from './pages/Logs'; 
import { FaBars } from 'react-icons/fa'; 
import { IoIosSettings } from 'react-icons/io'; 
import myImage from './assets/images/logoers.jpg';

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(true); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const clearAllTasks = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      localStorage.removeItem('tasks');
      window.location.reload();
    }
  };

  return (
    <Router>
      <div className="app-container">
      <div className="top-bar">
      <div className="top-bar-left">
    <FaBars onClick={toggleNav} className="hamburger-icon" />
    <img src={myImage} alt="My Icon" className="logo" />
    <h4 className="app-title">DoItNow</h4>
</div>

  
  <div className="top-bar-right">
    <IoIosSettings onClick={toggleDropdown} className="settings-icon" />
    {isDropdownOpen && (
      <div className="dropdown-menu">
        <button onClick={clearAllTasks}>Delete All Tasks</button>
      </div>
    )}
  </div>
</div>


        <div className="main-content">
          <NavBar isNavOpen={isNavOpen} toggleNav={toggleNav} />
          <div className={`content ${isNavOpen ? 'content-open' : 'content-closed'}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/complete" element={<Complete />} />
              <Route path="/delete" element={<Delete />} />
              <Route path="/logs" element={<Logs />} /> 
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;