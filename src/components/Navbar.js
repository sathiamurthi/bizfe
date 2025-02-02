import React, { useState } from 'react';
import { Menu, Icon, Button } from 'semantic-ui-react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Navbar.css'; // Import the CSS for navbar styling
import logo from '../assets/images/logo.png'; // Adjusted path to logo.png

const Navbar = ({ userRole, setUserRole }) => {  // Accept setUserRole as a prop
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const activeItem = location.pathname;
  const [showLogout, setShowLogout] = useState(false); // State to toggle logout button visibility
  const [userInfoTop, setUserInfoTop] = useState('620px'); // State to control the top position

  // Function to handle logout
  const handleLogout = () => {
    setUserRole(null); // Reset user role state
    navigate('/'); // Redirect to the login page
  };

  // Function to toggle the logout button visibility and change top position
  const toggleUserInfoPosition = () => {
    setUserInfoTop((prevTop) => (prevTop === '620px' ? '580px' : '620px')); // Toggle between 620px and 580px
    setShowLogout((prevShow) => !prevShow); // Toggle the logout button visibility
  };

  return (
    <div className="sidebar">
      {/* Add the logo at the top of the sidebar */}
      <div className="logo-container">
        <img src={logo} alt="Platform X Logo" className="navbar-logo" />
      </div>

      {/* User Info Section */}
      <div 
        className="user-info" 
        onClick={toggleUserInfoPosition}  // Change top position on click
        style={{ top: userInfoTop }} // Dynamically set the top position
      >
        <h3 className="user-name">
          <Icon name="user" className="user-icon" /> 
          Ravi Kumar
        </h3>
        <span className={`role-tag ${userRole}`}>{userRole === 'bizops' ? 'BizOps' : 'Leader'}</span>
      </div>

      <Menu vertical pointing secondary className="navbar-menu">
        {/* Conditional rendering based on user role */}
        {userRole === 'leader' && (
          <>
            <Menu.Item
              name="dashboard"
              active={activeItem === '/dashboard'}
              as={Link}
              to="/dashboard"
              className="item"
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              name="projects"
              active={activeItem === '/projects'}
              as={Link}
              to="/projects"
              className="item"
            >
              Projects
            </Menu.Item>
            <Menu.Item
              name="reports"
              active={activeItem === '/reports'}
              as={Link}
              to="/reports" // Add link to the new Reports page
              className="item"
            >
              Reports
            </Menu.Item>
          </>
        )}

        {userRole === 'bizops' && (
          <>
            <Menu.Item
              name="dashboardbizops"
              active={activeItem === '/dashboardbizops'}
              as={Link}
              to="/dashboardbizops"
              className="item"
            >
              Overview
            </Menu.Item>
            <Menu.Item
              name="projects"
              active={activeItem === '/projects'}
              as={Link}
              to="/projects"
              className="item"
            >
              Project Allocation
            </Menu.Item>
            {/* New Menu Item for Employees */}
            <Menu.Item
              name="employees"
              active={activeItem === '/employees'}
              as={Link}
              to="/employees" // Link to EmpPage.js route
              className="item"
            >
              Employees
            </Menu.Item>
          </>
        )}
      </Menu>

      {/* Conditionally Render Logout Button */}
      {showLogout && (  // Show logout button only when showLogout is true
        <div className="logout-container">
          <Button 
            icon
            labelPosition="left"
            color="red"
            onClick={handleLogout} // Logout handler
            className="logout-button"
          >
            <Icon name="sign-out" />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
