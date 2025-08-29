import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Heart, TrendingUp, Plus, Calendar, Download, Bell } from 'lucide-react';
import './DailyHealthOverview.css';

const DailyHealthOverview = () => {
  const [activeMetric, setActiveMetric] = useState('weight');
  const [showInputForm, setShowInputForm] = useState(false);
  const [healthData, setHealthData] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    systolic: '',
    diastolic: '',
    heartRate: ''
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('healthData');
    if (savedData) {
      setHealthData(JSON.parse(savedData));
    } else {
      // Initialize with some sample data if none exists
      const sampleData = [
        { date: '2023-10-01', weight: 68.2, systolic: 118, diastolic: 75, heartRate: 75 },
        { date: '2023-10-03', weight: 68.4, systolic: 120, diastolic: 78, heartRate: 78 },
        { date: '2023-10-05', weight: 68.3, systolic: 115, diastolic: 72, heartRate: 72 },
        { date: '2023-10-07', weight: 68.5, systolic: 122, diastolic: 80, heartRate: 76 },
        { date: '2023-10-09', weight: 68.7, systolic: 119, diastolic: 77, heartRate: 74 },
        { date: '2023-10-11', weight: 68.6, systolic: 117, diastolic: 76, heartRate: 73 },
        { date: '2023-10-13', weight: 68.8, systolic: 121, diastolic: 78, heartRate: 77 }
      ];
      setHealthData(sampleData);
      localStorage.setItem('healthData', JSON.stringify(sampleData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (healthData.length > 0) {
      localStorage.setItem('healthData', JSON.stringify(healthData));
    }
  }, [healthData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({
      ...newEntry,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      ...newEntry,
      weight: parseFloat(newEntry.weight),
      systolic: parseInt(newEntry.systolic),
      diastolic: parseInt(newEntry.diastolic),
      heartRate: parseInt(newEntry.heartRate)
    };
    
    const updatedData = [...healthData, entry].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    setHealthData(updatedData);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      systolic: '',
      diastolic: '',
      heartRate: ''
    });
    setShowInputForm(false);
  };

  const getStatusColor = (type, value) => {
    if (type === 'bp') {
      if (value.systolic > 140 || value.diastolic > 90) return '#ef4444'; // High - red
      if (value.systolic < 90 || value.diastolic < 60) return '#f59e0b'; // Low - amber
      return '#10b981'; // Normal - green
    }
    
    if (type === 'hr') {
      if (value > 100) return '#ef4444'; // High - red
      if (value < 60) return '#f59e0b'; // Low - amber
      return '#10b981'; // Normal - green
    }
    
    return '#3b82f6'; // Default blue for weight
  };

  const getLatestReading = () => {
    if (healthData.length === 0) return null;
    const sortedData = [...healthData].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedData[0];
  };

  const latestReading = getLatestReading();

  return (
    <div className="health-overview-container">
      <div className="health-header">
        <div className="header-content">
          <Activity className="header-icon" size={32} />
          <div>
            <h1>Pregnancy Health Tracker</h1>
            <p>Monitor your health and baby's development</p>
          </div>
        </div>
        <button 
          className="primary-btn"
          onClick={() => setShowInputForm(true)}
        >
          <Plus size={18} />
          New Reading
        </button>
      </div>

      {latestReading && (
        <div className="current-stats">
          <h3>Latest Readings</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <Heart size={20} />
                <span>Blood Pressure</span>
              </div>
              <div 
                className="stat-value"
                style={{ color: getStatusColor('bp', latestReading) }}
              >
                {latestReading.systolic}/{latestReading.diastolic}
                <span className="unit">mmHg</span>
              </div>
              <div className="stat-date">
                {new Date(latestReading.date).toLocaleDateString()}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <Activity size={20} />
                <span>Heart Rate</span>
              </div>
              <div 
                className="stat-value"
                style={{ color: getStatusColor('hr', latestReading.heartRate) }}
              >
                {latestReading.heartRate}
                <span className="unit">bpm</span>
              </div>
              <div className="stat-date">
                {new Date(latestReading.date).toLocaleDateString()}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <TrendingUp size={20} />
                <span>Weight</span>
              </div>
              <div className="stat-value">
                {latestReading.weight}
                <span className="unit">kg</span>
              </div>
              <div className="stat-date">
                {new Date(latestReading.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="chart-section">
        <div className="chart-header">
          <h3>Health Trends</h3>
          <div className="chart-controls">
            <select 
              value={activeMetric} 
              onChange={(e) => setActiveMetric(e.target.value)}
              className="metric-selector"
            >
              <option value="weight">Weight</option>
              <option value="bp">Blood Pressure</option>
              <option value="hr">Heart Rate</option>
            </select>
            <button className="icon-btn">
              <Download size={18} />
            </button>
          </div>
        </div>

        <div className="chart-container">
          {activeMetric === 'weight' && (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={healthData}>
                <defs>
                  <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} kg`, "Weight"]}
                  labelFormatter={(date) => `Date: ${new Date(date).toLocaleDateString()}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#8b5cf6" 
                  fill="url(#weightGradient)" 
                  strokeWidth={3}
                  activeDot={{ r: 6, fill: '#8b5cf6' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {activeMetric === 'bp' && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'systolic') return [value, 'Systolic'];
                    if (name === 'diastolic') return [value, 'Diastolic'];
                    return [value, name];
                  }}
                  labelFormatter={(date) => `Date: ${new Date(date).toLocaleDateString()}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  activeDot={{ r: 6, fill: '#ef4444' }}
                  name="Systolic"
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  activeDot={{ r: 6, fill: '#3b82f6' }}
                  name="Diastolic"
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {activeMetric === 'hr' && (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={healthData}>
                <defs>
                  <linearGradient id="hrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} bpm`, "Heart Rate"]}
                  labelFormatter={(date) => `Date: ${new Date(date).toLocaleDateString()}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="heartRate" 
                  stroke="#10b981" 
                  fill="url(#hrGradient)" 
                  strokeWidth={3}
                  activeDot={{ r: 6, fill: '#10b981' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {showInputForm && (
        <div className="modal-overlay">
          <div className="input-modal">
            <div className="modal-header">
              <h3>Add Health Reading</h3>
              <button 
                className="close-btn"
                onClick={() => setShowInputForm(false)}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="health-form">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={newEntry.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={newEntry.weight}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  placeholder="Enter your weight"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Systolic BP</label>
                  <input
                    type="number"
                    name="systolic"
                    value={newEntry.systolic}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="Systolic"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Diastolic BP</label>
                  <input
                    type="number"
                    name="diastolic"
                    value={newEntry.diastolic}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="Diastolic"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Heart Rate (bpm)</label>
                <input
                  type="number"
                  name="heartRate"
                  value={newEntry.heartRate}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="Enter heart rate"
                  required
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowInputForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="primary-btn"
                >
                  Save Reading
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyHealthOverview;