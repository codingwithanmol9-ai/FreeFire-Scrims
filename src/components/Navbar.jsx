// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CONTACT = '8780012870';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/tournaments', label: 'Tournaments' },
    { to: '/results', label: 'Results' },
    { to: '/register', label: 'Register' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.inner}>
          <Link to="/" style={styles.logo}>
            <span style={styles.logoIcon}>🔥</span>
            <span style={styles.logoText}>FF<span style={styles.logoAccent}>SCRIMS</span></span>
          </Link>

          {/* Desktop links */}
          <div style={styles.desktopLinks}>
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                ...styles.link,
                ...(pathname === l.to ? styles.linkActive : {})
              }}>{l.label}</Link>
            ))}
            <a href={`tel:${CONTACT}`} style={styles.callBtn}>📞 {CONTACT}</a>
          </div>

          {/* Mobile right side */}
          <div style={styles.mobileRight}>
            <a href={`tel:${CONTACT}`} style={styles.mobileCall}>📞</a>
            <button style={styles.burger} onClick={() => setOpen(!open)}>
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div style={styles.overlay} onClick={() => setOpen(false)}>
          <div style={styles.drawer} onClick={e => e.stopPropagation()}>
            <div style={styles.drawerHeader}>
              <span style={styles.drawerLogo}>🔥 FF<span style={{ color: '#ff4d00' }}>SCRIMS</span></span>
              <button style={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
            </div>
            {links.map(l => (
              <Link key={l.to} to={l.to}
                style={{ ...styles.drawerLink, ...(pathname === l.to ? styles.drawerLinkActive : {}) }}
                onClick={() => setOpen(false)}>
                {l.label}
                <span style={styles.arrow}>›</span>
              </Link>
            ))}
            <div style={styles.drawerFooter}>
              <a href={`tel:${CONTACT}`} style={styles.drawerCall}>📞 {CONTACT}</a>
              <a href={`https://wa.me/91${CONTACT}`} target="_blank" rel="noreferrer" style={styles.drawerWa}>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(5,5,7,0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,77,0,0.15)',
  },
  inner: {
    maxWidth: 1200, margin: '0 auto',
    padding: '0 1rem',
    height: 56,
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: { display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' },
  logoIcon: { fontSize: 22 },
  logoText: {
    fontFamily: 'Nunito, sans-serif',
    fontWeight: 900, fontSize: 20,
    color: '#e8e8f0', letterSpacing: 1,
  },
  logoAccent: { color: '#ff4d00' },
  desktopLinks: {
    display: 'flex', alignItems: 'center', gap: '1.5rem',
    '@media(max-width:768px)': { display: 'none' },
  },
  link: {
    fontFamily: 'Nunito, sans-serif',
    fontWeight: 700, fontSize: 14,
    color: '#9090a8', letterSpacing: 0.5,
    textTransform: 'uppercase',
    padding: '4px 0',
    borderBottom: '2px solid transparent',
    textDecoration: 'none',
  },
  linkActive: { color: '#ff4d00', borderBottom: '2px solid #ff4d00' },
  callBtn: {
    background: 'linear-gradient(135deg, #ff4d00, #ff9900)',
    color: '#000', fontWeight: 800,
    fontSize: 13, padding: '7px 14px',
    borderRadius: 20, textDecoration: 'none',
    fontFamily: 'Nunito, sans-serif',
    whiteSpace: 'nowrap',
  },
  mobileRight: {
    display: 'none',
    alignItems: 'center', gap: 8,
    // shown via media query in CSS
  },
  mobileCall: {
    fontSize: 22, textDecoration: 'none',
  },
  burger: {
    background: 'rgba(255,77,0,0.1)',
    border: '1px solid rgba(255,77,0,0.3)',
    color: '#ff4d00', fontSize: 20,
    width: 40, height: 40, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  overlay: {
    position: 'fixed', inset: 0, zIndex: 200,
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
  },
  drawer: {
    position: 'absolute', top: 0, right: 0,
    width: '75%', maxWidth: 300,
    height: '100vh',
    background: 'rgba(10,10,18,0.97)',
    backdropFilter: 'blur(30px)',
    borderLeft: '1px solid rgba(255,77,0,0.15)',
    display: 'flex', flexDirection: 'column',
    padding: '1.5rem',
    gap: '0.25rem',
  },
  drawerHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '1.5rem',
  },
  drawerLogo: {
    fontFamily: 'Nunito, sans-serif',
    fontWeight: 900, fontSize: 20, color: '#e8e8f0',
  },
  closeBtn: {
    background: 'rgba(255,255,255,0.08)',
    border: 'none', color: '#fff',
    width: 36, height: 36, borderRadius: 10,
    fontSize: 16, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
  },
  drawerLink: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Nunito, sans-serif',
    fontWeight: 700, fontSize: 18,
    color: '#a0a0c0',
    padding: '14px 12px',
    borderRadius: 10, textDecoration: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  drawerLinkActive: {
    color: '#ff4d00',
    background: 'rgba(255,77,0,0.08)',
  },
  arrow: { fontSize: 22, color: '#3a3a55' },
  drawerFooter: {
    marginTop: 'auto',
    display: 'flex', flexDirection: 'column', gap: 10,
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  drawerCall: {
    color: '#ff4d00',
    fontFamily: 'Nunito, sans-serif',
    fontWeight: 800, fontSize: 20,
    textDecoration: 'none',
  },
  drawerWa: {
    background: '#25d366', color: '#000',
    fontWeight: 800, fontFamily: 'Nunito, sans-serif',
    fontSize: 15, padding: '12px',
    borderRadius: 12, textAlign: 'center',
    textDecoration: 'none',
  },
};