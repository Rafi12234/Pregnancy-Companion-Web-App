import React, { useState, useEffect, useRef } from 'react';
import woman from "../../assets/woman.png";


import { 
  Search, 
  Bell, 
  Mail, 
  User, 
  Settings, 
  Calendar, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X,
  Heart,
  ChevronDown,
  Sun,
  Moon,
  Plus,
  Filter,
  Activity,
  Zap
} from 'lucide-react';
import './NavBar.css';

const NavBar = ({ 
  currentUser = { 
    name: 'Samanta Islam', 
    avatar: woman,
    role: '',
    notifications: 5,
    messages: 2,
    status: 'available'
  } 
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      message: 'New patient consultation scheduled', 
      time: '2m ago', 
      unread: true,
      type: 'appointment',
      priority: 'high'
    },
    { 
      id: 2, 
      message: 'Lab results ready for review', 
      time: '15m ago', 
      unread: true,
      type: 'results',
      priority: 'medium'
    },
    { 
      id: 3, 
      message: 'Weekly team meeting reminder', 
      time: '1h ago', 
      unread: false,
      type: 'reminder',
      priority: 'low'
    },
  ]);
  
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleNotifications = () => setShowNotifications(!showNotifications);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      console.log('User logged out');
    }
  };

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery}`);
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const unreadNotifications = notifications.filter(n => n.unread).length;
  const unreadMessages = currentUser.messages;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  return (
    <div className={`navbar-wrapper ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <nav className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-content">
            
            {/* Brand/Logo */}
            <div 
              className="navbar-brand"
              onClick={() => handleNavigation('/')}
            >
              <div className="brand-icon-wrapper">
                <div className="brand-icon">
                  <Heart className="heart-icon" />
                </div>
                <div className="status-indicator">
                  <div className="status-dot" />
                </div>
              </div>
              <div className="brand-text">
                <span className="brand-name">MommyCare</span>
                <span className="brand-subtitle">Professional Suite</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              {/* Enhanced Search Bar */}
              <div 
                ref={searchRef}
                className={`search-container ${searchFocused ? 'focused' : ''}`}
              >
                <div className="search-input-wrapper">
                  <div className="search-icon-wrapper">
                    <Search className="search-icon" />
                  </div>
                  <input 
                    type="text"
                    className="search-input"
                    placeholder="Search patients, appointments, records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  />
                  {searchQuery && (
                    <button 
                      type="button"
                      className="search-clear"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="clear-icon" />
                    </button>
                  )}
                </div>
                
                {searchFocused && (
                  <div className="search-suggestions">
                    <div className="suggestions-header">
                      <span>Quick Actions</span>
                      <Filter className="filter-icon" />
                    </div>
                    {['New Patient Record', 'Schedule Appointment', 'View Analytics', 'Patient Reports'].map((item, idx) => (
                      <button key={idx} className="suggestion-item">
                        <div className="suggestion-icon">
                          <Plus className="plus-icon" />
                        </div>
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="nav-actions">
              
              {/* Quick Action Button */}
              <button className="quick-action-btn">
                <Plus className="action-icon" />
                <span className="action-text">New</span>
              </button>

              {/* Theme Toggle */}
              <button 
                className="theme-toggle"
                onClick={toggleDarkMode}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <div className="theme-icons">
                  <Sun className={`sun-icon ${darkMode ? 'hidden' : 'visible'}`} />
                  <Moon className={`moon-icon ${darkMode ? 'visible' : 'hidden'}`} />
                </div>
              </button>

              {/* Notifications */}
              <div className="notification-wrapper" ref={notificationRef}>
                <button 
                  className="notification-btn"
                  onClick={toggleNotifications}
                  title="Notifications"
                >
                  <Bell className="bell-icon" />
                  {unreadNotifications > 0 && (
                    <>
                      <span className="notification-badge">
                        {unreadNotifications}
                      </span>
                      <div className="notification-ping" />
                    </>
                  )}
                </button>

                {showNotifications && (
                  <div className="notifications-dropdown">
                    <div className="notifications-header">
                      <h3>Notifications</h3>
                      <div className="header-actions">
                        <button 
                          onClick={markAllAsRead}
                          className="mark-all-read"
                        >
                          Mark all read
                        </button>
                        <Activity className="activity-icon" />
                      </div>
                    </div>
                    <div className="notifications-list">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`notification-item ${notification.unread ? 'unread' : ''}`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="notification-content">
                            <div className={`priority-dot ${getPriorityColor(notification.priority)}`} />
                            <div className="notification-text">
                              <p className="notification-message">{notification.message}</p>
                              <p className="notification-time">{notification.time}</p>
                            </div>
                            {notification.unread && (
                              <div className="unread-indicator" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="notifications-footer">
                      <button onClick={() => handleNavigation('/notifications')}>
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Messages */}
              <button 
                className="messages-btn"
                onClick={() => handleNavigation('/messages')}
                title="Messages"
              >
                <Mail className="mail-icon" />
                {unreadMessages > 0 && (
                  <span className="message-badge">
                    {unreadMessages}
                  </span>
                )}
              </button>

              {/* User Profile Dropdown */}
              <div className="profile-wrapper" ref={dropdownRef}>
                <button 
                  className="profile-btn"
                  onClick={toggleDropdown}
                  title="Profile Menu"
                >
                  <div className="profile-avatar">
                    <img 
                      src={currentUser.avatar} 
                      alt="Profile" 
                      className="avatar-img"
                    />
                    <div className={`status-ring ${currentUser.status}`} />
                  </div>
                  <div className="profile-info">
                    <div className="profile-name">{currentUser.name}</div>
                    <div className="profile-role">{currentUser.role}</div>
                  </div>
                  <ChevronDown 
                    className={`chevron-icon ${dropdownOpen ? 'rotated' : ''}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-header">
                      <div className="header-avatar">
                        <img 
                          src={currentUser.avatar} 
                          alt="Profile" 
                          className="header-avatar-img"
                        />
                        <div className="header-status-badge">
                          <Zap className="zap-icon" />
                        </div>
                      </div>
                      <div className="header-info">
                        <h4 className="header-name">{currentUser.name}</h4>
                        <p className="header-role">{currentUser.role}</p>
                        <span className="status-badge">Available</span>
                      </div>
                    </div>
                    
                    <div className="profile-menu">
                      {[
                        { icon: User, label: 'My Profile', path: '/profile', color: 'indigo' },
                        { icon: Settings, label: 'Settings', path: '/settings', color: 'slate' },
                        { icon: Calendar, label: 'Appointments', path: '/appointments', color: 'purple' },
                        { icon: HelpCircle, label: 'Help & Support', path: '/help', color: 'blue' }
                      ].map((item, idx) => (
                        <button 
                          key={idx}
                          className={`menu-item ${item.color}`}
                          onClick={() => handleNavigation(item.path)}
                        >
                          <item.icon className="menu-icon" />
                          <span className="menu-label">{item.label}</span>
                        </button>
                      ))}
                      
                      <div className="menu-divider" />
                      
                      <button 
                        className="menu-item danger"
                        onClick={handleLogout}
                      >
                        <LogOut className="menu-icon" />
                        <span className="menu-label">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                className="mobile-toggle"
                onClick={toggleMobileMenu}
                title="Menu"
              >
                <div className="toggle-icons">
                  <Menu className={`menu-icon ${mobileMenuOpen ? 'hidden' : 'visible'}`} />
                  <X className={`x-icon ${mobileMenuOpen ? 'visible' : 'hidden'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : 'closed'}`}>
          <div className="mobile-content">
            
            {/* Mobile Search */}
            <div className="mobile-search">
              <div className="mobile-search-wrapper">
                <Search className="mobile-search-icon" />
                <input 
                  type="text"
                  className="mobile-search-input"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                />
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="mobile-actions">
              {[
                { icon: Bell, label: 'Notifications', badge: unreadNotifications, action: toggleNotifications },
                { icon: Mail, label: 'Messages', badge: unreadMessages, action: () => handleNavigation('/messages') },
                { icon: User, label: 'Profile', action: () => handleNavigation('/profile') },
                { icon: Settings, label: 'Settings', action: () => handleNavigation('/settings') },
                { icon: Calendar, label: 'Appointments', action: () => handleNavigation('/appointments') }
              ].map((item, idx) => (
                <button 
                  key={idx}
                  className="mobile-action-item"
                  onClick={item.action}
                >
                  <div className="mobile-action-content">
                    <item.icon className="mobile-action-icon" />
                    <span className="mobile-action-label">{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className="mobile-badge">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}

              <button 
                className="mobile-action-item"
                onClick={toggleDarkMode}
              >
                <div className="mobile-action-content">
                  {darkMode ? <Sun className="mobile-action-icon" /> : <Moon className="mobile-action-icon" />}
                  <span className="mobile-action-label">
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </div>
              </button>

              <div className="mobile-divider" />

              <button 
                className="mobile-action-item danger"
                onClick={handleLogout}
              >
                <div className="mobile-action-content">
                  <LogOut className="mobile-action-icon" />
                  <span className="mobile-action-label">Logout</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content overlap */}
      <div className="navbar-spacer" />
    </div>
  );
};

export default NavBar;