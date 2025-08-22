import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './Sidebar.css';

const Sidebar = ({ isCollapsed, setIsCollapsed, currentPage = 'dashboard' }) => {
  const [activeMenu, setActiveMenu] = useState(currentPage);
  const navigate = useNavigate(); // Hook for navigation

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fas fa-home',
      path: '/dashboard'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'fas fa-user',
      path: '/profile'
    },
    {
      id: 'pregnancy-progress',
      label: 'Pregnancy Progress',
      icon: 'fas fa-baby',
      path: '/pregnancy-progress'
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: 'fas fa-calendar-alt',
      path: '/appointments',
      badge: '2'
    },
    {
      id: 'health',
      label: 'Health',
      icon: 'fas fa-heartbeat',
      path: '/health'
    },
    {
      id: 'diet-symptom-logs',
      label: 'Diet & Symptom Logs',
      icon: 'fas fa-clipboard-list',
      path: '/diet-symptom-logs'
    },
    {
      id: 'community',
      label: 'Community',
      icon: 'fas fa-users',
      path: '/community',
      badge: '5'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'fas fa-cog',
      path: '/settings'
    }
  ];

  const handleMenuClick = (menuId, path) => {
    setActiveMenu(menuId);
    navigate(path); // Navigate to the page
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear user data from localStorage/sessionStorage if any
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      
      // Navigate to login page
      navigate('/login');
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="pregnancy-info">
            {!isCollapsed && (
              <>
                <div className="week-counter">
                  <div className="week-number">24</div>
                  <div className="week-text">Weeks</div>
                </div>
                <div className="pregnancy-details">
                  <h6 className="baby-size">Baby is size of a Corn</h6>
                  <p className="due-date">Due: March 15, 2024</p>
                </div>
              </>
            )}
            {isCollapsed && (
              <div className="week-counter-collapsed">
                <div className="week-number-small">24W</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <a
                  href={item.path}
                  className={`nav-link ${activeMenu === item.id ? 'active' : ''}`}
                  title={isCollapsed ? item.label : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(item.id, item.path);
                  }}
                >
                  <i className={`nav-icon ${item.icon}`}></i>
                  {!isCollapsed && (
                    <>
                      <span className="nav-text">{item.label}</span>
                      {item.badge && (
                        <span className="nav-badge">{item.badge}</span>
                      )}
                    </>
                  )}
                </a>
              </li>
            ))}
            
            {/* Logout - Separate from main menu */}
            <li className="nav-item logout-item">
              <a
                href="#"
                className="nav-link logout-link"
                title={isCollapsed ? 'Logout' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                <i className="nav-icon fas fa-sign-out-alt"></i>
                {!isCollapsed && <span className="nav-text">Logout</span>}
              </a>
            </li>
          </ul>
        </nav>

        {/* Progress Card
        {!isCollapsed && (
          <div className="progress-card">
            <h6 className="progress-title">
              <i className="fas fa-chart-line me-2"></i>
              Your Journey
            </h6>
            <div className="progress-item">
              <div className="progress-info">
                <span>Weight Gained</span>
                <span className="progress-value">12 lbs</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{width: '60%'}}></div>
              </div>
            </div>
            <div className="progress-item">
              <div className="progress-info">
                <span>Appointments</span>
                <span className="progress-value">8/12</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{width: '67%'}}></div>
              </div>
            </div>
          </div>
        )} */}

        {/* Quick Actions
        {!isCollapsed && (
          <div className="quick-actions">
            <h6 className="quick-actions-title">Quick Actions</h6>
            <div className="action-buttons">
              <button className="action-btn">
                <i className="fas fa-plus"></i>
                Log Symptom
              </button>
              <button className="action-btn">
                <i className="fas fa-calendar-plus"></i>
                Book Appointment
              </button>
            </div>
          </div>
        )} */}

        {/* Collapse Toggle */}
        <div className="sidebar-footer">
          <button className="collapse-btn" onClick={toggleSidebar}>
            <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="sidebar-overlay d-lg-none" 
          onClick={() => setIsCollapsed(true)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;