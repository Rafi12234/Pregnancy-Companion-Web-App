import React, { useState } from 'react';
import { Baby, Ruler, Weight, Eye, Brain, Zap, TrendingUp, Calendar, Camera, Activity } from 'lucide-react';

const BabyHealthUpdate = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const babyData = {
    week: 28,
    trimester: 3,
    dueDate: '2024-12-15',
    size: {
      length: '37.6 cm',
      weight: '1.1 kg',
      comparison: 'Corn',
      percentile: '65th'
    },
    development: [
      { 
        icon: Eye, 
        text: 'Eyes opening and closing', 
        progress: 95,
        detail: 'Can distinguish between light and dark'
      },
      { 
        icon: Brain, 
        text: 'Rapid brain development', 
        progress: 85,
        detail: 'Forming complex neural connections'
      },
      { 
        icon: Zap,    
        text: 'Responding to sounds', 
        progress: 90,
        detail: 'Can hear voices and music clearly'
      }
    ],
    milestones: [
      {
        title: 'Sensory Development',
        description: 'Baby can now see light filtering through your belly',
        completed: true
      },
      {
        title: 'Sleep Patterns',
        description: 'Developing distinct sleep and wake cycles',
        completed: true
      },
      {
        title: 'Physical Growth',
        description: 'Growing fingernails and toenails',
        completed: false
      },
      {
        title: 'Fat Development',
        description: 'Building essential fat stores for temperature regulation',
        completed: false
      }
    ],
    vitals: {
      heartRate: '140-150 bpm',
      movement: 'Active',
      position: 'Head down'
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'development', label: 'Development', icon: Brain },
    { id: 'milestones', label: 'Milestones', icon: Zap }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        borderRadius: '20px',
        padding: '30px',
        color: 'white',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              borderRadius: '12px', 
              padding: '12px' 
            }}>
              <Baby size={32} />
            </div>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Baby's Journey</h1>
              <p style={{ margin: 0, opacity: 0.9 }}>Third Trimester • Week {babyData.week}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '20px',
              padding: '8px 16px',
              marginBottom: '5px'
            }}>
              {babyData.week} Weeks
            </div>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Due: {babyData.dueDate}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Pregnancy Progress</span>
            <span>{Math.round((babyData.week / 40) * 100)}% Complete</span>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '10px',
            height: '8px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              backgroundColor: 'white',
              height: '100%',
              width: `${(babyData.week / 40) * 100}%`,
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <Ruler size={24} style={{ marginBottom: '10px' }} />
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px 0' }}>{babyData.size.length}</p>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.8 }}>Length</p>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <Weight size={24} style={{ marginBottom: '10px' }} />
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px 0' }}>{babyData.size.weight}</p>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.8 }}>Weight</p>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <Activity size={24} style={{ marginBottom: '10px' }} />
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px 0' }}>{babyData.vitals.movement}</p>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.8 }}>Movement</p>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Tab Navigation */}
        <div style={{ 
          borderBottom: '1px solid #f0f0f0',
          padding: '0 20px'
        }}>
          <div style={{ display: 'flex', gap: '0' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '15px 20px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: activeTab === tab.id ? '#667eea' : '#666',
                  borderBottom: activeTab === tab.id ? '2px solid #667eea' : 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: activeTab === tab.id ? '600' : '400'
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ padding: '30px' }}>
          {activeTab === 'overview' && (
            <div>
              {/* Size Comparison */}
              <div style={{ 
                textAlign: 'center',
                backgroundColor: '#f8f9ff',
                borderRadius: '15px',
                padding: '30px',
                marginBottom: '30px'
              }}>
                <div style={{ fontSize: '60px', marginBottom: '15px' }}>🌽</div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                  Size of a {babyData.size.comparison}
                </h3>
                <p style={{ color: '#666', margin: 0 }}>
                  Your baby is growing beautifully and is in the {babyData.size.percentile} percentile
                </p>
              </div>

              {/* Vital Statistics */}
              <div>
                <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Current Vitals</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div style={{ 
                    backgroundColor: '#f8f9ff',
                    borderRadius: '10px',
                    padding: '20px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>Heart Rate</p>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#333' }}>
                      {babyData.vitals.heartRate}
                    </p>
                  </div>
                  <div style={{ 
                    backgroundColor: '#f8f9ff',
                    borderRadius: '10px',
                    padding: '20px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>Activity Level</p>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#333' }}>
                      {babyData.vitals.movement}
                    </p>
                  </div>
                  <div style={{ 
                    backgroundColor: '#f8f9ff',
                    borderRadius: '10px',
                    padding: '20px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>Position</p>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#333' }}>
                      {babyData.vitals.position}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'development' && (
            <div>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Developmental Progress</h3>
                <p style={{ color: '#666', margin: 0 }}>Track your baby's key developmental milestones</p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {babyData.development.map((item, index) => (
                  <div key={index} style={{ 
                    border: '1px solid #f0f0f0',
                    borderRadius: '15px',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ 
                        backgroundColor: '#667eea',
                        borderRadius: '10px',
                        padding: '12px',
                        color: 'white'
                      }}>
                        <item.icon size={24} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                          <h4 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{item.text}</h4>
                          <span style={{ 
                            backgroundColor: '#667eea',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '15px',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}>
                            {item.progress}%
                          </span>
                        </div>
                        <p style={{ color: '#666', margin: '0 0 10px 0' }}>{item.detail}</p>
                      </div>
                    </div>
                    <div style={{ 
                      backgroundColor: '#f0f0f0',
                      borderRadius: '10px',
                      height: '6px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        backgroundColor: '#667eea',
                        height: '100%',
                        width: `${item.progress}%`,
                        borderRadius: '10px',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'milestones' && (
            <div>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Current Milestones</h3>
                <p style={{ color: '#666', margin: 0 }}>Important developments happening this week</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {babyData.milestones.map((milestone, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ 
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: milestone.completed ? '#4ade80' : '#e5e7eb',
                      marginTop: '6px',
                      flexShrink: 0
                    }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold',
                        margin: '0 0 8px 0',
                        color: milestone.completed ? '#333' : '#666'
                      }}>
                        {milestone.title}
                      </h4>
                      <p style={{ color: '#666', margin: 0, lineHeight: '1.5' }}>{milestone.description}</p>
                      {milestone.completed && (
                        <div style={{ 
                          display: 'inline-block',
                          backgroundColor: '#dcfce7',
                          color: '#166534',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          marginTop: '8px'
                        }}>
                          Complete
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'center' }}>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          padding: '12px 20px',
          cursor: 'pointer',
          fontWeight: '600'
        }}>
          <Activity size={18} />
          <span>Track Movement</span>
        </button>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'white',
          color: '#667eea',
          border: '2px solid #667eea',
          borderRadius: '10px',
          padding: '12px 20px',
          cursor: 'pointer',
          fontWeight: '600'
        }}>
          <Camera size={18} />
          <span>Add Photo</span>
        </button>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#f8f9ff',
          color: '#667eea',
          border: 'none',
          borderRadius: '10px',
          padding: '12px 20px',
          cursor: 'pointer',
          fontWeight: '600'
        }}>
          <Calendar size={18} />
          <span>Schedule Checkup</span>
        </button>
      </div>
    </div>
  );
};

export default BabyHealthUpdate;