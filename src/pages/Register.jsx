// src/pages/Register.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTournaments, addRegistration, getRegistrations } from '../data/store';

export default function Register() {
  const [params] = useSearchParams();
  const [tournaments, setTournaments] = useState([]);
  const [form, setForm] = useState({
    tournamentId: params.get('tid') || '',
    teamName: '',
    leader: '',
    leaderId: '',
    phone: '',
    member2: '', member2Id: '',
    member3: '', member3Id: '',
    member4: '', member4Id: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTournaments(getTournaments().filter(t => t.status === 'upcoming'));
  }, []);

  const sel = tournaments.find(t => t.id === form.tournamentId);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    setError('');
    if (!form.tournamentId || !form.teamName || !form.leader || !form.phone) {
      setError('Please fill all required fields.'); return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError('Enter a valid 10-digit phone number.'); return;
    }
    // Check if team already registered
    const regs = getRegistrations();
    const alreadyIn = regs.find(r => r.tournamentId === form.tournamentId && r.teamName.toLowerCase() === form.teamName.toLowerCase());
    if (alreadyIn) { setError('This team name is already registered for this tournament.'); return; }
    if (sel && sel.filled >= sel.slots) { setError('Sorry, slots are full!'); return; }

    addRegistration(form);
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.success}>
          <div style={styles.successIcon}>✅</div>
          <h2 style={styles.successTitle}>REGISTRATION CONFIRMED!</h2>
          <p style={styles.successSub}>
            Your squad <strong style={{ color: '#ff9900' }}>{form.teamName}</strong> has been registered.<br />
            Room ID & password will be shared before match time.
          </p>
          <div style={styles.successContact}>
            <p>For queries, contact:</p>
            <a href="tel:8780012870" style={styles.successPhone}>📞 8780012870</a>
            <a href="https://wa.me/918780012870" target="_blank" rel="noreferrer" style={styles.waBtn}>💬 WhatsApp</a>
          </div>
          <button onClick={() => { setSubmitted(false); setForm({ tournamentId: '', teamName: '', leader: '', leaderId: '', phone: '', member2: '', member2Id: '', member3: '', member3Id: '', member4: '', member4Id: '' }); }}
            style={styles.resetBtn}>
            REGISTER ANOTHER SQUAD
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <h1 style={styles.title}>SQUAD REGISTRATION</h1>
        <p style={styles.sub}>Fill in your squad details to secure your slot.</p>

        <div style={styles.formGrid}>
          <div style={styles.formCard}>
            {/* Tournament Select */}
            <div style={styles.field}>
              <label style={styles.label}>SELECT TOURNAMENT *</label>
              <select value={form.tournamentId} onChange={e => set('tournamentId', e.target.value)} style={styles.input}>
                <option value="">-- Choose Tournament --</option>
                {tournaments.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} | {t.date} {t.time} | {t.slots - t.filled} slots left
                  </option>
                ))}
              </select>
            </div>

            {sel && (
              <div style={styles.tournInfo}>
                <span style={styles.tournInfoItem}>📅 {sel.date}</span>
                <span style={styles.tournInfoItem}>⏰ {sel.time}</span>
                <span style={styles.tournInfoItem}>🗺️ {sel.map}</span>
                <span style={styles.tournInfoItem}>💰 {sel.entryFee}</span>
                <span style={styles.tournInfoItem}>🏆 Prize: {sel.prizePool}</span>
              </div>
            )}

            <div style={styles.divider} />

            <div style={styles.field}>
              <label style={styles.label}>TEAM NAME *</label>
              <input value={form.teamName} onChange={e => set('teamName', e.target.value)}
                placeholder="e.g. Team BEAST" style={styles.input} />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>CONTACT (WhatsApp) *</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)}
                placeholder="10-digit mobile number" style={styles.input} type="tel" />
            </div>

            <div style={styles.divider} />
            <div style={styles.sectionLabel}>👑 SQUAD LEADER</div>

            <div style={styles.row2}>
              <div style={styles.field}>
                <label style={styles.label}>IN-GAME NAME *</label>
                <input value={form.leader} onChange={e => set('leader', e.target.value)}
                  placeholder="Leader IGN" style={styles.input} />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>FREE FIRE UID</label>
                <input value={form.leaderId} onChange={e => set('leaderId', e.target.value)}
                  placeholder="UID" style={styles.input} />
              </div>
            </div>

            {[2, 3, 4].map(n => (
              <div key={n}>
                <div style={styles.sectionLabel}>👤 MEMBER {n}</div>
                <div style={styles.row2}>
                  <div style={styles.field}>
                    <label style={styles.label}>IGN</label>
                    <input value={form[`member${n}`]} onChange={e => set(`member${n}`, e.target.value)}
                      placeholder={`Member ${n} IGN`} style={styles.input} />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>UID</label>
                    <input value={form[`member${n}Id`]} onChange={e => set(`member${n}Id`, e.target.value)}
                      placeholder="UID" style={styles.input} />
                  </div>
                </div>
              </div>
            ))}

           {sel && sel.entryFee !== 'Free' && (
  <div style={styles.payBox}>
    <div style={styles.payTitle}>💰 ENTRY FEE PAYMENT</div>
    <div style={styles.payAmount}>{sel.entryFee}</div>
    <p style={styles.payInstr}>Scan QR code ya UPI ID pe pay karo, phir screenshot WhatsApp karo</p>
    <div style={styles.payContent}>
      <img src="/qr.png" alt="Payment QR" style={styles.qrImg} />
      <div style={styles.payRight}>
        <div style={styles.upiBox}>
          <span style={styles.upiLabel}>UPI ID</span>
          <span style={styles.upiId}>sahuanmol7999-1@okicici</span>
          <button onClick={() => {
            navigator.clipboard.writeText('sahuanmol7999-1@okicici');
            alert('UPI ID copied!');
          }} style={styles.copyBtn}>📋 Copy</button>
        </div>
        <a href="https://wa.me/918780012870?text=Hi%20I%20paid%20entry%20fee%20for%20scrim%20-%20sending%20screenshot"
          target="_blank" rel="noreferrer" style={styles.screenshotBtn}>
          📸 Send Payment Screenshot
        </a>
        <p style={styles.payNote}>⚠️ Slot confirm hoga payment verify hone ke baad</p>
      </div>
    </div>
  </div>
)}

