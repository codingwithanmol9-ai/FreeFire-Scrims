// src/components/TournamentCard.jsx
import { Link } from 'react-router-dom';

const STATUS_COLORS = {
  upcoming: '#00ff88',
  live: '#ff4d00',
  completed: '#6b6b8a',
};

export default function TournamentCard({ t, showRoom = false }) {
  const slotsLeft = t.slots - t.filled;
  const fillPct = Math.min((t.filled / t.slots) * 100, 100);
  const statusColor = STATUS_COLORS[t.status] || '#6b6b8a';

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ ...styles.statusDot, background: statusColor, boxShadow: `0 0 8px ${statusColor}` }} />
          <span style={{ ...styles.statusLabel, color: statusColor }}>
            {t.status.toUpperCase()}
          </span>
        </div>
        <span style={styles.mode}>{t.mode} • {t.map}</span>
      </div>

      <h3 style={styles.name}>{t.name}</h3>

      <div style={styles.meta}>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>📅 DATE</span>
          <span style={styles.metaVal}>{t.date}</span>
        </div>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>⏰ TIME</span>
          <span style={styles.metaVal}>{t.time}</span>
        </div>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>💰 ENTRY</span>
          <span style={styles.metaVal}>{t.entryFee}</span>
        </div>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>🏆 PRIZE</span>
          <span style={{ ...styles.metaVal, color: '#ffd700' }}>{t.prizePool}</span>
        </div>
      </div>

      {/* Slot bar */}
      <div style={styles.slotSection}>
        <div style={styles.slotRow}>
          <span style={styles.slotLabel}>SLOTS</span>
          <span style={styles.slotCount}>
            <span style={{ color: slotsLeft > 0 ? '#00ff88' : '#ff3366' }}>{slotsLeft} left</span>
            <span style={styles.slotTotal}> / {t.slots}</span>
          </span>
        </div>
        <div style={styles.barBg}>
          <div style={{
            ...styles.barFill,
            width: `${fillPct}%`,
            background: fillPct >= 90
              ? 'linear-gradient(90deg, #ff3366, #ff4d00)'
              : 'linear-gradient(90deg, #ff4d00, #ff9900)',
          }} />
        </div>
      </div>

      {/* Room info if available */}
      {showRoom && t.roomId && (
        <div style={styles.roomBox}>
          <div style={styles.roomRow}>
            <span style={styles.roomLabel}>ROOM ID</span>
            <span style={styles.roomVal}>{t.roomId}</span>
          </div>
          <div style={styles.roomRow}>
            <span style={styles.roomLabel}>PASSWORD</span>
            <span style={styles.roomVal}>{t.roomPass || '—'}</span>
          </div>
        </div>
      )}

      {t.status === 'upcoming' && slotsLeft > 0 && (
        <Link to={`/register?tid=${t.id}`} style={styles.regBtn}>
          ⚡ REGISTER NOW
        </Link>
      )}
      {(t.status === 'completed' || slotsLeft === 0) && (
        <div style={styles.fullBtn}>
          {t.status === 'completed' ? '✅ COMPLETED' : '🔒 SLOTS FULL'}
        </div>
      )}
      {t.status === 'live' && (
        <div style={{ ...styles.fullBtn, background: 'rgba(255,77,0,0.15)', color: '#ff4d00', borderColor: '#ff4d00' }}>
          🔴 LIVE NOW
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: 'linear-gradient(145deg, #0d0d14, #10101a)',
    border: '1px solid rgba(255,77,0,0.2)',
    borderRadius: 8,
    padding: '1.5rem',
    display: 'flex', flexDirection: 'column', gap: '1rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  statusDot: {
    width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
  },
  statusLabel: {
    fontSize: 11, fontWeight: 700, letterSpacing: 2,
    fontFamily: 'Orbitron, monospace',
  },
  mode: {
    fontSize: 12, color: '#6b6b8a',
    fontFamily: 'Exo 2, sans-serif',
    background: 'rgba(255,255,255,0.04)',
    padding: '2px 8px', borderRadius: 3,
  },
  name: {
    fontFamily: 'Orbitron, monospace',
    fontSize: 15, fontWeight: 700,
    color: '#e8e8f0', lineHeight: 1.3,
  },
  meta: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
  },
  metaItem: {
    display: 'flex', flexDirection: 'column', gap: 2,
  },
  metaLabel: {
    fontSize: 10, color: '#4a4a6a',
    letterSpacing: 1.5, fontWeight: 700,
    fontFamily: 'Orbitron, monospace',
  },
  metaVal: {
    fontSize: 15, fontWeight: 600,
    color: '#c8c8dc', fontFamily: 'Rajdhani, sans-serif',
  },
  slotSection: { display: 'flex', flexDirection: 'column', gap: 6 },
  slotRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  slotLabel: {
    fontSize: 10, color: '#4a4a6a',
    letterSpacing: 1.5, fontFamily: 'Orbitron, monospace', fontWeight: 700,
  },
  slotCount: { fontSize: 13, fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 },
  slotTotal: { color: '#6b6b8a' },
  barBg: {
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 4, height: 6, overflow: 'hidden',
  },
  barFill: {
    height: '100%', borderRadius: 4,
    transition: 'width 0.5s ease',
  },
  roomBox: {
    background: 'rgba(255,77,0,0.06)',
    border: '1px solid rgba(255,77,0,0.3)',
    borderRadius: 6, padding: '0.75rem',
    display: 'flex', flexDirection: 'column', gap: 6,
  },
  roomRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  roomLabel: {
    fontSize: 10, color: '#ff9900', letterSpacing: 1.5,
    fontFamily: 'Orbitron, monospace', fontWeight: 700,
  },
  roomVal: {
    fontSize: 16, fontWeight: 700,
    fontFamily: 'Rajdhani, sans-serif',
    color: '#fff', letterSpacing: 2,
  },
  regBtn: {
    display: 'block', textAlign: 'center',
    background: 'linear-gradient(135deg, #ff4d00, #ff9900)',
    color: '#000', fontWeight: 700,
    fontFamily: 'Orbitron, monospace',
    fontSize: 13, letterSpacing: 1,
    padding: '12px', borderRadius: 5,
    textDecoration: 'none',
    transition: 'opacity 0.2s',
  },
  fullBtn: {
    display: 'block', textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#6b6b8a',
    fontWeight: 700,
    fontFamily: 'Orbitron, monospace',
    fontSize: 12, letterSpacing: 1,
    padding: '12px', borderRadius: 5,
    background: 'rgba(255,255,255,0.03)',
  },
};
