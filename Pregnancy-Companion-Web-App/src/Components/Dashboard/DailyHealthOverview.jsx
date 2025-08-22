import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Activity, Heart, Thermometer, TrendingUp } from 'lucide-react';
import './DailyHealthOverview.css';

const DailyHealthOverview = () => {
  const weeklyData = [
    { day: 'Mon', weight: 68.2, bloodPressure: 118, heartRate: 75 },
    { day: 'Tue', weight: 68.4, bloodPressure: 120, heartRate: 78 },
    { day: 'Wed', weight: 68.3, bloodPressure: 115, heartRate: 72 },
    { day: 'Thu', weight: 68.5, bloodPressure: 122, heartRate: 76 },
    { day: 'Fri', weight: 68.7, bloodPressure: 119, heartRate: 74 },
    { day: 'Sat', weight: 68.6, bloodPressure: 117, heartRate: 73 },
    { day: 'Sun', weight: 68.8, bloodPressure: 121, heartRate: 77 }
  ];

  const todayStats = [
    {
      icon: Activity,
      title: 'Blood Pressure',
      value: '121/78',
      unit: 'mmHg',
      status: 'normal',
      change: '+2%'
    },
    {
      icon: Heart,
      title: 'Heart Rate',
      value: '77',
      unit: 'bpm',
      status: 'good',
      change: '+4%'
    },
    {
      icon: Thermometer,
      title: 'Weight',
      value: '68.8',
      unit: 'kg',
      status: 'normal',
      change: '+0.1kg'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#10b981';
      case 'normal': return '#667eea';
      case 'warning': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="health-overview-card">
      <div className="card-header">
        <div className="header-left">
          <Activity className="header-icon" size={24} />
          <div>
            <h3>Daily Health Overview</h3>
            <p>Your vitals tracking</p>
          </div>
        </div>
        <div className="trend-indicator">
          <TrendingUp size={16} />
          <span>Stable</span>
        </div>
      </div>

      <div className="stats-grid">
        {todayStats.map((stat, index) => (
          <div 
            key={stat.title} 
            className="stat-card"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <div className="stat-icon" style={{ color: getStatusColor(stat.status) }}>
              <stat.icon size={20} />
            </div>
            <div className="stat-content">
              <div className="stat-header">
                <span className="stat-title">{stat.title}</span>
                <span className="stat-change" style={{ color: getStatusColor(stat.status) }}>
                  {stat.change}
                </span>
              </div>
              <div className="stat-value">
                <span className="value">{stat.value}</span>
                <span className="unit">{stat.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-section">
        <div className="chart-header">
          <h4>Weekly Trends</h4>
          <select className="chart-selector">
            <option value="weight">Weight</option>
            <option value="bp">Blood Pressure</option>
            <option value="hr">Heart Rate</option>
          </select>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9ca3af' }}
              />
              <YAxis hide />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="#667eea"
                strokeWidth={3}
                fill="url(#healthGradient)"
                dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#667eea', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="health-tip">
        <div className="tip-icon">💡</div>
        <p>Your vitals are looking great! Keep up the healthy routine.</p>
      </div>
    </div>
  );
};

export default DailyHealthOverview;