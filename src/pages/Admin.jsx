// src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import {
  getTournaments, saveTournament, deleteTournament,
  getRegistrations, deleteRegistration,
  getResults, saveResult, deleteResult,
  checkAdminPass, updateAdminPass,
} from '../data/store';

const TABS = ['Tournaments', 'Registrations', 'Results', 'Settings'];

const BLANK_T = {
  id: '', name: '', date: '', time: '20:00',
  mode: 'Squad', map: 'Bermuda', slots: 12, filled: 0,
  entryFee: 'Free', prizePool: '₹500', status: 'upcoming',
  roomId: '', roomPass: '',
  rules: [
    'No hacking / cheating. Instant ban.',
    'Squad of 4 required.',
    'Must join 10 min before match.',
    'Screenshot of final result mandatory.',
    'Admin decision is final.',
  ],
};

const BLANK_R = {
  id: '', tournamentName: '', date: '',
  winner: '', second: '', third: '', mvp: '', kills: '',
};

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [passErr, setPassErr] = useState('');
  const [tab, setTab] = useState('Tournaments');
  const [tournaments, setTournaments] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [results, setResults] = useState([]);
  const [tForm, setTForm] = useState(null);
  const [rForm, setRForm] = useState(null);
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [search, setSearch] = useState('');
  const [filterTid, setFilterTid] = useState('');

  const reload = () => {
    setTournaments(getTournaments());
    setRegistrations(getRegistrations());
    setResults(getResults());
  };

  useEffect(() => { if (authed) reload(); }, [authed]);

  const login = () => {
    if (checkAdminPass(passInput)) { setAuthed(true); setPassErr(''); }
    else setPassErr('Wrong password. Try again.');
  };

  if (!authed) return (
    <div style={styles.loginWrap}>
      <div style={styles.loginCard}>
        <div style={styles.loginIcon}>🔐</div>
        <h2 style={styles.loginTitle}>ADMIN ACCESS</h2>
        <p style={styles.loginSub}>FF Scrims Control Panel</p>
        <input
          type="password"
          placeholder="Enter admin password"
          value={passInput}
          onChange={e => setPassInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={styles.loginInput}
        />
        {passErr && <p style={styles.loginErr}>{passErr}</p>}
        <button onClick={login} style={styles.loginBtn}>ENTER PANEL</button>
        <p style={styles.loginHint}>Default password: <code>admin123</code></p>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.topBar}>
          <h1 style={styles.title}>⚙️ ADMIN PANEL</h1>
          <button onClick={() => setAuthed(false)} style={styles.logoutBtn}>LOGOUT</button>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {TABS.map(t => (
            <button key={t} onClick={() => { setTab(t); setTForm(null); setRForm(null); }}
              style={{ ...styles.tab, ...(tab === t ? styles.tabActive : {}) }}>
              {t === 'Tournaments' && '🏆 '}
              {t === 'Registrations' && '📋 '}
              {t === 'Results' && '🥇 '}
              {t === 'Settings' && '⚙️ '}
              {t}
            </button>
          ))}
        </div>

        {/* ===== TOURNAMENTS ===== */}
        {tab === 'Tournaments' && (
          <div>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Tournaments ({tournaments.length})</h2>
              <button onClick={() => setTForm({ ...BLANK_T, id: Date.now().toString(), createdAt: Date.now() })}
                style={styles.addBtn}>+ ADD TOURNAMENT</button>
            </div>

            {tForm && (
              <div style={styles.formPanel}>
                <h3 style={styles.formTitle}>{tForm.createdAt && !tournaments.find(t => t.id === tForm.id) ? 'NEW TOURNAMENT' : 'EDIT TOURNAMENT'}</h3>
                <div style={styles.formGrid}>
                  {[
                    { label: 'Tournament Name', key: 'name', type: 'text' },
                    { label: 'Date', key: 'date', type: 'date' },
                    { label: 'Time', key: 'time', type: 'time' },
                    { label: 'Entry Fee', key: 'entryFee', type: 'text' },
                    { label: 'Prize Pool', key: 'prizePool', type: 'text' },
                    { label: 'Total Slots', key: 'slots', type: 'number' },
                    { label: 'Filled Slots', key: 'filled', type: 'number' },
                    { label: 'Room ID', key: 'roomId', type: 'text' },
                    { label: 'Room Password', key: 'roomPass', type: 'text' },
                  ].map(f => (
                    <div key={f.key} style={styles.field}>
                      <label style={styles.fieldLabel}>{f.label}</label>
                      <input type={f.type} value={tForm[f.key] || ''}
                        onChange={e => setTForm(p => ({ ...p, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))}
                        style={styles.input} />
                    </div>
                  ))}
                  <div style={styles.field}>
                    <label style={styles.fieldLabel}>Mode</label>
                    <select value={tForm.mode} onChange={e => setTForm(p => ({ ...p, mode: e.target.value }))} style={styles.input}>
                      <option>Squad</option><option>Duo</option><option>Solo</option>
                    </select>
                  </div>
                  <div style={styles.field}>
                    <label style={styles.fieldLabel}>Map</label>
                    <select value={tForm.map} onChange={e => setTForm(p => ({ ...p, map: e.target.value }))} style={styles.input}>
                      {['Bermuda', 'Kalahari', 'Purgatory', 'Alpine', 'Nexterra'].map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div style={styles.field}>
                    <label style={styles.fieldLabel}>Status</label>
                    <select value={tForm.status} onChange={e => setTForm(p => ({ ...p, status: e.target.value }))} style={styles.input}>
                      <option value="upcoming">Upcoming</option>
                      <option value="live">Live</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div style={styles.field}>
                  <label style={styles.fieldLabel}>Rules (one per line)</label>
                  <textarea
                    value={(tForm.rules || []).join('\n')}
                    onChange={e => setTForm(p => ({ ...p, rules: e.target.value.split('\n') }))}
                    style={{ ...styles.input, minHeight: 100, resize: 'vertical' }}
                  />
                </div>
                <div style={styles.formActions}>
                  <button onClick={() => { saveTournament(tForm); setTForm(null); reload(); }} style={styles.saveBtn}>💾 SAVE</button>
                  <button onClick={() => setTForm(null)} style={styles.cancelBtn}>CANCEL</button>
                </div>
              </div>
            )}

            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['Name', 'Date', 'Map', 'Slots', 'Status', 'Room', 'Actions'].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tournaments.map(t => (
                    <tr key={t.id} style={styles.tr}>
                      <td style={styles.td}>{t.name}</td>
                      <td style={styles.td}>{t.date} {t.time}</td>
                      <td style={styles.td}>{t.map}</td>
                      <td style={styles.td}>{t.filled}/{t.slots}</td>
                      <td style={styles.td}>
                        <span style={{ ...styles.badge, background: t.status === 'upcoming' ? 'rgba(0,255,136,0.1)' : t.status === 'live' ? 'rgba(255,77,0,0.1)' : 'rgba(255,255,255,0.05)', color: t.status === 'upcoming' ? '#00ff88' : t.status === 'live' ? '#ff4d00' : '#6b6b8a', border: `1px solid ${t.status === 'upcoming' ? 'rgba(0,255,136,0.3)' : t.status === 'live' ? 'rgba(255,77,0,0.3)' : 'rgba(255,255,255,0.1)'}` }}>
                          {t.status}
                        </span>
                      </td>
                      <td style={styles.td}>{t.roomId || '—'}</td>
                      <td style={styles.td}>
                        <div style={styles.actionBtns}>
                          <button onClick={() => setTForm({ ...t })} style={styles.editBtn}>✏️ EDIT</button>
                          <button onClick={() => { if (window.confirm('Delete?')) { deleteTournament(t.id); reload(); } }} style={styles.delBtn}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== REGISTRATIONS ===== */}
        {tab === 'Registrations' && (
          <div>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Registrations ({registrations.length})</h2>
              <div style={styles.filterRow}>
                <input placeholder="Search team / player..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...styles.input, width: 200 }} />
                <select value={filterTid} onChange={e => setFilterTid(e.target.value)} style={{ ...styles.input, width: 220 }}>
                  <option value="">All Tournaments</option>
                  {tournaments.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
            </div>
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['Team', 'Leader', 'Phone', 'Tournament', 'Members', 'Registered', 'Action'].map(h => <th key={h} style={styles.th}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {registrations
                    .filter(r => {
                      const q = search.toLowerCase();
                      const matchQ = !q || r.teamName?.toLowerCase().includes(q) || r.leader?.toLowerCase().includes(q) || r.phone?.includes(q);
                      const matchT = !filterTid || r.tournamentId === filterTid;
                      return matchQ && matchT;
                    })
                    .map(r => {
                      const t = tournaments.find(x => x.id === r.tournamentId);
                      return (
                        <tr key={r.id} style={styles.tr}>
                          <td style={styles.td}><strong style={{ color: '#ff9900' }}>{r.teamName}</strong></td>
                          <td style={styles.td}>{r.leader} {r.leaderId && <span style={{ color: '#4a4a6a', fontSize: 11 }}>({r.leaderId})</span>}</td>
                          <td style={styles.td}><a href={`tel:${r.phone}`} style={{ color: '#ff4d00' }}>{r.phone}</a></td>
                          <td style={styles.td}>{t ? t.name : r.tournamentId}</td>
                          <td style={styles.td}>
                            {[r.member2, r.member3, r.member4].filter(Boolean).join(', ') || '—'}
                          </td>
                          <td style={styles.td}>{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—'}</td>
                          <td style={styles.td}>
                            <button onClick={() => { if (window.confirm('Remove registration?')) { deleteRegistration(r.id); reload(); } }} style={styles.delBtn}>🗑️</button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== RESULTS ===== */}
        {tab === 'Results' && (
          <div>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Results ({results.length})</h2>
              <button onClick={() => setRForm({ ...BLANK_R, id: Date.now().toString() })} style={styles.addBtn}>+ ADD RESULT</button>
            </div>

            {rForm && (
              <div style={styles.formPanel}>
                <h3 style={styles.formTitle}>ADD / EDIT RESULT</h3>
                <div style={styles.formGrid}>
                  {[
                    { label: 'Tournament Name', key: 'tournamentName' },
                    { label: 'Date', key: 'date', type: 'date' },
                    { label: '🥇 Winner Team', key: 'winner' },
                    { label: '🥈 2nd Place', key: 'second' },
                    { label: '🥉 3rd Place', key: 'third' },
                    { label: '🎯 MVP Player IGN', key: 'mvp' },
                    { label: 'MVP Kills', key: 'kills', type: 'number' },
                  ].map(f => (
                    <div key={f.key} style={styles.field}>
                      <label style={styles.fieldLabel}>{f.label}</label>
                      <input type={f.type || 'text'} value={rForm[f.key] || ''}
                        onChange={e => setRForm(p => ({ ...p, [f.key]: e.target.value }))}
                        style={styles.input} />
                    </div>
                  ))}
                </div>
                <div style={styles.formActions}>
                  <button onClick={() => { saveResult(rForm); setRForm(null); reload(); }} style={styles.saveBtn}>💾 SAVE</button>
                  <button onClick={() => setRForm(null)} style={styles.cancelBtn}>CANCEL</button>
                </div>
              </div>
            )}

            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['Tournament', 'Date', 'Winner', '2nd', '3rd', 'MVP', 'Actions'].map(h => <th key={h} style={styles.th}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {results.map(r => (
                    <tr key={r.id} style={styles.tr}>
                      <td style={styles.td}>{r.tournamentName}</td>
                      <td style={styles.td}>{r.date}</td>
                      <td style={{ ...styles.td, color: '#ffd700', fontWeight: 700 }}>🥇 {r.winner}</td>
                      <td style={styles.td}>{r.second || '—'}</td>
                      <td style={styles.td}>{r.third || '—'}</td>
                      <td style={styles.td}>{r.mvp ? `${r.mvp} (${r.kills}k)` : '—'}</td>
                      <td style={styles.td}>
                        <div style={styles.actionBtns}>
                          <button onClick={() => setRForm({ ...r })} style={styles.editBtn}>✏️</button>
                          <button onClick={() => { if (window.confirm('Delete?')) { deleteResult(r.id); reload(); } }} style={styles.delBtn}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== SETTINGS ===== */}
        {tab === 'Settings' && (
          <div style={styles.settingsCard}>
            <h2 style={styles.sectionTitle}>Settings</h2>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
              <div style={styles.field}>
                <label style={styles.fieldLabel}>NEW ADMIN PASSWORD</label>
                <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)}
                  placeholder="Enter new password" style={styles.input} />
              </div>
              <button onClick={() => {
                if (!newPass.trim()) return;
                updateAdminPass(newPass); setNewPass('');
                setPassMsg('✅ Password updated successfully!');
                setTimeout(() => setPassMsg(''), 3000);
              }} style={styles.saveBtn}>UPDATE PASSWORD</button>
              {passMsg && <p style={{ color: '#00ff88', fontFamily: 'Exo 2, sans-serif', fontSize: 14 }}>{passMsg}</p>}
            </div>
            <div style={{ marginTop: 32 }}>
              <h3 style={{ ...styles.sectionTitle, fontSize: 16 }}>Contact Info</h3>
              <p style={{ color: '#6b6b8a', fontFamily: 'Exo 2, sans-serif', marginTop: 8 }}>
                Contact number on site: <strong style={{ color: '#ff4d00' }}>8780012870</strong><br />
                To change, edit the code in <code>src/data/store.js</code> and <code>src/components/Navbar.jsx</code>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inp = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 5, padding: '8px 12px',
  color: '#e8e8f0', fontSize: 14,
  fontFamily: 'Rajdhani, sans-serif',
  width: '100%', outline: 'none',
};

const styles = {
  page: { padding: '3rem 0', minHeight: '80vh' },
  inner: { maxWidth: 1300, margin: '0 auto', padding: '0 1.5rem' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: {
    fontFamily: 'Orbitron, monospace', fontSize: 26,
    fontWeight: 900, color: '#e8e8f0',
  },
  logoutBtn: {
    background: 'rgba(255,51,102,0.1)',
    border: '1px solid rgba(255,51,102,0.3)',
    color: '#ff3366', fontSize: 12,
    fontFamily: 'Orbitron, monospace',
    letterSpacing: 1, padding: '8px 16px', borderRadius: 4,
    cursor: 'pointer',
  },
  tabs: { display: 'flex', gap: 4, marginBottom: 28, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 0 },
  tab: {
    background: 'none', border: 'none', borderBottom: '2px solid transparent',
    color: '#6b6b8a', fontSize: 13,
    fontFamily: 'Orbitron, monospace', fontWeight: 700,
    padding: '10px 18px', cursor: 'pointer', transition: 'all 0.2s',
    marginBottom: -1,
  },
  tabActive: { color: '#ff4d00', borderBottom: '2px solid #ff4d00' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 },
  sectionTitle: {
    fontFamily: 'Orbitron, monospace', fontSize: 18,
    fontWeight: 700, color: '#e8e8f0',
  },
  filterRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  addBtn: {
    background: 'linear-gradient(135deg, #ff4d00, #ff9900)',
    color: '#000', fontWeight: 800,
    fontFamily: 'Orbitron, monospace', fontSize: 12,
    letterSpacing: 1, padding: '10px 18px', borderRadius: 4,
    border: 'none', cursor: 'pointer',
  },
  formPanel: {
    background: 'linear-gradient(145deg, #0d0d14, #10101a)',
    border: '1px solid rgba(255,77,0,0.2)',
    borderRadius: 8, padding: '1.5rem',
    marginBottom: 24,
  },
  formTitle: {
    fontFamily: 'Orbitron, monospace', fontSize: 14,
    fontWeight: 700, color: '#ff9900', marginBottom: 16,
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 12, marginBottom: 12,
  },
  field: { display: 'flex', flexDirection: 'column', gap: 4 },
  fieldLabel: {
    fontSize: 9, color: '#4a4a6a',
    letterSpacing: 1.5, fontFamily: 'Orbitron, monospace', fontWeight: 700,
  },
  input: inp,
  formActions: { display: 'flex', gap: 10, marginTop: 16 },
  saveBtn: {
    background: 'linear-gradient(135deg, #ff4d00, #ff9900)',
    color: '#000', fontWeight: 800,
    fontFamily: 'Orbitron, monospace', fontSize: 12,
    letterSpacing: 1, padding: '10px 24px', borderRadius: 4,
    border: 'none', cursor: 'pointer',
  },
  cancelBtn: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#6b6b8a', fontFamily: 'Orbitron, monospace',
    fontSize: 11, padding: '10px 20px', borderRadius: 4,
    cursor: 'pointer',
  },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    text: '#4a4a6a',
    fontFamily: 'Orbitron, monospace', fontSize: 9,
    fontWeight: 700, letterSpacing: 1.5,
    color: '#4a4a6a',
    padding: '10px 12px', textAlign: 'left',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    whiteSpace: 'nowrap',
  },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.04)' },
  td: {
    padding: '10px 12px', fontSize: 13,
    color: '#a0a0c0', fontFamily: 'Rajdhani, sans-serif',
    verticalAlign: 'middle',
  },
  badge: {
    display: 'inline-block', fontSize: 10, fontWeight: 700,
    fontFamily: 'Orbitron, monospace', letterSpacing: 1,
    padding: '3px 8px', borderRadius: 3,
  },
  actionBtns: { display: 'flex', gap: 6 },
  editBtn: {
    background: 'rgba(255,153,0,0.1)',
    border: '1px solid rgba(255,153,0,0.3)',
    color: '#ff9900', fontSize: 11,
    fontFamily: 'Orbitron, monospace',
    padding: '5px 10px', borderRadius: 3, cursor: 'pointer',
  },
  delBtn: {
    background: 'rgba(255,51,102,0.1)',
    border: '1px solid rgba(255,51,102,0.3)',
    color: '#ff3366', fontSize: 13,
    padding: '5px 8px', borderRadius: 3, cursor: 'pointer',
  },
  settingsCard: {
    background: 'linear-gradient(145deg, #0d0d14, #10101a)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 8, padding: '2rem',
  },
  loginWrap: {
    minHeight: '90vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    padding: '2rem',
  },
  loginCard: {
    background: 'linear-gradient(145deg, #0d0d14, #10101a)',
    border: '1px solid rgba(255,77,0,0.2)',
    borderRadius: 10, padding: '3rem',
    width: '100%', maxWidth: 400,
    display: 'flex', flexDirection: 'column',
    gap: '1rem', alignItems: 'center', textAlign: 'center',
  },
  loginIcon: { fontSize: 48 },
  loginTitle: {
    fontFamily: 'Orbitron, monospace', fontSize: 22,
    fontWeight: 900, color: '#e8e8f0', letterSpacing: 2,
  },
  loginSub: { color: '#6b6b8a', fontFamily: 'Exo 2, sans-serif', fontSize: 13, marginBottom: 8 },
  loginInput: { ...inp, textAlign: 'center', fontSize: 16, letterSpacing: 4 },
  loginErr: { color: '#ff3366', fontSize: 13, fontFamily: 'Exo 2, sans-serif' },
  loginBtn: {
    background: 'linear-gradient(135deg, #ff4d00, #ff9900)',
    color: '#000', fontWeight: 800,
    fontFamily: 'Orbitron, monospace', fontSize: 13,
    letterSpacing: 1.5, padding: '12px 32px',
    border: 'none', borderRadius: 5, cursor: 'pointer',
    width: '100%',
  },
  loginHint: {
    fontSize: 12, color: '#3a3a55',
    fontFamily: 'Exo 2, sans-serif',
  },
};