{error && <div style={styles.errorBox}>⚠️ {error}</div>}

            <button onClick={handleSubmit} style={styles.submitBtn}>
              ⚡ CONFIRM REGISTRATION
            </button>

            <p style={styles.note}>
              After registration, Room ID & Password will be shared via WhatsApp before match time.<br />
              Contact: <a href="tel:8780012870" style={{ color: '#ff4d00' }}>8780012870</a>
            </p>
          </div>

          {/* Rules sidebar */}
          {sel && sel.rules?.length > 0 && (
            <div style={styles.rulesCard}>
              <div style={styles.rulesTitle}>📋 TOURNAMENT RULES</div>
              {sel.rules.map((r, i) => (
                <div key={i} style={styles.ruleItem}>
                  <span style={styles.ruleDot}>▸</span>
                  <span style={styles.ruleText}>{r}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
}

const inp = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 5, padding: '10px 14px',
  color: '#e8e8f0', fontSize: 15,
  fontFamily: 'Rajdhani, sans-serif',
  width: '100%',
  outline: 'none',
};

const styles = {
  page: { padding: '4rem 0', minHeight: '80vh' },
  inner: { maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' },
  title: {
    fontFamily: 'Orbitron, monospace', fontSize: 32,
    fontWeight: 900, color: '#e8e8f0', letterSpacing: 2,
    borderLeft: '4px solid #ff4d00', paddingLeft: 16,
    marginBottom: 8,
  },
  sub: { color: '#6b6b8a', fontFamily: 'Exo 2, sans-serif', marginBottom: 32, paddingLeft: 20 },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 24,
    alignItems: 'start',
  },
  formCard: {
    background: 'linear-gradient(145deg, #0d0d14, #10101a)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 8, padding: '2rem',
    display: 'flex', flexDirection: 'column', gap: '1rem',
  },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: {
    fontSize: 10, color: '#4a4a6a',
    letterSpacing: 2, fontFamily: 'Orbitron, monospace', fontWeight: 700,
  },
  input: inp,
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  divider: { height: 1, background: 'rgba(255,255,255,0.06)' },
  sectionLabel: {
    fontSize: 12, color: '#ff9900',
    fontFamily: 'Orbitron, monospace', fontWeight: 700, letterSpacing: 1,
  },
  tournInfo: {
    display: 'flex', flexWrap: 'wrap', gap: 8,
  },
  tournInfoItem: {
    background: 'rgba(255,77,0,0.08)',
    border: '1px solid rgba(255,77,0,0.2)',
    borderRadius: 4, padding: '4px 10px',
    fontSize: 12, color: '#c0c0d0',
    fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
  },
  errorBox: {
    background: 'rgba(255,51,102,0.1)',
    border: '1px solid rgba(255,51,102,0.3)',
    borderRadius: 4, padding: '10px 14px',
    color: '#ff3366', fontSize: 14,
    fontFamily: 'Exo 2, sans-serif',
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #ff4d00, #ff9900)',
    color: '#000', fontWeight: 800,
    fontFamily: 'Orbitron, monospace', fontSize: 14,
    letterSpacing: 1, padding: '14px',
    border: 'none', borderRadius: 5,
    width: '100%', cursor: 'pointer',
    marginTop: 8,
  },
  note: {
    fontSize: 12, color: '#4a4a6a',
    fontFamily: 'Exo 2, sans-serif', lineHeight: 1.6,
    textAlign: 'center',
  },
  rulesCard: {
    width: 280,
    background: 'rgba(255,77,0,0.04)',
    border: '1px solid rgba(255,77,0,0.15)',
    borderRadius: 8, padding: '1.5rem',
    display: 'flex', flexDirection: 'column', gap: '0.75rem',
    position: 'sticky', top: 80,
  },
  rulesTitle: {
    fontFamily: 'Orbitron, monospace', fontSize: 13, fontWeight: 700,
    color: '#ff9900', letterSpacing: 1, marginBottom: 8,
  },
  ruleItem: { display: 'flex', gap: 8, alignItems: 'flex-start' },
  ruleDot: { color: '#ff4d00', flexShrink: 0, marginTop: 1 },
  ruleText: { fontSize: 13, color: '#8080a0', fontFamily: 'Exo 2, sans-serif', lineHeight: 1.5 },
  success: {
    maxWidth: 500, margin: '4rem auto',
    background: 'linear-gradient(145deg, #0d0d14, #10101a)',
    border: '1px solid rgba(0,255,136,0.2)',
    borderRadius: 12, padding: '3rem',
    textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem',
  },
  successIcon: { fontSize: 56 },
  successTitle: {
    fontFamily: 'Orbitron, monospace', fontSize: 22,
    fontWeight: 900, color: '#00ff88', letterSpacing: 1,
  },
  successSub: { color: '#8080a0', fontFamily: 'Exo 2, sans-serif', lineHeight: 1.7 },
  successContact: { display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' },
  successPhone: { color: '#ff4d00', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 20, textDecoration: 'none' },
  waBtn: {
    background: '#25d366', color: '#000', fontWeight: 700,
    padding: '8px 20px', borderRadius: 4,
    textDecoration: 'none', fontFamily: 'Rajdhani, sans-serif', fontSize: 15,
  },
  resetBtn: {
    background: 'transparent',
    border: '1px solid rgba(255,77,0,0.3)',
    color: '#ff4d00', fontFamily: 'Orbitron, monospace',
    fontSize: 12, letterSpacing: 1, padding: '10px 20px',
    borderRadius: 4, cursor: 'pointer', marginTop: 8,
  },
  payBox: {
  background: 'rgba(255,215,0,0.05)',
  border: '1px solid rgba(255,215,0,0.2)',
  borderRadius: 12, padding: '1.25rem',
  display: 'flex', flexDirection: 'column', gap: 10,
},
payTitle: {
  fontFamily: 'Nunito, sans-serif', fontWeight: 800,
  fontSize: 14, color: '#ffd700', letterSpacing: 1,
},
payAmount: {
  fontFamily: 'Nunito, sans-serif', fontWeight: 900,
  fontSize: 28, color: '#ff9900',
},
payInstr: {
  fontSize: 13, color: '#8080a0',
  fontFamily: 'Nunito, sans-serif', lineHeight: 1.5,
},
payContent: {
  display: 'flex', gap: 16, flexWrap: 'wrap',
  alignItems: 'flex-start',
},
qrImg: {
  width: 150, height: 150,
  borderRadius: 12,
  border: '2px solid rgba(255,215,0,0.2)',
},
payRight: {
  display: 'flex', flexDirection: 'column', gap: 10, flex: 1,
},
upiBox: {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 8, padding: '10px 12px',
  display: 'flex', flexDirection: 'column', gap: 4,
},
upiLabel: {
  fontSize: 10, color: '#4a4a6a',
  fontFamily: 'Nunito, sans-serif', fontWeight: 700,
  letterSpacing: 1.5,
},
upiId: {
  fontSize: 15, color: '#e8e8f0',
  fontFamily: 'Nunito, sans-serif', fontWeight: 700,
},
copyBtn: {
  background: 'rgba(255,77,0,0.1)',
  border: '1px solid rgba(255,77,0,0.3)',
  color: '#ff9900', fontSize: 12,
  fontFamily: 'Nunito, sans-serif', fontWeight: 700,
  padding: '6px 12px', borderRadius: 6,
  cursor: 'pointer', width: 'fit-content',
},
screenshotBtn: {
  display: 'block', textAlign: 'center',
  background: '#25d366', color: '#000',
  fontWeight: 800, fontFamily: 'Nunito, sans-serif',
  fontSize: 14, padding: '12px',
  borderRadius: 10, textDecoration: 'none',
},
payNote: {
  fontSize: 12, color: '#6b6b8a',
  fontFamily: 'Nunito, sans-serif', lineHeight: 1.5,
},

};
