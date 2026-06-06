// src/pages/Results.jsx
import { useState, useEffect } from 'react';
import { getResults } from '../data/store';

export default function Results() {
  const [results, setResults] = useState([]);
  useEffect(() => { setResults(getResults()); }, []);

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <h1 style={styles.title}>TOURNAMENT RESULTS</h1>
        <p style={styles.sub}>Hall of fame — every champion remembered</p>

        {results.length === 0 ? (
          <div style={styles.empty}>No results yet. Stay tuned after the first tournament!</div>
        ) : (
          <div style={styles.grid}>
            {results.map(r => (
              <div key={r.id} style={styles.card}>
                <div style={styles.cardTop}>
                  <h3 style={styles.cardTitle}>{r.tournamentName}</h3>
                  <span style={styles.cardDate}>{r.date}</span>
                </div>
                <div style={styles.podium}>
                  {[
                    { medal: '🥇', name: r.winner, label: 'WINNER' },
                    { medal: '🥈', name: r.second, label: '2ND PLACE' },
                    { medal: '🥉', name: r.third, label: '3RD PLACE' },
                  ].filter(p => p.name).map((p, i) => (
                    <div key={i} style={styles.podiumRow}>
                      <span style={styles.medal}>{p.medal}</span>
                      <div>
                        <div style={styles.podiumLabel}>{p.label}</div>
                        <div style={styles.podiumTeam}>{p.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {r.mvp && (
                  <div style={styles.mvpBox}>
                    <span style={styles.mvpIcon}>🎯</span>
                    <div>
                      <div style={styles.mvpLabel}>MATCH MVP</div>
                      <div style={styles.mvpName}>{r.mvp}</div>
                      {r.kills && <div style={styles.mvpKills}>{r.kills} kills</div>}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: '4rem 0', minHeight: '80vh' },
  inner: { maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' },
  title: {
    fontFamily: 'Orbitron, monospace', fontSize: 32,
    fontWeight: 900, color: '#e8e8f0', letterSpacing: 2,
    borderLeft: '4px solid #ffd700', paddingLeft: 16, marginBottom: 8,
  },
  sub: { color: '#6b6b8a', fontFamily: 'Exo 2, sans-serif', marginBottom: 32, paddingLeft: 20 },
  empty: {
    textAlign: 'center', padding: '4rem',
    color: '#6b6b8a', fontFamily: 'Exo 2, sans-serif', fontSize: 18,
    border: '1px dashed rgba(255,255,255,0.08)', borderRadius: 8,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 24,
  },
  card: {
    background: 'linear-gradient(145deg, #0d0d14, #10101a)',
    border: '1px solid rgba(255,215,0,0.15)',
    borderRadius: 8, padding: '1.5rem',
    display: 'flex', flexDirection: 'column', gap: '1rem',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  cardTitle: {
    fontFamily: 'Orbitron, monospace', fontSize: 14,
    fontWeight: 700, color: '#e8e8f0', lineHeight: 1.3,
  },
  cardDate: { fontSize: 12, color: '#4a4a6a', fontFamily: 'Exo 2, sans-serif', whiteSpace: 'nowrap' },
  podium: { display: 'flex', flexDirection: 'column', gap: 10 },
  podiumRow: { display: 'flex', alignItems: 'center', gap: 12 },
  medal: { fontSize: 28, flexShrink: 0 },
  podiumLabel: {
    fontSize: 9, color: '#4a4a6a',
    letterSpacing: 2, fontFamily: 'Orbitron, monospace', fontWeight: 700,
  },
  podiumTeam: {
    fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
    fontSize: 18, color: '#e8e8f0',
  },
  mvpBox: {
    display: 'flex', alignItems: 'center', gap: 12,
    background: 'rgba(255,215,0,0.06)',
    border: '1px solid rgba(255,215,0,0.15)',
    borderRadius: 6, padding: '0.75rem',
  },
  mvpIcon: { fontSize: 24 },
  mvpLabel: {
    fontSize: 9, color: '#aa8800',
    letterSpacing: 2, fontFamily: 'Orbitron, monospace', fontWeight: 700,
  },
  mvpName: {
    fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
    fontSize: 17, color: '#ffd700',
  },
  mvpKills: { fontSize: 12, color: '#8a7000', fontFamily: 'Exo 2, sans-serif' },
};
