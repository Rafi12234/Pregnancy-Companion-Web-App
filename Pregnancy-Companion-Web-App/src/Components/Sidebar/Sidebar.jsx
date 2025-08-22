import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import listIcon from "../../assets/list.png";

const Sidebar = ({ currentPage = "dashboard" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(currentPage);
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "fas fa-home",
      path: "/dashboard",
    },
    {
      id: "profile",
      label: "Profile",
      icon: "fas fa-user",
      path: "/profile",
    },
    {
      id: "pregnancy-progress",
      label: "Pregnancy Progress",
      icon: "fas fa-baby",
      path: "/pregnancy-progress",
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: "fas fa-calendar-alt",
      path: "/appointments",
      badge: "2",
    },
    {
      id: "health",
      label: "Health",
      icon: "fas fa-heartbeat",
      path: "/health",
    },
    {
      id: "diet-symptom-logs",
      label: "Diet & Symptom Logs",
      icon: "fas fa-clipboard-list",
      path: "/diet-symptom-logs",
    },
    {
      id: "community",
      label: "Community",
      icon: "fas fa-users",
      path: "/community",
      badge: "5",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "fas fa-cog",
      path: "/settings",
    },
  ];

  const handleMenuClick = (menuId, path) => {
    setActiveMenu(menuId);
    navigate(path);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      navigate("/login");
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        {/* Collapse Button at Top */}
        <div className="sidebar-top-controls">
          <button
            className="collapse-top-btn"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{ backgroundImage: `url(${listIcon})` }}
          ></button>
        </div>

        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="pregnancy-info">
            {!isCollapsed ? (
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
            ) : (
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
                  className={`nav-link ${
                    activeMenu === item.id ? "active" : ""
                  }`}
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

            {/* Logout */}
            <li className="nav-item logout-item">
              <a
                href="#"
                className="nav-link logout-link"
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
      </div>
    </>
  );
};

export default Sidebar;
