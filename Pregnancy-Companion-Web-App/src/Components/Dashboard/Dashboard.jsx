import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Sidebar from '../Sidebar/Sidebar';

import WelcomeBanner from './WelcomeBanner';
import UpcomingAppointments from './UpcomingAppointments';
import DailyHealthOverview from './DailyHealthOverview';
import BabyHealthUpdate from './BabyHealthUpdate';
import DietWellnessTips from './DietWellnessTips';
import CommunityPost from './CommunityPost';

import './Dashboard.css';

const Dashboard = () => {
  // State for controlling sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="dashboard-layout">
      {/* Sidebar (left) */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main content area */}
      <div className="main-content">
        {/* Navbar (top) */}
        <NavBar />

        {/* Dashboard content */}
        <div className="dashboard-container">
          <div className="dashboard-grid">
            {/* Welcome Banner - Full Width */}
            <div className="grid-item full-width">
              <WelcomeBanner />
            </div>

            {/* Top Row - Two Columns */}
            <div className="grid-item">
              <UpcomingAppointments />
            </div>
            <div className="grid-item">
              <DailyHealthOverview />
            </div>

            {/* Middle Row - Two Columns */}
            <div className="grid-item">
              <BabyHealthUpdate />
            </div>
            <div className="grid-item">
              <DietWellnessTips />
            </div>

            {/* Bottom Row - Full Width */}
            <div className="grid-item full-width">
              <CommunityPost />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
