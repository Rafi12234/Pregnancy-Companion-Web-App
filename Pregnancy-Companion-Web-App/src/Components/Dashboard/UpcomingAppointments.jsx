import React from 'react';
import { Calendar, Clock, MapPin, Bell } from 'lucide-react';
import './UpcomingAppointments.css';

const UpcomingAppointments = () => {
  const appointments = [
    {
      id: 1,
      type: 'Prenatal Checkup',
      doctor: 'Dr. Emily Johnson',
      date: '2025-08-25',
      time: '10:30 AM',
      location: 'Women\'s Health Center',
      urgent: false
    },
    {
      id: 2,
      type: 'Ultrasound Scan',
      doctor: 'Dr. Michael Brown',
      date: '2025-08-28',
      time: '2:00 PM',
      location: 'Imaging Center',
      urgent: true
    },
    {
      id: 3,
      type: 'Blood Test',
      doctor: 'Lab Technician',
      date: '2025-09-02',
      time: '9:00 AM',
      location: 'Medical Lab',
      urgent: false
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="appointments-card">
      <div className="card-header">
        <div className="header-left">
          <Calendar className="header-icon" size={24} />
          <div>
            <h3>Upcoming Appointments</h3>
            <p>{appointments.length} scheduled</p>
          </div>
        </div>
        <button className="reminder-btn">
          <Bell size={16} />
        </button>
      </div>

      <div className="appointments-list">
        {appointments.map((appointment, index) => (
          <div 
            key={appointment.id} 
            className={`appointment-item ${appointment.urgent ? 'urgent' : ''}`}
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <div className="appointment-date">
              <div className="date-badge">
                <span className="date-text">{formatDate(appointment.date)}</span>
                <span className="time-text">{appointment.time}</span>
              </div>
            </div>
            
            <div className="appointment-details">
              <div className="appointment-info">
                <h4>{appointment.type}</h4>
                <p className="doctor-name">with {appointment.doctor}</p>
                <div className="location-info">
                  <MapPin size={14} />
                  <span>{appointment.location}</span>
                </div>
              </div>
              
              {appointment.urgent && (
                <div className="urgent-badge">
                  <span>Important</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card-footer">
        <button className="view-all-btn">
          View All Appointments
        </button>
      </div>
    </div>
  );
};

export default UpcomingAppointments;