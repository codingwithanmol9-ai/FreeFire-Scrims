// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTournaments, getResults } from '../data/store';
import TournamentCard from '../components/TournamentCard';

export default function Home() {
  const [tournaments, setTournaments] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setTournaments(getTournaments().slice(0, 3));
    setResults(getResults().slice(0, 3));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroNoise} />
        <div style={styles.heroInner}>
          <div style={styles.badge}>🔥 FREE FIRE ESPORTS</div>
          <h1 style={styles.heroTitle}>
            INDIA'S<br />
            <span style={styles.heroAccent}>FIERCEST</span><br />
            SCRIMS
          </h1>
          <p style={styles.heroSub}>
            Battle the best. Prove your squad. Rise to glory.<br />
            Competitive scrim tournaments — every week.
          </p>
          <div style={styles.heroBtns}>
            <Link to="/tournaments" style={styles.primaryBtn}>⚡ VIEW TOURNAMENTS</Link>
            <Link to="/register" style={styles.secondaryBtn}>📝 REGISTER SQUAD</Link>
          </div>
          <div style={styles.heroContact}>
            <span style={styles.heroContactLabel}>JOIN / ENQUIRE:</span>
            <a href="tel:8780012870" style={styles.heroPhone}>📞 8780012870</a>
            <a href="https://wa.me/918780012870" target="_blank" rel="noreferrer" style={styles.waLink}>
              💬 WhatsApp
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div style={styles.statsBar}>
          {[
            { n: '100+', l: 'Teams Played' },
            { n: 'Weekly', l: 'Tournaments' },
            { n: '₹5K+', l: 'Prize Given' },
            { n: '24/7', l: 'Support' },
          ].map(s => (
            <div key={s.l} style={styles.statItem}>
              <span style={styles.statNum}>{s.n}</span>
              <span style={styles.statLabel}>{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>UPCOMING TOURNAMENTS</h2>
            <Link to="/tournaments" style={styles.viewAll}>VIEW ALL →</Link>
          </div>
          <div style={styles.grid}>
            {tournaments.map(t => (
              <TournamentCard key={t.id} t={t} />
            ))}
            {tournaments.length === 0 && (
              <p style={styles.empty}>No tournaments yet. Check back soon!</p>
            )}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section style={styles.rulesSection}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>SCRIM RULES</h2>
          <div style={styles.rulesGrid}>
            {[
              { icon: '🚫', rule: 'Zero tolerance for hacks, cheats, or ESP. Instant permanent ban.' },
              { icon: '👥', rule: 'Full squad of 4 required. No solo or duo entries.' },
              { icon: '⏱️', rule: 'Join the lobby at least 10 minutes before match time.' },
              { icon: '📸', rule: 'Screenshot of final rank mandatory for results verification.' },
              { icon: '💰', rule: 'Entry fee (if any) must be paid to confirm slot.' },
              { icon: '⚖️', rule: 'Admin\'s decision is final in all disputes.' },
            ].map((r, i) => (
              <div key={i} style={styles.ruleCard}>
                <span style={styles.ruleIcon}>{r.icon}</span>
                <p style={styles.ruleText}>{r.rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Results */}
      {results.length > 0 && (
        <section style={styles.section}>
          <div style={styles.sectionInner}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>RECENT RESULTS</h2>
              <Link to="/results" style={styles.viewAll}>VIEW ALL →</Link>
            </div>
            <div style={styles.resultsGrid}>
              {results.map(r => (
                <div key={r.id} style={styles.resultCard}>
                  <div style={styles.resultTournament}>{r.tournamentName}</div>
                  <div style={styles.resultDate}>{r.date}</div>
                  <div style={styles.podium}>
                    <div style={styles.podiumItem}>
                      <span style={styles.podiumMedal}>🥇</span>
                      <span style={styles.podiumName}>{r.winner}</span>
                    </div>
                    {r.second && <div style={styles.podiumItem}>
                      <span style={styles.podiumMedal}>🥈</span>
                      <span style={styles.podiumName}>{r.second}</span>
                    </div>}
                    {r.third && <div style={styles.podiumItem}>
                      <span style={styles.podiumMedal}>🥉</span>
                      <span style={styles.podiumName}>{r.third}</span>
                    </div>}
                  </div>
                  {r.mvp && (
                    <div style={styles.mvp}>
                      🎯 MVP: <strong>{r.mvp}</strong> ({r.kills} kills)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={styles.cta}>
        <div style={styles.sectionInner}>
          <h2 style={styles.ctaTitle}>READY TO DOMINATE?</h2>
          <p style={styles.ctaSub}>Contact us on WhatsApp or call to book your squad's slot now.</p>
          <div style={styles.ctaBtns}>
            <a href="https://wa.me/918780012870" target="_blank" rel="noreferrer" style={styles.waBtn}>
              💬 WhatsApp: 8780012870
            </a>
            <Link to="/register" style={styles.primaryBtn}>📝 REGISTER NOW</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    minHeight: '92vh', position: 'relative',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center',
    background: 'linear-gradient(160deg, #080812 0%, #0f0818 50%, #080812 100%)',
    overflow: 'hidden',
  },
  heroNoise: {
    position: 'absolute', inset: 0,
    backgroundImage: `
      radial-gradient(ellipse at 30% 20%, rgba(255,77,0,0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 80%, rgba(255,153,0,0.07) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
  heroInner: {
    maxWidth: 900, margin: '0 auto',
    padding: '6rem 1.5rem 3rem',
    position: 'relative',
    animation: 'fadeUp 0.7s ease',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(255,77,0,0.12)',
    border: '1px solid rgba(255,77,0,0.3)',
    color: '#ff9900',
    fontSize: 11, fontWeight: 700,
    fontFamily: 'Orbitron, monospace',
    letterSpacing: 3,
    padding: '6px 16px', borderRadius: 3,
    marginBottom: 24,
  },
  heroTitle: {
    fontFamily: 'Orbitron, monospace',
    fontSize: 'clamp(52px, 10vw, 100px)',
    fontWeight: 900, lineHeight: 0.95,
    color: '#f0f0f8', letterSpacing: -1,
    marginBottom: 24,
  },
  heroAccent: {
    color: 'transparent',
    WebkitTextStroke: '2px #ff4d00',
    textShadow: '0 0 40px rgba(255,77,0,0.4)',
  },
  heroSub: {
    fontFamily: 'Exo 2, sans-serif',
    fontSize: 18, color: '#8080a0',
    lineHeight: 1.6, marginBottom: 36,
    maxWidth: 480,
  },
  heroBtns: { display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 },
  primaryBtn: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #ff4d00, #ff9900)',
    color: '#000', fontWeight: 800,
    fontFamily: 'Orbitron, monospace',
    fontSize: 14, letterSpacing: 1,
    padding: '14px 28px', borderRadius: 5,
    textDecoration: 'none',
  },
  secondaryBtn: {
    display: 'inline-block',
    border: '2px solid rgba(255,77,0,0.5)',
    color: '#ff9900',
    fontWeight: 700, fontFamily: 'Rajdhani, sans-serif',
    fontSize: 16, letterSpacing: 1,
    padding: '12px 24px', borderRadius: 5,
    textDecoration: 'none',
  },
  heroContact: {
    display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
  },
  heroContactLabel: {
    fontSize: 11, color: '#4a4a6a',
    letterSpacing: 2, fontFamily: 'Orbitron, monospace', fontWeight: 700,
  },
  heroPhone: {
    color: '#ff4d00', fontSize: 20,
    fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
    textDecoration: 'none',
  },
  waLink: {
    background: '#25d366', color: '#000',
    fontWeight: 700, fontSize: 13,
    padding: '6px 14px', borderRadius: 4,
    textDecoration: 'none',
    fontFamily: 'Rajdhani, sans-serif',
  },
  statsBar: {
    display: 'flex', justifyContent: 'center', gap: '3rem',
    flexWrap: 'wrap',
    padding: '1.5rem',
    background: 'rgba(255,77,0,0.04)',
    borderTop: '1px solid rgba(255,77,0,0.1)',
    marginTop: 'auto',
  },
  statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 },
  statNum: {
    fontFamily: 'Orbitron, monospace',
    fontWeight: 900, fontSize: 26,
    color: '#ff4d00',
  },
  statLabel: {
    fontSize: 11, color: '#6b6b8a',
    letterSpacing: 1.5, fontWeight: 600,
    fontFamily: 'Rajdhani, sans-serif',
    textTransform: 'uppercase',
  },
  section: { padding: '4rem 0' },
  sectionInner: { maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' },
  sectionHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Orbitron, monospace',
    fontSize: 22, fontWeight: 900,
    color: '#e8e8f0', letterSpacing: 2,
    borderLeft: '4px solid #ff4d00',
    paddingLeft: 16,
  },
  viewAll: {
    color: '#ff4d00', fontSize: 13,
    fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
    letterSpacing: 1, textDecoration: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 24,
  },
  empty: { color: '#6b6b8a', fontFamily: 'Exo 2, sans-serif' },
  rulesSection: {
    background: 'rgba(255,77,0,0.03)',
    borderTop: '1px solid rgba(255,77,0,0.08)',
    borderBottom: '1px solid rgba(255,77,0,0.08)',
    padding: '4rem 0',
  },
  rulesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 16, marginTop: 32,
  },
  ruleCard: {
    display: 'flex', gap: 12, alignItems: 'flex-start',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 6, padding: '1rem',
  },
  ruleIcon: { fontSize: 24, flexShrink: 0 },
  ruleText: {
    fontFamily: 'Exo 2, sans-serif',
    fontSize: 14, color: '#8080a0', lineHeight: 1.5,
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 20,
  },
  resultCard: {
    background: 'linear-gradient(145deg, #0d0d14, #10101a)',
    border: '1px solid rgba(255,215,0,0.15)',
    borderRadius: 8, padding: '1.25rem',
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  resultTournament: {
    fontFamily: 'Orbitron, monospace',
    fontSize: 13, fontWeight: 700, color: '#e8e8f0',
  },
  resultDate: { fontSize: 12, color: '#4a4a6a', fontFamily: 'Exo 2, sans-serif' },
  podium: { display: 'flex', flexDirection: 'column', gap: 4 },
  podiumItem: { display: 'flex', alignItems: 'center', gap: 8 },
  podiumMedal: { fontSize: 18 },
  podiumName: { fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 16, color: '#c8c8dc' },
  mvp: {
    background: 'rgba(255,215,0,0.06)',
    border: '1px solid rgba(255,215,0,0.15)',
    borderRadius: 4, padding: '6px 10px',
    fontSize: 13, color: '#ffd700',
    fontFamily: 'Exo 2, sans-serif',
  },
  cta: {
    padding: '5rem 0',
    background: 'linear-gradient(135deg, rgba(255,77,0,0.08), rgba(255,153,0,0.05))',
    borderTop: '1px solid rgba(255,77,0,0.15)',
    textAlign: 'center',
  },
  ctaTitle: {
    fontFamily: 'Orbitron, monospace',
    fontSize: 36, fontWeight: 900,
    color: '#e8e8f0', letterSpacing: 2, marginBottom: 12,
  },
  ctaSub: {
    fontFamily: 'Exo 2, sans-serif',
    fontSize: 16, color: '#6b6b8a', marginBottom: 32,
  },
  ctaBtns: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' },
  waBtn: {
    display: 'inline-block',
    background: '#25d366', color: '#000',
    fontWeight: 800, fontFamily: 'Rajdhani, sans-serif',
    fontSize: 16, padding: '14px 28px', borderRadius: 5,
    textDecoration: 'none',
  },
};
