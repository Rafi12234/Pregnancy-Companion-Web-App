import React, { useEffect, useRef, useState } from 'react';
import './ChatBot.css';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../NavBar/NavBar';

const API_BASE = import.meta?.env?.VITE_API_BASE || 'http://localhost:5000';

/* ===================== Per-account helpers ===================== */
function currentAccountId() {
  // Prefer a stable, unique value your login stores.
  // 1) userId (Mongo _id)   2) email   3) guest
  const uid = localStorage.getItem('userId');
  if (uid && uid !== 'undefined' && uid !== 'null') return `uid:${uid}`;
  const email = localStorage.getItem('email');
  if (email && email !== 'undefined' && email !== 'null') return `email:${email}`;
  return 'guest';
}

const storageKey = (acct) => `chatHistory:v2:${acct}`;

const defaultWelcome = () => ([
  {
    role: 'assistant',
    content:
      'Hi! I’m your pregnancy info buddy. Ask me anything—symptoms, nutrition, checkup prep, and more. (I’m not a doctor.)',
    ts: Date.now(),
  },
]);

function loadHistory(acct) {
  try {
    const raw = localStorage.getItem(storageKey(acct));
    return raw ? JSON.parse(raw) : defaultWelcome();
  } catch {
    return defaultWelcome();
  }
}

function saveHistory(acct, messages) {
  try {
    localStorage.setItem(storageKey(acct), JSON.stringify(messages));
  } catch (e) {
    console.warn('Failed to save chat history:', e);
  }
}

/* ===================== Component ===================== */
const ChatBot = () => {
  // Track active account explicitly
  const [account, setAccount] = useState(() => currentAccountId());

  // Load that account’s history immediately (no flicker)
  const [messages, setMessages] = useState(() => loadHistory(account));

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  // Persist only this account’s history whenever messages change
  useEffect(() => {
    saveHistory(account, messages);
  }, [messages, account]);

  // Detect account switches in same tab (polling) + across tabs (storage event)
  useEffect(() => {
    let last = account;

    const check = () => {
      const now = currentAccountId();
      if (now !== last) {
        last = now;
        setAccount(now);
        setMessages(loadHistory(now)); // switch to that user’s history (or welcome)
      }
    };

    // In case your login page sets userId/email in the same tab
    const interval = setInterval(check, 400); // fast + cheap
    // If login happens in another tab
    const onStorage = (e) => {
      if (e.key === 'userId' || e.key === 'email') check();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  async function send() {
    const text = input.trim();
    if (!text) return;
    setInput('');

    const outgoing = { role: 'user', content: text, ts: Date.now() };
    setMessages((prev) => [...prev, outgoing]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/ai/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // public route
        body: JSON.stringify({ question: text }),
      });
      const data = await res.json();
      const reply = res.ok
        ? (data?.answer || 'Sorry, I couldn’t generate a response.')
        : `Error: ${data?.message || 'Something went wrong'}`;

      setMessages((prev) => [...prev, { role: 'assistant', content: reply, ts: Date.now() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Network error. Please try again.', ts: Date.now() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  // Optional: clear ONLY this account’s history
  function clearMyHistory() {
    localStorage.removeItem(storageKey(account));
    setMessages([{
      role: 'assistant',
      content: 'History cleared for this account. How can I help you today? (Info only, not medical advice.)',
      ts: Date.now(),
    }]);
  }

  return (
    <div className="app-container">
      <div className="chatbot">
      <Navbar />
      <Sidebar />
      <div className="chatbot-header">
        🤰 AI Pregnancy Chat (Info only, not medical advice)
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <small className="uid-chip" title="Current account">{account}</small>
          <button className="chip-btn" onClick={clearMyHistory} title="Clear only this account’s chat">
            Clear
          </button>
        </div>
      </div>

      <div className="chatbot-messages" ref={listRef}>
        {messages.map((m, idx) => (
          <div key={idx} className={`msg ${m.role}`}>
            <div className="bubble">
              {m.content}
              <div className="ts">
                {new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="msg assistant">
            <div className="bubble">Typing…</div>
          </div>
        )}
      </div>

      <div className="chatbot-quick">
        <button onClick={() => setInput('What foods should I avoid during pregnancy?')}>Foods to avoid</button>
        <button onClick={() => setInput('Is it normal to feel cramps at 12 weeks?')}>Cramps at 12w</button>
        <button onClick={() => setInput('How much water should I drink daily?')}>Hydration</button>
      </div>

      <div className="chatbot-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type your question…"
          rows={2}
        />
        <button onClick={send} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
    </div>
  );
};

export default ChatBot;
