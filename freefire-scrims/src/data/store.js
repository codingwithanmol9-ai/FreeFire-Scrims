// src/data/store.js
// Simple localStorage-based store for tournaments, registrations, results

const KEYS = {
  TOURNAMENTS: 'ff_tournaments',
  REGISTRATIONS: 'ff_registrations',
  RESULTS: 'ff_results',
  ADMIN_PASS: 'ff_admin_pass',
};

const DEFAULT_TOURNAMENTS = [
  {
    id: '1',
    name: 'FF Scrims S1 - Bermuda Blitz',
    date: '2026-06-15',
    time: '20:00',
    mode: 'Squad',
    map: 'Bermuda',
    slots: 12,
    filled: 7,
    entryFee: 'Free',
    prizePool: '₹500',
    status: 'upcoming',
    roomId: '',
    roomPass: '',
    rules: [
      'No hacking / cheating. Instant ban.',
      'Squad of 4 required. Solo/duo not allowed.',
      'Must join 10 min before match.',
      'Screenshot of final result mandatory.',
      'Admin decision is final.',
    ],
    createdAt: Date.now(),
  },
  {
    id: '2',
    name: 'FF Scrims S1 - Kalahari Clash',
    date: '2026-06-22',
    time: '21:00',
    mode: 'Squad',
    map: 'Kalahari',
    slots: 12,
    filled: 4,
    entryFee: '₹20/team',
    prizePool: '₹1000',
    status: 'upcoming',
    roomId: '',
    roomPass: '',
    rules: [
      'Entry fee must be paid before slot confirmation.',
      'No hacking / cheating. Instant ban.',
      'Squad of 4 required.',
      'Must join lobby 10 min before match.',
      'Admin decision is final.',
    ],
    createdAt: Date.now() - 86400000,
  },
];

const DEFAULT_RESULTS = [
  {
    id: 'r1',
    tournamentName: 'FF Scrims Warm-up Cup',
    date: '2026-06-01',
    winner: 'Team BEAST',
    second: 'Shadow Killers',
    third: 'RapidFire GG',
    mvp: 'BEAST_Arjun',
    kills: 18,
  },
];

export function initStore() {
  if (!localStorage.getItem(KEYS.TOURNAMENTS)) {
    localStorage.setItem(KEYS.TOURNAMENTS, JSON.stringify(DEFAULT_TOURNAMENTS));
  }
  if (!localStorage.getItem(KEYS.REGISTRATIONS)) {
    localStorage.setItem(KEYS.REGISTRATIONS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.RESULTS)) {
    localStorage.setItem(KEYS.RESULTS, JSON.stringify(DEFAULT_RESULTS));
  }
  if (!localStorage.getItem(KEYS.ADMIN_PASS)) {
    localStorage.setItem(KEYS.ADMIN_PASS, 'admin123');
  }
}

// Tournaments
export function getTournaments() {
  return JSON.parse(localStorage.getItem(KEYS.TOURNAMENTS) || '[]');
}
export function saveTournament(t) {
  const list = getTournaments();
  const idx = list.findIndex(x => x.id === t.id);
  if (idx >= 0) list[idx] = t;
  else list.unshift(t);
  localStorage.setItem(KEYS.TOURNAMENTS, JSON.stringify(list));
}
export function deleteTournament(id) {
  const list = getTournaments().filter(x => x.id !== id);
  localStorage.setItem(KEYS.TOURNAMENTS, JSON.stringify(list));
}

// Registrations
export function getRegistrations() {
  return JSON.parse(localStorage.getItem(KEYS.REGISTRATIONS) || '[]');
}
export function addRegistration(reg) {
  const list = getRegistrations();
  list.push({ ...reg, id: Date.now().toString(), createdAt: Date.now() });
  localStorage.setItem(KEYS.REGISTRATIONS, JSON.stringify(list));
  // Increment filled count
  const tournaments = getTournaments();
  const t = tournaments.find(x => x.id === reg.tournamentId);
  if (t) { t.filled = (t.filled || 0) + 1; saveTournament(t); }
}
export function deleteRegistration(id) {
  const list = getRegistrations().filter(x => x.id !== id);
  localStorage.setItem(KEYS.REGISTRATIONS, JSON.stringify(list));
}

// Results
export function getResults() {
  return JSON.parse(localStorage.getItem(KEYS.RESULTS) || '[]');
}
export function saveResult(r) {
  const list = getResults();
  const idx = list.findIndex(x => x.id === r.id);
  if (idx >= 0) list[idx] = r;
  else list.unshift(r);
  localStorage.setItem(KEYS.RESULTS, JSON.stringify(list));
}
export function deleteResult(id) {
  const list = getResults().filter(x => x.id !== id);
  localStorage.setItem(KEYS.RESULTS, JSON.stringify(list));
}

// Auth
export function checkAdminPass(pass) {
  return localStorage.getItem(KEYS.ADMIN_PASS) === pass;
}
export function updateAdminPass(pass) {
  localStorage.setItem(KEYS.ADMIN_PASS, pass);
}
