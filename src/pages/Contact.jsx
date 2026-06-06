// src/pages/Contact.jsx
export default function Contact() {
  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <h1 style={styles.title}>CONTACT US</h1>
        <p style={styles.sub}>Reach out for registrations, queries, or scrim bookings</p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.icon}>📞</div>
            <h3 style={styles.cardTitle}>CALL / WHATSAPP</h3>
            <a href="tel:8780012870" style={styles.phone}>8780012870</a>
            <p style={styles.cardSub}>Available 10 AM – 10 PM daily</p>
            <a href="https://wa.me/918780012870" target="_blank" rel="noreferrer" style={styles.waBtn}>
              💬 Open WhatsApp
            </a>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>⚡</div>
            <h3 style={styles.cardTitle}>QUICK LINKS</h3>
            <div style={styles.quickLinks}>
              <a href="https://wa.me/918780012870?text=Hi%20I%20want%20to%20register%20for%20scrim"
                target="_blank" rel="noreferrer" style={styles.quickLink}>
                📝 Register via WhatsApp
              </a>
              <a href="https://wa.me/918780012870?text=Hi%20I%20need%20Room%20ID"
                target="_blank" rel="noreferrer" style={styles.quickLink}>
                🚪 Ask for Room ID
              </a>
              <a href="https://wa.me/918780012870?text=Hi%20I%20want%20to%20enquire%20about%20scrims"
                target="_blank" rel="noreferrer" style={styles.quickLink}>
                ❓ General Enquiry
              </a>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>🕐</div>
            <h3 style={styles.cardTitle}>SCRIM SCHEDULE</h3>
            <div style={styles.schedule}>
              {[
                { day: 'Weekdays', time: 'Varies (check Tournaments)' },
                { day: 'Weekends', time: '8 PM – 10 PM IST' },
                { day: 'Special Events', time: 'Announced on WhatsApp' },
              ].map(s => (
                <div key={s.day} style={styles.scheduleRow}>
                  <span style={styles.scheduleDay}>{s.day}</span>
                  <span style={styles.scheduleTime}>{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.bannerBox}>
          <div style={styles.bannerText}>
            🔥 Want to host a custom scrim or sponsor a tournament? Call us at{' '}
            <a href="tel:8780012870" style={{ color: '#ff4d00', textDecoration: 'none' }}>8780012870</a>
          </div>
        </div>
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
    borderLeft: '4px solid #ff4d00', paddingLeft: 16, marginBottom: 8,
  },
  sub: { color: '#6b6b8a', fontFamily: 'Exo 2, sans-serif', marginBottom: 40, paddingLeft: 20 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 24, marginBottom: 32,
  },
  card: {
    background: 'linear-gradient(145deg, #0d0d14, #10101a)',
    border: '1px solid rgba(255,77,0,0.15)',
    borderRadius: 8, padding: '2rem',
    display: 'flex', flexDirection: 'column', gap: '0.75rem',
  },
  icon: { fontSize: 40 },
  cardTitle: {
    fontFamily: 'Orbitron, monospace', fontSize: 14,
    fontWeight: 700, color: '#ff9900', letterSpacing: 1,
  },
  phone: {
    fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 28,
    color: '#ff4d00', textDecoration: 'none',
    textShadow: '0 0 20px rgba(255,77,0,0.4)',
  },
  cardSub: { fontSize: 13, color: '#6b6b8a', fontFamily: 'Exo 2, sans-serif' },
  waBtn: {
    display: 'inline-block', background: '#25d366',
    color: '#000', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif',
    fontSize: 14, padding: '10px 20px', borderRadius: 4,
    textDecoration: 'none', width: 'fit-content',
  },
  quickLinks: { display: 'flex', flexDirection: 'column', gap: 8 },
  quickLink: {
    display: 'block',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 5, padding: '10px 14px',
    color: '#c0c0d8', fontSize: 14,
    fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
    textDecoration: 'none', transition: 'border-color 0.2s',
  },
  schedule: { display: 'flex', flexDirection: 'column', gap: 10 },
  scheduleRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 8,
  },
  scheduleDay: { fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#c0c0d8', fontSize: 15 },
  scheduleTime: { fontSize: 13, color: '#6b6b8a', fontFamily: 'Exo 2, sans-serif' },
  bannerBox: {
    background: 'rgba(255,77,0,0.06)',
    border: '1px solid rgba(255,77,0,0.2)',
    borderRadius: 8, padding: '1.25rem 1.5rem',
  },
  bannerText: {
    fontFamily: 'Rajdhani, sans-serif', fontSize: 16,
    color: '#a0a0c0', lineHeight: 1.6,
  },
};
