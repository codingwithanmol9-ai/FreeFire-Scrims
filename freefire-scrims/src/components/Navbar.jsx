// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CONTACT = '8780012870';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/tournaments', label: 'Tournaments' },
    { to: '/results', label: 'Results' },
    { to: '/register', label: 'Register' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🔥</span>
          <span style={styles.logoText}>FF<span style={styles.logoAccent}>SCRIMS</span></span>
        </Link>

        {/* Desktop */}
        {!isMobile && <div style={styles.links}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              ...styles.link,
              ...(pathname === l.to ? styles.linkActive : {})
            }}>{l.label}</Link>
          ))}
        </div>}

        {!isMobile && <a href={`tel:${CONTACT}`} style={styles.callBtn}>
          📞 {CONTACT}
        </a>}

        {/* Mobile toggle */}
        {isMobile && <button style={{background:'none',border:'none',color:'#ff4d00',fontSize:24}} onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>}
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={styles.mobile}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={styles.mobileLink}
              onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <a href={`tel:${CONTACT}`} style={styles.mobileCall}>📞 {CONTACT}</a>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(5,5,7,0.92)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255,77,0,0.2)',
    boxShadow: '0 4px 30px rgba(255,77,0,0.08)',
  },
  inner: {
    maxWidth: 1200, margin: '0 auto',
    padding: '0 1.5rem',
    height: 64,
    display: 'flex', alignItems: 'center', gap: '2rem',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    textDecoration: 'none',
  },
  logoIcon: { fontSize: 24 },
  logoText: {
    fontFamily: 'Orbitron, monospace',
    fontWeight: 900, fontSize: 20,
    color: '#e8e8f0',
    letterSpacing: 2,
  },
  logoAccent: { color: '#ff4d00' },
  links: { display: 'flex', gap: '1.5rem', marginLeft: 'auto' },
  link: {
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 600, fontSize: 15,
    color: '#9090a8',
    letterSpacing: 1,
    textTransform: 'uppercase',
    transition: 'color 0.2s',
    padding: '4px 0',
    borderBottom: '2px solid transparent',
  },
  linkActive: {
    color: '#ff4d00',
    borderBottom: '2px solid #ff4d00',
  },
  callBtn: {
    background: 'linear-gradient(135deg, #ff4d00, #ff9900)',
    color: '#000',
    fontWeight: 700,
    fontSize: 13,
    padding: '8px 16px',
    borderRadius: 4,
    letterSpacing: 0.5,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    fontFamily: 'Rajdhani, sans-serif',
  },
  burger: {
    display: 'none',
    background: 'none', border: 'none',
    color: '#ff4d00', fontSize: 24,
    '@media(max-width:768px)': { display: 'block' },
  },
  mobile: {
    display: 'flex', flexDirection: 'column',
    background: '#0d0d12',
    borderTop: '1px solid rgba(255,77,0,0.15)',
    padding: '1rem 1.5rem',
    gap: '0.75rem',
  },
  mobileLink: {
    fontFamily: 'Rajdhani, sans-serif',
    fontWeight: 600, fontSize: 18,
    color: '#9090a8',
    textTransform: 'uppercase', letterSpacing: 1,
    textDecoration: 'none',
    padding: '0.25rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  mobileCall: {
    color: '#ff4d00', fontWeight: 700,
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: 16, marginTop: 4,
    textDecoration: 'none',
  },
};
