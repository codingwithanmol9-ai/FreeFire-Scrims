// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.brand}>
          <span style={styles.logoText}>🔥 FF<span style={styles.acc}>SCRIMS</span></span>
          <p style={styles.tagline}>Competitive Free Fire Scrims — India's Finest</p>
        </div>
        <div style={styles.links}>
          <Link to="/tournaments" style={styles.link}>Tournaments</Link>
          <Link to="/results" style={styles.link}>Results</Link>
          <Link to="/register" style={styles.link}>Register</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
          <Link to="/admin" style={styles.link}>Admin</Link>
        </div>
        <div style={styles.contact}>
          <p style={styles.contactLabel}>CONTACT / WHATSAPP</p>
          <a href="tel:8780012870" style={styles.contactNum}>📞 8780012870</a>
          <a href="https://wa.me/918780012870" target="_blank" rel="noreferrer" style={styles.waBtn}>
            💬 WhatsApp Us
          </a>
        </div>
      </div>
      <div style={styles.bottom}>
        <span style={styles.copy}>© 2026 FF Scrims. All rights reserved. Built for champions.</span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: '#080810',
    borderTop: '1px solid rgba(255,77,0,0.15)',
    marginTop: 80,
  },
  inner: {
    maxWidth: 1200, margin: '0 auto',
    padding: '3rem 1.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
  },
  brand: {},
  logoText: {
    fontFamily: 'Orbitron, monospace',
    fontWeight: 900, fontSize: 22,
    color: '#e8e8f0',
  },
  acc: { color: '#ff4d00' },
  tagline: {
    color: '#6b6b8a', fontSize: 13,
    fontFamily: 'Exo 2, sans-serif',
    marginTop: 8,
  },
  links: {
    display: 'flex', flexDirection: 'column', gap: '0.5rem',
  },
  link: {
    color: '#6b6b8a', fontSize: 14,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 600, letterSpacing: 1,
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  contact: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  contactLabel: {
    color: '#6b6b8a', fontSize: 11,
    letterSpacing: 2, fontWeight: 700,
    fontFamily: 'Orbitron, monospace',
  },
  contactNum: {
    color: '#ff4d00', fontSize: 20,
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 700, textDecoration: 'none',
  },
  waBtn: {
    background: '#25d366',
    color: '#000', fontWeight: 700,
    padding: '8px 16px', borderRadius: 4,
    fontSize: 13, width: 'fit-content',
    fontFamily: 'Rajdhani, sans-serif',
    textDecoration: 'none',
  },
  bottom: {
    borderTop: '1px solid rgba(255,255,255,0.05)',
    padding: '1rem 1.5rem',
    textAlign: 'center',
  },
  copy: {
    color: '#3a3a55', fontSize: 12,
    fontFamily: 'Exo 2, sans-serif',
  },
};
