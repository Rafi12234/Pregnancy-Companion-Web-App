import React, { useEffect, useState } from 'react';
import {
  User, Phone, Mail, MapPin, Calendar, Heart, Activity, Baby,
  FileText, PlusCircle, Trash2, Save, Edit3, Home, Hospital
} from 'lucide-react';
import './ProfilePage.css';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../NavBar/NavBar';


const API_BASE = import.meta?.env?.VITE_API_BASE || 'http://localhost:5000';

const emptyProfile = {
  mother: {
    fullName: '',
    dob: '',
    bloodGroup: '',
    heightCm: '',
    prePregnancyWeightKg: '',
    currentWeightKg: '',
    email: '',
    phone: '',
    occupation: '',
    medicalConditions: '',
    allergies: '',
  },
  address: {
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  },
  pregnancy: {
    doctorName: '',
    clinicName: '',
    lmp: '',
    edd: '',
    gravida: '',
    para: '',
    notes: '',
  },
  husband: {
    fullName: '',
    phone: '',
    email: '',
    occupation: '',
    bloodGroup: '',
  },
  emergencyContacts: [{ name: '', relation: '', phone: '', altPhone: '' }],
};

const ProfilePage = () => {
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [banner, setBanner] = useState({ type: '', text: '' });

  const headers = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {})
    };
  };

  // Load profile on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/profile`, { headers: headers() });
        const json = await res.json();
        if (mounted) setProfile({ ...emptyProfile, ...(json?.data || {}) });
      } catch (e) {
        setBanner({ type: 'error', text: 'Failed to load profile.' });
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setField = (path, value) => {
    setProfile(prev => {
      const clone = structuredClone(prev);
      const segs = path.split('.');
      let cur = clone;
      for (let i = 0; i < segs.length - 1; i++) cur = cur[segs[i]];
      cur[segs[segs.length - 1]] = value;
      return clone;
    });
  };

  const addEmergency = () => {
    setProfile(p => ({ ...p, emergencyContacts: [...p.emergencyContacts, { name: '', relation: '', phone: '', altPhone: '' }] }));
  };

  const removeEmergency = (idx) => {
    setProfile(p => {
      const arr = [...p.emergencyContacts];
      arr.splice(idx, 1);
      return { ...p, emergencyContacts: arr.length ? arr : [{ name: '', relation: '', phone: '', altPhone: '' }] };
    });
  };

  const setEmergencyField = (idx, key, value) => {
    setProfile(p => {
      const arr = [...p.emergencyContacts];
      arr[idx] = { ...arr[idx], [key]: value };
      return { ...p, emergencyContacts: arr };
    });
  };

  const saveProfile = async () => {
    setSaving(true);
    setBanner({ type: '', text: '' });
    try {
      const res = await fetch(`${API_BASE}/api/profile`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(profile)
      });
      const json = await res.json();
      if (!res.ok) {
        setBanner({ type: 'error', text: json?.message || 'Failed to save.' });
      } else {
        setProfile({ ...emptyProfile, ...(json?.data || {}) });
        setBanner({ type: 'success', text: 'Profile saved successfully.' });
      }
    } catch (e) {
      setBanner({ type: 'error', text: 'Network error while saving.' });
    } finally {
      setSaving(false);
      setTimeout(() => setBanner({ type: '', text: '' }), 2500);
    }
  };

  return (
    <div className='container'>
        <Sidebar />
        <Navbar />
        <div className="profile-page">
      <div className="profile-hero">
        <div className="hero-content">
          <h1><Heart size={22}/> Mother Profile</h1>
          <p>Keep your details up to date so your companion can support you better.</p>
        </div>
        <button className="save-btn" onClick={saveProfile} disabled={saving}>
          <Save size={18} /> {saving ? 'Saving…' : 'Save Profile'}
        </button>
      </div>

      {banner.text && (
        <div className={`banner ${banner.type}`}>{banner.text}</div>
      )}

      {loading ? (
        <div className="loader">Loading profile…</div>
      ) : (
        <div className="profile-grid">
          {/* Mother */}
          <section className="card fade-in">
            <header className="card-header">
              <User size={20} />
              <h2>Mother’s Information</h2>
            </header>
            <div className="card-body grid-2">
              <Field label="Full Name" icon={<User size={16}/>} value={profile.mother.fullName} onChange={v => setField('mother.fullName', v)} />
              <Field label="Date of Birth" type="date" icon={<Calendar size={16}/>} value={profile.mother.dob} onChange={v => setField('mother.dob', v)} />
              <Field label="Blood Group" placeholder="e.g., O+, A-" value={profile.mother.bloodGroup} onChange={v => setField('mother.bloodGroup', v)} />
              <Field label="Height (cm)" type="number" value={profile.mother.heightCm} onChange={v => setField('mother.heightCm', v)} />
              <Field label="Pre-pregnancy Weight (kg)" type="number" value={profile.mother.prePregnancyWeightKg} onChange={v => setField('mother.prePregnancyWeightKg', v)} />
              <Field label="Current Weight (kg)" type="number" value={profile.mother.currentWeightKg} onChange={v => setField('mother.currentWeightKg', v)} />
              <Field label="Email" type="email" icon={<Mail size={16}/>} value={profile.mother.email} onChange={v => setField('mother.email', v)} />
              <Field label="Phone" icon={<Phone size={16}/>} value={profile.mother.phone} onChange={v => setField('mother.phone', v)} />
              <Field label="Occupation" value={profile.mother.occupation} onChange={v => setField('mother.occupation', v)} />
              <Field label="Medical Conditions" textarea value={profile.mother.medicalConditions} onChange={v => setField('mother.medicalConditions', v)} />
              <Field label="Allergies" textarea value={profile.mother.allergies} onChange={v => setField('mother.allergies', v)} />
            </div>
          </section>

          {/* Address */}
          <section className="card fade-in delay-1">
            <header className="card-header">
              <Home size={20} />
              <h2>Address</h2>
            </header>
            <div className="card-body grid-2">
              <Field label="Street" icon={<MapPin size={16}/>} value={profile.address.street} onChange={v => setField('address.street', v)} />
              <Field label="City" value={profile.address.city} onChange={v => setField('address.city', v)} />
              <Field label="State" value={profile.address.state} onChange={v => setField('address.state', v)} />
              <Field label="Country" value={profile.address.country} onChange={v => setField('address.country', v)} />
              <Field label="Postal Code" value={profile.address.postalCode} onChange={v => setField('address.postalCode', v)} />
            </div>
          </section>

          {/* Pregnancy */}
          <section className="card fade-in delay-2">
            <header className="card-header">
              <Baby size={20} />
              <h2>Pregnancy Details</h2>
            </header>
            <div className="card-body grid-2">
              <Field label="Doctor Name" icon={<User size={16}/>} value={profile.pregnancy.doctorName} onChange={v => setField('pregnancy.doctorName', v)} />
              <Field label="Clinic/Hospital" icon={<Hospital size={16}/>} value={profile.pregnancy.clinicName} onChange={v => setField('pregnancy.clinicName', v)} />
              <Field label="LMP (Last Menstrual Period)" type="date" value={profile.pregnancy.lmp} onChange={v => setField('pregnancy.lmp', v)} />
              <Field label="EDD (Estimated Due Date)" type="date" value={profile.pregnancy.edd} onChange={v => setField('pregnancy.edd', v)} />
              <Field label="Gravida" value={profile.pregnancy.gravida} onChange={v => setField('pregnancy.gravida', v)} />
              <Field label="Para" value={profile.pregnancy.para} onChange={v => setField('pregnancy.para', v)} />
              <Field label="Notes" textarea value={profile.pregnancy.notes} onChange={v => setField('pregnancy.notes', v)} />
            </div>
          </section>

          {/* Husband */}
          <section className="card fade-in delay-3">
            <header className="card-header">
              <User size={20} />
              <h2>Husband’s Information</h2>
            </header>
            <div className="card-body grid-2">
              <Field label="Full Name" icon={<User size={16}/>} value={profile.husband.fullName} onChange={v => setField('husband.fullName', v)} />
              <Field label="Phone" icon={<Phone size={16}/>} value={profile.husband.phone} onChange={v => setField('husband.phone', v)} />
              <Field label="Email" type="email" icon={<Mail size={16}/>} value={profile.husband.email} onChange={v => setField('husband.email', v)} />
              <Field label="Occupation" value={profile.husband.occupation} onChange={v => setField('husband.occupation', v)} />
              <Field label="Blood Group" value={profile.husband.bloodGroup} onChange={v => setField('husband.bloodGroup', v)} />
            </div>
          </section>

          {/* Emergency Contacts */}
          <section className="card fade-in delay-4">
            <header className="card-header">
              <Activity size={20} />
              <h2>Emergency Contacts</h2>
              <button className="soft-btn" onClick={addEmergency}><PlusCircle size={16}/> Add</button>
            </header>

            <div className="card-body">
              {profile.emergencyContacts.map((c, idx) => (
                <div className="emg-row" key={idx}>
                  <div className="row-grid">
                    <Field label="Name" value={c.name} onChange={v => setEmergencyField(idx, 'name', v)} />
                    <Field label="Relation" value={c.relation} onChange={v => setEmergencyField(idx, 'relation', v)} />
                    <Field label="Phone" value={c.phone} onChange={v => setEmergencyField(idx, 'phone', v)} />
                    <Field label="Alt. Phone" value={c.altPhone} onChange={v => setEmergencyField(idx, 'altPhone', v)} />
                  </div>
                  <button className="icon-btn danger" onClick={() => removeEmergency(idx)} title="Remove">
                    <Trash2 size={16}/>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
    </div>
  );
};

export default ProfilePage;

/* ---------- Small field component ---------- */
function Field({ label, value, onChange, type = 'text', placeholder, textarea, icon }) {
  return (
    <label className="field">
      <span className="field-label">{icon} {label}</span>
      {textarea ? (
        <textarea
          className="field-input textarea"
          value={value || ''}
          placeholder={placeholder || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      ) : (
        <input
          className="field-input"
          type={type}
          value={value || ''}
          placeholder={placeholder || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
