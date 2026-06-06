# 🔥 FF Scrims — Free Fire Esports Tournament App

A full-featured Free Fire scrim management web app with public pages and an admin control panel.

## 📱 Features

### Public Pages
- **Home** — Hero section, upcoming tournaments, rules, recent results, CTA
- **Tournaments** — Filter by status (upcoming / live / completed), slot bars, room ID display
- **Register** — Squad registration form with validation, links to WhatsApp
- **Results** — Podium display with MVP highlights
- **Contact** — Call/WhatsApp links, schedule, quick contact buttons

### 🔐 Admin Panel (`/admin`)
- Login with password (default: `admin123`)
- **Manage Tournaments** — Add, edit, delete tournaments. Set room ID, password, status, slots
- **View Registrations** — Search by team/player, filter by tournament, delete entries
- **Manage Results** — Add/edit/delete match results with winner, 2nd, 3rd, MVP
- **Settings** — Change admin password

## 📞 Contact Number
**8780012870** (displayed throughout the app)

## 🚀 Getting Started

```bash
npm install
npm start
```

## 📦 Build for Production
```bash
npm run build
```

## 🌐 Deploy to GitHub Pages
```bash
npm install -g gh-pages
# In package.json add: "homepage": "https://yourusername.github.io/freefire-scrims"
# Then add scripts:
#   "predeploy": "npm run build"
#   "deploy": "gh-pages -d build"
npm run deploy
```

## 📂 Project Structure
```
src/
  data/
    store.js          ← localStorage data layer (tournaments, registrations, results)
  components/
    Navbar.jsx
    Footer.jsx
    TournamentCard.jsx
  pages/
    Home.jsx
    Tournaments.jsx
    Register.jsx
    Results.jsx
    Contact.jsx
    Admin.jsx
  App.jsx
  index.js
  index.css
```

## 🔑 Admin Access
- URL: `/admin`
- Default password: `admin123`
- Change password in Admin → Settings tab

## 🛠 Tech Stack
- React 18
- React Router v6
- localStorage (no backend needed)
- Google Fonts: Orbitron, Rajdhani, Exo 2
