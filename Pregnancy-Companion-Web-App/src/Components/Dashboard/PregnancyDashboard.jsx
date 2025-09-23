import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ added
import { Heart, Baby, TrendingUp, Users, Apple, Plus, Save, Activity, Weight } from 'lucide-react';
import { LineChart as RLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import './PregnancyDashboard.css';
import NavBar from '../NavBar/NavBar';
import Sidebar from '../Sidebar/Sidebar';

// ===== API config =====
const API_BASE = import.meta?.env?.VITE_API_BASE || 'http://localhost:5000';
const DASHBOARD_URL = `${API_BASE}/api/dashboard/data`;
const RESET_URL = `${API_BASE}/api/dashboard/reset`;

// ===== helpers =====
const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: 'Bearer ' + token } : {};
};

const getUserId = () => localStorage.getItem('userId') || 'guest';

const localKey = (uid) => `dashboard:${uid}`;

const todayISO = () => new Date().toISOString().split('T')[0];

// ✅ One flag to ensure NO browser history is kept
const DISABLE_LOCAL_CACHE = true;

const PregnancyDashboard = () => {
  const navigate = useNavigate(); // ✅ added

  // ✅ Auth guard + prevent “Back” while logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    const blockBack = () => {
      if (localStorage.getItem('token')) window.history.forward();
    };
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', blockBack);
    return () => window.removeEventListener('popstate', blockBack);
  }, [navigate]);

  // profile (UI only)
  const [currentWeek, setCurrentWeek] = useState(24);
  const [babyName, setBabyName] = useState('Little Angel');
  const [motherName, setMotherName] = useState('Mom');

  // ui state
  const [showInputModal, setShowInputModal] = useState(false);
  const [activeInput, setActiveInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // server-backed state
  const [healthData, setHealthData] = useState({
    weight: [],
    bloodPressure: [],
    heartRate: []
  });

  const [babyData, setBabyData] = useState({
    weight: [],
    kicks: [],
    movement: []
  });

  // demo community
  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, user: 'Sarah M.', content: 'Just felt the baby kick for the first time! Such an amazing feeling 💕', likes: 24, time: '2h ago' },
    { id: 2, user: 'Emma L.', content: 'Any tips for dealing with morning sickness in the second trimester?', likes: 12, time: '4h ago' }
  ]);
  const [newPost, setNewPost] = useState('');

  // modal inputs
  const [dailyInputs, setDailyInputs] = useState({
    weight: '',
    bloodPressureSys: '',
    bloodPressureDia: '',
    heartRate: '',
    babyWeight: '',
    kicksCount: '',
    movementLevel: 'normal',
  });

  // ===== Load precedence: localStorage (instant) -> backend (authoritative) =====
  useEffect(() => {
    const uid = getUserId();

    // 1) (Disabled) show local cache to avoid blank UI on refresh
    if (!DISABLE_LOCAL_CACHE) {
      const cached = localStorage.getItem(localKey(uid));
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed?.healthData) setHealthData(parsed.healthData);
          if (parsed?.babyData) setBabyData(parsed.babyData);
        } catch {}
      }
    }

    // 2) fetch from backend (source of truth)
    let mounted = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(DASHBOARD_URL, { headers: { ...authHeader() } });
        if (!res.ok) {
          if (res.status === 401) setError('Please log in to load your dashboard.');
          else setError(`Failed to load data (${res.status}).`);
          return;
        }
        const { data } = await res.json();
        const server = data || {};
        if (mounted) {
          const h = server.healthData || { weight: [], bloodPressure: [], heartRate: [] };
          const b = server.babyData || { weight: [], kicks: [], movement: [] };
          setHealthData(h);
          setBabyData(b);
          // sync to localStorage for instant UI on next refresh (disabled)
          if (!DISABLE_LOCAL_CACHE) {
            localStorage.setItem(localKey(uid), JSON.stringify({ healthData: h, babyData: b }));
          }
        }
      } catch (e) {
        console.error('[LOAD] network error', e);
        if (mounted) setError('Network error while loading data.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // ===== Persist to backend + localStorage =====
  const persistDashboard = async (nextHealth, nextBaby) => {
    const uid = getUserId();
    // write-through cache: update local immediately (disabled)
    if (!DISABLE_LOCAL_CACHE) {
      localStorage.setItem(localKey(uid), JSON.stringify({ healthData: nextHealth, babyData: nextBaby }));
    }

    setSaving(true);
    setError('');
    try {
      const res = await fetch(DASHBOARD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ dashboard: { healthData: nextHealth, babyData: nextBaby } })
      });
      if (!res.ok) {
        setError(res.status === 401 ? 'Please log in to save.' : `Failed to save (${res.status}).`);
        return;
      }

      // Optional: re-fetch once to confirm DB state (guard against accidental divergence)
      const confirm = await fetch(DASHBOARD_URL, { headers: { ...authHeader() } });
      if (confirm.ok) {
        const { data } = await confirm.json();
        const h = data?.healthData || nextHealth;
        const b = data?.babyData || nextBaby;
        setHealthData(h);
        setBabyData(b);
        if (!DISABLE_LOCAL_CACHE) {
          localStorage.setItem(localKey(uid), JSON.stringify({ healthData: h, babyData: b }));
        }
      }
    } catch (e) {
      console.error('[SAVE] network error', e);
      setError('Network error while saving.');
    } finally {
      setSaving(false);
    }
  };

  const resetAllData = async () => {
    const uid = getUserId();
    setSaving(true);
    setError('');
    try {
      const res = await fetch(RESET_URL, { method: 'POST', headers: { ...authHeader() } });
      if (!res.ok) {
        setError(`Failed to reset (${res.status}).`);
        return;
      }
      const clearedH = { weight: [], bloodPressure: [], heartRate: [] };
      const clearedB = { weight: [], kicks: [], movement: [] };
      setHealthData(clearedH);
      setBabyData(clearedB);
      if (!DISABLE_LOCAL_CACHE) {
        localStorage.setItem(localKey(uid), JSON.stringify({ healthData: clearedH, babyData: clearedB }));
      }
    } catch (e) {
      console.error('[RESET] network error', e);
      setError('Network error while resetting.');
    } finally {
      setSaving(false);
    }
  };

  // ===== Frequency guards (UX only) =====
  const canUpdateWeight = useMemo(() => {
    const last = healthData.weight.at(-1);
    if (!last?.date) return true;
    const days = Math.floor((new Date(todayISO()) - new Date(last.date)) / (1000 * 60 * 60 * 24));
    return days >= 7;
  }, [healthData.weight]);

  const canUpdateVitals = useMemo(() => {
    const today = todayISO();
    const lastBP = healthData.bloodPressure.at(-1);
    const lastHR = healthData.heartRate.at(-1);
    return lastBP?.date !== today && lastHR?.date !== today;
  }, [healthData.bloodPressure, healthData.heartRate]);

  const canUpdateBabyData = useMemo(() => {
    const today = todayISO();
    const lastKick = babyData.kicks.at(-1);
    const lastMove = babyData.movement.at(-1);
    return lastKick?.date !== today && lastMove?.date !== today;
  }, [babyData.kicks, babyData.movement]);

  // ===== Submit handlers =====
  const handleInputSubmit = async (type) => {
    const today = todayISO();

    if (type === 'weight' && dailyInputs.weight && canUpdateWeight) {
      const nextH = {
        ...healthData,
        weight: [...(healthData.weight || []), { week: currentWeek, value: parseFloat(dailyInputs.weight), date: today }],
      };
      setHealthData(nextH);
      setDailyInputs(p => ({ ...p, weight: '' }));
      await persistDashboard(nextH, babyData);
    }

    if (type === 'vitals' && dailyInputs.bloodPressureSys && dailyInputs.bloodPressureDia && dailyInputs.heartRate && canUpdateVitals) {
      const nextH = {
        ...healthData,
        bloodPressure: [...(healthData.bloodPressure || []), {
          date: today,
          systolic: parseInt(dailyInputs.bloodPressureSys, 10),
          diastolic: parseInt(dailyInputs.bloodPressureDia, 10)
        }],
        heartRate: [...(healthData.heartRate || []), {
          date: today,
          rate: parseInt(dailyInputs.heartRate, 10)
        }]
      };
      setHealthData(nextH);
      setDailyInputs(p => ({ ...p, bloodPressureSys: '', bloodPressureDia: '', heartRate: '' }));
      await persistDashboard(nextH, babyData);
    }

    if (type === 'baby' && canUpdateBabyData) {
      let nextB = { ...babyData };
      if (dailyInputs.babyWeight) {
        nextB = { ...nextB, weight: [...(nextB.weight || []), { week: currentWeek, value: parseInt(dailyInputs.babyWeight, 10) }] };
      }
      if (dailyInputs.kicksCount) {
        nextB = { ...nextB, kicks: [...(nextB.kicks || []), { date: today, count: parseInt(dailyInputs.kicksCount, 10) }] };
      }
      nextB = { ...nextB, movement: [...(nextB.movement || []), { date: today, level: dailyInputs.movementLevel }] };

      setBabyData(nextB);
      setDailyInputs(p => ({ ...p, babyWeight: '', kicksCount: '', movementLevel: 'normal' }));
      await persistDashboard(healthData, nextB);
    }

    setShowInputModal(false);
  };

  // ===== Modal =====
  const InputModal = () => {
    if (!showInputModal) return null;

    const title =
      activeInput === 'weight' ? 'Update Weight' :
      activeInput === 'vitals' ? 'Update Daily Vitals' :
      activeInput === 'baby' ? 'Update Baby Information' : 'Update';

    const canSubmit =
      (activeInput === 'weight' && canUpdateWeight) ||
      (activeInput === 'vitals' && canUpdateVitals) ||
      (activeInput === 'baby' && canUpdateBabyData);

    const restriction =
      activeInput === 'weight' && !canUpdateWeight ? 'Weight can only be updated once per week' :
      activeInput === 'vitals' && !canUpdateVitals ? 'Vitals can only be updated once per day' :
      activeInput === 'baby' && !canUpdateBabyData ? 'Baby data can only be updated once per day' :
      '';

    return (
      <div className="modal-overlay" onClick={() => setShowInputModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3 className="modal-title">{title}</h3>

          {restriction && <div className="restriction-message">{restriction}</div>}

          {activeInput === 'weight' && (
            <div className="input-group">
              <label>Current Weight (kg)</label>
              <input
                type="number"
                value={dailyInputs.weight}
                onChange={(e) => setDailyInputs(p => ({ ...p, weight: e.target.value }))}
                placeholder="Enter your current weight"
              />
            </div>
          )}

          {activeInput === 'vitals' && (
            <>
              <div className="input-group">
                <label>Blood Pressure (Systolic)</label>
                <input
                  type="number"
                  value={dailyInputs.bloodPressureSys}
                  onChange={(e) => setDailyInputs(p => ({ ...p, bloodPressureSys: e.target.value }))}
                  placeholder="e.g., 120"
                />
              </div>
              <div className="input-group">
                <label>Blood Pressure (Diastolic)</label>
                <input
                  type="number"
                  value={dailyInputs.bloodPressureDia}
                  onChange={(e) => setDailyInputs(p => ({ ...p, bloodPressureDia: e.target.value }))}
                  placeholder="e.g., 80"
                />
              </div>
              <div className="input-group">
                <label>Heart Rate (BPM)</label>
                <input
                  type="number"
                  value={dailyInputs.heartRate}
                  onChange={(e) => setDailyInputs(p => ({ ...p, heartRate: e.target.value }))}
                  placeholder="e.g., 75"
                />
              </div>
            </>
          )}

          {activeInput === 'baby' && (
            <>
              <div className="input-group">
                <label>Baby Weight (grams) - Optional</label>
                <input
                  type="number"
                  value={dailyInputs.babyWeight}
                  onChange={(e) => setDailyInputs(p => ({ ...p, babyWeight: e.target.value }))}
                  placeholder="e.g., 600"
                />
                <small>Based on ultrasound measurements</small>
              </div>
              <div className="input-group">
                <label>Kicks Count Today</label>
                <input
                  type="number"
                  value={dailyInputs.kicksCount}
                  onChange={(e) => setDailyInputs(p => ({ ...p, kicksCount: e.target.value }))}
                  placeholder="e.g., 10"
                />
              </div>
              <div className="input-group">
                <label>Baby Movement Level</label>
                <select
                  value={dailyInputs.movementLevel}
                  onChange={(e) => setDailyInputs(p => ({ ...p, movementLevel: e.target.value }))}
                >
                  <option value="less than usual">Less than usual</option>
                  <option value="normal">Normal</option>
                  <option value="extra active">Extra active</option>
                </select>
              </div>
            </>
          )}

          <div className="modal-buttons">
            <button className="btn-secondary" onClick={() => setShowInputModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={() => handleInputSubmit(activeInput)} disabled={!canSubmit || saving}>
              <Save size={16} /> {saving ? 'Saving…' : 'Save Data'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const wellnessTips = [
    'Drink at least 8 glasses of water daily for proper hydration',
    'Take prenatal vitamins with folic acid as recommended by your doctor',
    'Get 7-9 hours of sleep and rest when you feel tired',
    'Eat small, frequent meals to help with nausea and maintain energy',
    'Practice gentle prenatal yoga or walking for 30 minutes daily'
  ];

  return (
    <div>
      <NavBar />
      <Sidebar />
      <div className="dashboard">
        <div className="dashboard-container">
          {/* Welcome */}
          <div className="card welcome-card">
            <div className="welcome-content">
              <div className="welcome-text">
                <h1 className="welcome-title">Welcome back, {motherName}! 👋</h1>
                <p className="welcome-subtitle">You're <strong>{currentWeek} weeks</strong> along with {babyName}</p>
                <div className="pregnancy-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(currentWeek / 40) * 100}%` }} />
                  </div>
                  <span className="progress-text">{Math.round((currentWeek / 40) * 100)}% Complete</span>
                </div>
              </div>
              <div className="welcome-actions">
                <button className="btn-secondary" onClick={resetAllData} disabled={saving}>Reset All Data</button>
              </div>
            </div>
            {loading && <div className="muted" style={{ marginTop: 8 }}>Loading your saved data…</div>}
            {error && <div className="error-banner">{error}</div>}
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><Heart size={24} /></div>
              <div className="stat-content">
                <h3>Latest Heart Rate</h3>
                <p className="stat-value">{healthData.heartRate.at(-1)?.rate ?? '—'} BPM</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><Weight size={24} /></div>
              <div className="stat-content">
                <h3>Current Weight</h3>
                <p className="stat-value">{healthData.weight.at(-1)?.value ?? '—'} kg</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><Activity size={24} /></div>
              <div className="stat-content">
                <h3>Blood Pressure</h3>
                <p className="stat-value">
                  {healthData.bloodPressure.at(-1)?.systolic ?? '—'}/{healthData.bloodPressure.at(-1)?.diastolic ?? '—'}
                </p>
              </div>
            </div>
            <div className="stat-card baby-stat">
              <div className="stat-icon"><Baby size={24} /></div>
              <div className="stat-content">
                <h3>Baby Weight</h3>
                <p className="stat-value">{babyData.weight.at(-1)?.value ?? '—'}g</p>
              </div>
            </div>
          </div>

          {/* Baby Health */}
          <div className="card baby-health-card">
            <div className="card-header">
              <h2><Baby size={24} />{babyName}'s Health</h2>
              <button
                className="btn-action baby-btn"
                onClick={() => { setActiveInput('baby'); setShowInputModal(true); }}
                disabled={!canUpdateBabyData}
                title={!canUpdateBabyData ? 'Baby data can only be updated once per day' : 'Add today’s baby updates'}
              >
                <Plus size={16} /> Update Baby Info
              </button>
            </div>

            <div className="baby-stats-grid">
              <div className="baby-stat-item">
                <div className="baby-stat-icon kicks-icon"><Activity size={20} /></div>
                <div className="baby-stat-content">
                  <h4>Today's Kicks</h4>
                  <span className="baby-stat-value">{babyData.kicks.at(-1)?.count ?? 0}</span>
                </div>
              </div>
              <div className="baby-stat-item">
                <div className="baby-stat-icon movement-icon"><TrendingUp size={20} /></div>
                <div className="baby-stat-content">
                  <h4>Movement Level</h4>
                  <span className={`movement-badge ${(babyData.movement.at(-1)?.level || 'normal').replace(' ', '-')}`}>
                    {babyData.movement.at(-1)?.level || 'normal'}
                  </span>
                </div>
              </div>
              <div className="baby-stat-item">
                <div className="baby-stat-icon weight-icon"><Weight size={20} /></div>
                <div className="baby-stat-content">
                  <h4>Estimated Weight</h4>
                  <span className="baby-stat-value">{babyData.weight.at(-1)?.value ?? '—'}g</span>
                </div>
              </div>
            </div>

            <div className="baby-charts-grid">
              <div className="chart-container">
                <h3>Baby Weight Progress</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RLineChart data={babyData.weight}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#ffd93d" strokeWidth={3} dot={{ fill: '#ffd93d', strokeWidth: 2, r: 6 }} />
                  </RLineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h3>Daily Kicks Count</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={babyData.kicks}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6bcf7f" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="movement-timeline">
              <h3>Recent Movement Activity</h3>
              <div className="timeline">
                {babyData.movement.slice(-7).reverse().map((movement, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-date">{new Date(movement.date).toLocaleDateString()}</div>
                    <div className={`timeline-badge ${movement.level.replace(' ', '-')}`}>{movement.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Health Overview */}
          <div className="card health-overview">
            <div className="card-header">
              <h2>Health Overview</h2>
              <div className="header-actions">
                <button
                  className="btn-action"
                  onClick={() => { setActiveInput('weight'); setShowInputModal(true); }}
                  disabled={!canUpdateWeight}
                  title={!canUpdateWeight ? 'Weight can only be updated once per week' : 'Add weekly weight'}
                >
                  <Plus size={16} /> Add Weight
                </button>
                <button
                  className="btn-action"
                  onClick={() => { setActiveInput('vitals'); setShowInputModal(true); }}
                  disabled={!canUpdateVitals}
                  title={!canUpdateVitals ? 'Vitals can only be updated once per day' : 'Add daily BP/HR'}
                >
                  <Plus size={16} /> Add Vitals
                </button>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-container">
                <h3>Weight Progress</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RLineChart data={healthData.weight}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#ff6b9d" strokeWidth={3} dot={{ fill: '#ff6b9d', strokeWidth: 2, r: 6 }} />
                  </RLineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h3>Heart Rate Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={healthData.heartRate}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#4ecdc4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="card community-card">
            <div className="card-header">
              <h2><Users size={24} /> Community Updates</h2>
            </div>
            <div className="community-input">
              <input
                type="text"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your pregnancy journey..."
                className="post-input"
              />
              <button
                onClick={() => {
                  if (newPost.trim()) {
                    setCommunityPosts(prev => [{ id: Date.now(), user: motherName, content: newPost, likes: 0, time: 'now' }, ...prev]);
                    setNewPost('');
                  }
                }}
                className="btn-primary"
              >
                <Plus size={16} /> Post
              </button>
            </div>
            <div className="community-posts">
              {communityPosts.map(post => (
                <div key={post.id} className="community-post">
                  <div className="post-header">
                    <strong>{post.user}</strong>
                    <span className="post-time">{post.time}</span>
                  </div>
                  <p>{post.content}</p>
                  <div className="post-actions">
                    <button className="like-btn"><Heart size={16} /> {post.likes}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        <InputModal />
      </div>
    </div>
  );
};

export default PregnancyDashboard;
