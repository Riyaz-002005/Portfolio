# NOVAForge - Personal Gamer Command Center & Dashboard

A cross-platform personal gamer command center web application built with **HTML5**, **CSS3**, and **Vanilla JavaScript**. Designed for gamers to track completed titles, total playtimes, AI game recommendations, cross-platform account sync (Xbox, PlayStation, Steam, Epic Games), trophy showcases, and NVIDIA hardware news.

---

## 🌟 Key Features

### 🔐 Page 1: Gamer Login Portal (`index.html`)
- **Interactive Canvas Particles**: Ambient 60FPS particle background connected by dynamic vectors and mouse attraction.
- **Glassmorphic Login Card**: Floating animation with backdrop blur (`backdrop-filter: blur()`), neon glowing borders, and focus animations.
- **Gamer Authentication**:
  - GamerTag / Username, Email Address, and Password validation.
  - Password field with eye-icon Show/Hide toggle button.
  - Custom neon "Stay Signed In" checkbox & "Recover Passkey?" modal.
  - Interactive "LAUNCH COMMAND CENTER" submit button with authentication spinner state.
  - Direct "Continue as Guest Gamer" quick access.
- **Cross-Platform Account Sync Sign-In**: Direct OAuth triggers for **Steam**, **PlayStation Network (PSN)**, **Xbox Network**, and **Epic Games Store**.
- **Session State**: Saves gamer profile credentials to `localStorage` and smoothly redirects to `landing.html`.

---

### 🎮 Page 2: Gamer Command Center Dashboard (`landing.html`)
- **HUD Preloader**: Futuristic progress percentage loader syncing gamer profile data before revealing the dashboard.
- **Sticky Glass Navigation Bar**:
  - Logo: `🎮 NOVAForge`
  - Links: Home, Finished Games, Next To Play, Platforms, Achievements, News & NVIDIA, Squad, Contact.
  - **Gamer Badge**: Avatar, GamerTag, Level 45, XP indicator, and platform sync badges.
- **Hero Section (Command Center Overview)**:
  - Fullscreen AAA gaming cover background with dark overlay & cursor follower glow.
  - Title: *"Welcome Back, Legendary Gamer"*
  - Subtitle typing text loop: *"Track Your Playtime • Celebrate Achievements • Discover What To Play Next"*.
  - **Live Gamer Stats Ribbon**:
    - 1,480 Total Hours Played
    - 42 Titles Finished
    - 1,250 Trophies Unlocked
    - #142 Global Gamer Rank
- **Finished Games & Playtime Showcase**:
  - 8 Completed AAA Game Cards featuring cover art, total hours played, completion badges (100% Platinum, 100% Mastered, Story Complete), review scores, and play log modal:
    1. *Cyberpunk 2077* (140 Hours Played | 100% Platinum)
    2. *Red Dead Redemption 2* (210 Hours Played | 100% Mastered)
    3. *Marvel's Spider-Man 2* (60 Hours Played | Platinum Trophy)
    4. *God of War Ragnarok* (85 Hours Played | Story Complete)
    5. *Ghost of Tsushima* (95 Hours Played | 100% Platinum)
    6. *The Last of Us Part II* (55 Hours Played | Story Complete)
    7. *Resident Evil Requiem* (40 Hours Played | S-Rank Survivor)
    8. *007 First Light* (35 Hours Played | Agent 00 Level)
- **"What To Play Next" AI Recommendation Engine**:
  - Smart recommendations calculated based on your recently completed games:
    - Finished *God of War Ragnarok*? -> Recommended: *Black Myth Wukong* (98% Match Rate)
    - Finished *Cyberpunk 2077*? -> Recommended: *Aether Shift 2099* (96% Match Rate)
    - Finished *Resident Evil Requiem*? -> Recommended: *Silent Hill 2 Remake* (95% Match Rate)
  - Interactive "Add to Backlog" and "Match Details" modal triggers.
- **Connected Platforms & Accounts Hub**:
  - Interactive platform cards for **Steam**, **PlayStation Network**, **Xbox Network**, and **Epic Games Store**.
  - Gamerscore, trophy level, total games synced, and "Sync Library Now" live simulator modal.
- **Player Achievements & Stats Counters**:
  - Animated count-up counters (1,480 Total Hours Played, 42 Finished Games, 1,250 Trophies Unlocked, 98.4% Win Rate).
  - Trophy Badges (*Legendary Hunter*, *Master Explorer*, *Ultimate Survivor*, *Champion*).
- **Gaming & NVIDIA Tech News Dispatches**:
  - News grid covering GPU hardware leaks, digital store sales, and subscription lineups:
    1. *NVIDIA DLSS 4.0 & RTX 5090 Blackwell Architecture Unveiled*
    2. *Steam Summer Mega Sale: Up to 90% Off AAA Titles*
    3. *PlayStation Plus & Xbox Game Pass Monthly Additions Announced*
- **Gamer Squad Reviews**:
  - Auto-sliding testimonial carousel featuring squad reviews and gamer feedback.
- **Gamer Support & Squad Invite Form**:
  - Contact form for submitting squad invites, feedback, or support.
- **Footer**:
  - 4-column footer with quick links, social media channels (Discord, Steam, PlayStation, Xbox, Twitter), newsletter broadcast, copyright © 2026 NOVAForge, and Back To Top button.

---

## 🛠️ Technology Stack

- **HTML5**: Pure semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`).
- **CSS3**: Vanilla CSS, CSS Custom Variables, Flexbox, Grid, Glassmorphism backdrop-filter, Keyframe Animations.
- **JavaScript**: Pure Vanilla ES6+ JavaScript, Canvas API, IntersectionObserver, LocalStorage, HTML5 DOM Manipulation.
- **Dependencies**: Font Awesome 6.5.1 (Icons), Google Fonts (Orbitron, Rajdhani, Inter). **No JS or CSS frameworks (No Bootstrap, React, Tailwind, jQuery)**.

---

## 📁 Folder Structure

```
NOVAForge/
├── index.html            # Page 1: Gamer Login Portal
├── landing.html          # Page 2: Gamer Command Center Dashboard
├── README.md             # Project documentation
├── css/
│   ├── style.css         # Gamer Login Page styles
│   └── landing.css       # Gamer Dashboard styles
├── js/
│   ├── script.js        # Gamer Login Page interactivity
│   └── landing.js       # Gamer Dashboard interactivity
└── images/
    ├── logo.png          # NOVAForge emblem
    ├── hero.jpg          # AAA gamer wallpaper
    ├── game1.jpg ... game8.jpg # Game cover artworks
```

---

## 🚀 How to Run Locally

1. Open `index.html` directly in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. Enter your GamerTag (e.g. `CyberKnight_99`), email, and password, or click **Continue as Guest Gamer**.
3. You will be automatically redirected to `landing.html` with full interactive gamer command center features enabled!
