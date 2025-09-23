import React, { useState, useEffect } from 'react';
import { Clock, Plus, Search, CheckCircle, XCircle, Edit3, Trash2, FileText, List, BarChart3, Heart, Baby } from 'lucide-react';
import './Appointment.css';
import NavBar from '../NavBar/NavBar';
import Sidebar from '../Sidebar/Sidebar';

// ✅ ADDED: API helpers
const API_BASE = import.meta?.env?.VITE_API_BASE || 'http://localhost:5000';
const APPT_URL = `${API_BASE}/api/appointments`;
const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
};

const Appointment = () => {
  const [activeView, setActiveView] = useState('list');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showReschedule, setShowReschedule] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ✅ CHANGED: start empty; we’ll load from backend
  const [appointments, setAppointments] = useState([]);

  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: '',
    time: '',
    type: 'prenatal',
    notes: '',
    checklist: []
  });

  const appointmentTypes = [
    { value: 'prenatal', label: 'Prenatal Care', color: '#ec4899', icon: Heart },
    { value: 'baby', label: 'Baby Care', color: '#06b6d4', icon: Baby },
    { value: 'wellness', label: 'Wellness', color: '#8b5cf6', icon: Heart }
  ];

  const commonSuggestions = [
    "Prenatal Checkup",
    "Ultrasound Appointment", 
    "Baby Vaccination",
    "Maternity Class",
    "Lactation Consultation",
    "Prenatal Yoga",
    "Pediatric Visit",
    "Postpartum Checkup"
  ];

  // ✅ ADDED: load from backend
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(APPT_URL, { headers: authHeader() });
        if (!res.ok) return; // optionally show toast
        const json = await res.json();
        const rows = (json?.data || []).map(d => ({ ...d, id: d._id })); // normalize id
        setAppointments(rows);
      } catch (e) {
        console.error('Failed to load appointments', e);
      }
    })();
  }, []);

  // ✅ MODIFIED: also POST to backend
  const handleQuickAdd = async () => {
    if (newAppointment.title && newAppointment.date && newAppointment.time) {
      const payload = {
        title: newAppointment.title,
        date: newAppointment.date,
        time: newAppointment.time,
        type: newAppointment.type || 'prenatal',
        notes: newAppointment.notes || '',
        checklist: (newAppointment.checklist || []).filter(item => (item || '').trim() !== '')
      };

      try {
        const res = await fetch(APPT_URL, {
          method: 'POST',
          headers: authHeader(),
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          alert('Failed to save appointment');
          return;
        }
        const { data } = await res.json();
        const created = { ...data, id: data._id };
        setAppointments(prev => [...prev, created]);
      } catch (e) {
        console.error('Create failed', e);
        alert('Network error creating appointment');
      }

      setNewAppointment({
        title: '',
        date: '',
        time: '',
        type: 'prenatal',
        notes: '',
        checklist: []
      });
      setShowQuickAdd(false);
    }
  };

  // ✅ MODIFIED: PUT to backend
  const handleReschedule = async (id, newDate, newTime) => {
    try {
      const res = await fetch(`${APPT_URL}/${id}`, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({ date: newDate, time: newTime })
      });
      if (!res.ok) {
        alert('Failed to reschedule');
        return;
      }
      const { data } = await res.json();
      setAppointments(apts => apts.map(a => (a.id === id ? { ...a, ...data, id: data._id } : a)));
      setShowReschedule(null);
    } catch (e) {
      console.error('Reschedule failed', e);
      alert('Network error');
    }
  };

  // ✅ MODIFIED: DELETE in backend
  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      const res = await fetch(`${APPT_URL}/${id}`, {
        method: 'DELETE',
        headers: authHeader()
      });
      if (!res.ok) {
        alert('Failed to delete');
        return;
      }
      setAppointments(apts => apts.filter(a => a.id !== id));
    } catch (e) {
      console.error('Delete failed', e);
      alert('Network error');
    }
  };

  // ✅ MODIFIED: PATCH toggle in backend
  const toggleComplete = async (id) => {
    try {
      const res = await fetch(`${APPT_URL}/${id}/toggle`, {
        method: 'PATCH',
        headers: authHeader()
      });
      if (!res.ok) {
        alert('Failed to update');
        return;
      }
      const { data } = await res.json();
      setAppointments(apts => apts.map(a => (a.id === id ? { ...a, ...data, id: data._id } : a)));
    } catch (e) {
      console.error('Toggle failed', e);
      alert('Network error');
    }
  };

  const filteredAppointments = appointments
    .filter(apt => activeTab === 'upcoming' ? apt.status === 'upcoming' : apt.status === 'past')
    .filter(apt => (apt.title || '').toLowerCase().includes(searchTerm.toLowerCase()));

  const completedCount = appointments.filter(apt => apt.completed).length;
  const totalCount = appointments.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="appointment-container">
      <NavBar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="appointment-layout">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`appointment-main ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="appointment-content">
            <div className="appointment-header">
              <div className="header-content">
                <div className="title-with-icon">
                  <Heart className="header-icon" size={32} />
                  <div>
                    <h1 className="page-title">Care Schedule</h1>
                    <p className="page-subtitle">Your journey of care, beautifully organized</p>
                  </div>
                </div>
              </div>
              <button 
                className="quick-add-btn"
                onClick={() => setShowQuickAdd(true)}
              >
                <Plus size={20} />
                Quick Add
              </button>
            </div>

            <div className="view-toggles">
              <div className="view-toggle-group">
                <button 
                  className={`toggle-btn ${activeView === 'list' ? 'active' : ''}`}
                  onClick={() => setActiveView('list')}
                >
                  <List size={18} />
                  Appointments
                </button>
                <button 
                  className={`toggle-btn ${activeView === 'progress' ? 'active' : ''}`}
                  onClick={() => setActiveView('progress')}
                >
                  <BarChart3 size={18} />
                  Progress
                </button>
              </div>
            </div>

            {activeView === 'list' && (
              <div className="list-section">
                <div className="list-controls">
                  <div className="search-filter">
                    <div className="search-box">
                      <Search size={18} className="search-icon" />
                      <input
                        type="text"
                        placeholder="Search appointments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="tab-toggles">
                    <button 
                      className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                      onClick={() => setActiveTab('upcoming')}
                    >
                      Upcoming
                    </button>
                    <button 
                      className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
                      onClick={() => setActiveTab('past')}
                    >
                      Past
                    </button>
                  </div>
                </div>

                <div className="appointments-list">
                  {filteredAppointments.map(appointment => (
                    <div key={appointment.id} className={`appointment-card ${appointment.type}`}>
                      <div className="card-header">
                        <div className="appointment-info">
                          <h3 className="appointment-title">{appointment.title}</h3>
                          <div className="appointment-meta">
                            <span className="date-time">
                              <Clock size={14} />
                              {appointment.date} at {appointment.time}
                            </span>
                            <span className={`type-badge ${appointment.type}`}>
                              {(() => {
                                const typeInfo = appointmentTypes.find(t => t.value === appointment.type);
                                const IconComponent = typeInfo?.icon;
                                return (
                                  <>
                                    {IconComponent && <IconComponent size={12} />}
                                    {typeInfo?.label}
                                  </>
                                );
                              })()}
                            </span>
                          </div>
                        </div>
                        <div className="card-actions">
                          <button 
                            className={`complete-btn ${appointment.completed ? 'completed' : ''}`}
                            onClick={() => toggleComplete(appointment.id)}
                          >
                            <CheckCircle size={18} />
                          </button>
                          {appointment.status === 'upcoming' && (
                            <>
                              <button 
                                className="reschedule-btn"
                                onClick={() => setShowReschedule(appointment.id)}
                              >
                                <Edit3 size={16} />
                              </button>
                              <button 
                                className="cancel-btn"
                                onClick={() => handleCancel(appointment.id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="appointment-notes">
                          <FileText size={14} />
                          <span>{appointment.notes}</span>
                        </div>
                      )}

                      {appointment.checklist?.length > 0 && (
                        <div className="appointment-checklist">
                          <h4>Checklist:</h4>
                          <ul>
                            {appointment.checklist.map((item, index) => (
                              <li key={index}>
                                <CheckCircle size={12} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Simple inline rescheduler (optional minimal UI) */}
                      {showReschedule === appointment.id && (
                        <div className="reschedule-inline">
                          <div className="form-row">
                            <input
                              type="date"
                              defaultValue={appointment.date}
                              onChange={(e) => (appointment.__newDate = e.target.value)}
                            />
                            <input
                              type="time"
                              defaultValue={appointment.time}
                              onChange={(e) => (appointment.__newTime = e.target.value)}
                            />
                          </div>
                          <div className="reschedule-actions">
                            <button
                              className="save-btn"
                              onClick={() => handleReschedule(
                                appointment.id,
                                appointment.__newDate || appointment.date,
                                appointment.__newTime || appointment.time
                              )}
                            >
                              Save
                            </button>
                            <button className="cancel-modal-btn" onClick={() => setShowReschedule(null)}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'progress' && (
              <div className="progress-section">
                <div className="progress-stats">
                  <div className="stat-card">
                    <h3>Total Appointments</h3>
                    <span className="stat-number">{totalCount}</span>
                  </div>
                  <div className="stat-card">
                    <h3>Completed</h3>
                    <span className="stat-number completed">{completedCount}</span>
                  </div>
                  <div className="stat-card">
                    <h3>Upcoming</h3>
                    <span className="stat-number upcoming">{appointments.filter(a => a.status === 'upcoming').length}</span>
                  </div>
                </div>
                <div className="progress-tracker">
                  <h3>Overall Progress</h3>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{Math.round(progressPercentage)}% Complete</span>
                </div>
              </div>
            )}

            {showQuickAdd && (
              <div className="modal-overlay">
                <div className="quick-add-modal">
                  <div className="modal-header">
                    <div className="modal-title-section">
                      <Heart className="modal-icon" size={24} />
                      <h2>Schedule New Care</h2>
                    </div>
                    <button 
                      className="close-btn"
                      onClick={() => setShowQuickAdd(false)}
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                  
                  <div className="modal-content">
                    <div className="suggestions">
                      <label>Popular Care Options:</label>
                      <div className="suggestion-chips">
                        {commonSuggestions.map(suggestion => (
                          <button 
                            key={suggestion}
                            className="suggestion-chip"
                            onClick={() => setNewAppointment({...newAppointment, title: suggestion})}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={newAppointment.title}
                        onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                        placeholder="Enter appointment title"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Date</label>
                        <input
                          type="date"
                          value={newAppointment.date}
                          onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Time</label>
                        <input
                          type="time"
                          value={newAppointment.time}
                          onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Type</label>
                      <select
                        value={newAppointment.type}
                        onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                      >
                        {appointmentTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Notes</label>
                      <textarea
                        value={newAppointment.notes}
                        onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                        placeholder="Add personal notes..."
                        rows="3"
                      />
                    </div>

                    <div className="form-group">
                      <label>Checklist Items</label>
                      <div className="checklist-inputs">
                        {[0, 1, 2].map(index => (
                          <input
                            key={index}
                            type="text"
                            placeholder={`Checklist item ${index + 1}`}
                            value={newAppointment.checklist[index] || ''}
                            onChange={(e) => {
                              const newChecklist = [...(newAppointment.checklist || [])];
                              newChecklist[index] = e.target.value;
                              setNewAppointment({...newAppointment, checklist: newChecklist});
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button 
                      className="cancel-modal-btn"
                      onClick={() => setShowQuickAdd(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="save-btn"
                      onClick={handleQuickAdd}
                    >
                      <Heart size={18} />
                      Save Care Schedule
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
