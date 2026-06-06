// src/pages/Tournaments.jsx
import { useState, useEffect } from 'react';
import { getTournaments } from '../data/store';
import TournamentCard from '../components/TournamentCard';

export default function Tournaments() {
  const [all, setAll] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => { setAll(getTournaments()); }, []);

  const filtered = filter === 'all' ? all : all.filter(t => t.status === filter);

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <h1 style={styles.title}>TOURNAMENTS</h1>
          <p style={styles.sub}>All scrim battles — upcoming, live & completed</p>
        </div>

        <div style={styles.filters}>
          {['all', 'upcoming', 'live', 'completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ ...styles.filterBtn, ...(filter === f ? styles.filterActive : {}) }}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          {filtered.map(t => <TournamentCard key={t.id} t={t} showRoom={t.status === 'live'} />)}
          {filtered.length === 0 && (
            <div style={styles.empty}>
              <p>No {filter !== 'all' ? filter : ''} tournaments found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: '4rem 0', minHeight: '80vh' },
  inner: { maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' },
  header: { marginBottom: 32 },
  title: {
    fontFamily: 'Orbitron, monospace',
    fontSize: 36, fontWeight: 900,
    color: '#e8e8f0', letterSpacing: 3,
    borderLeft: '4px solid #ff4d00', paddingLeft: 16,
  },
  sub: { color: '#6b6b8a', fontFamily: 'Exo 2, sans-serif', marginTop: 8, paddingLeft: 20 },
  filters: { display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' },
  filterBtn: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#6b6b8a', fontSize: 12,
    fontFamily: 'Orbitron, monospace', fontWeight: 700,
    letterSpacing: 1.5, padding: '8px 20px', borderRadius: 4,
    cursor: 'pointer', transition: 'all 0.2s',
  },
  filterActive: {
    background: 'rgba(255,77,0,0.15)',
    border: '1px solid rgba(255,77,0,0.5)',
    color: '#ff9900',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 24,
  },
  empty: {
    gridColumn: '1/-1',
    padding: '4rem',
    textAlign: 'center',
    color: '#6b6b8a',
    fontFamily: 'Exo 2, sans-serif',
    fontSize: 18,
    border: '1px dashed rgba(255,255,255,0.08)',
    borderRadius: 8,
  },
};
