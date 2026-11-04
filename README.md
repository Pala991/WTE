# WhatToEat? (WTE)

WTE is a static web app that helps users plan lunch and dinner for the next shopping cycle, generate a smart grocery list, and learn from meal ratings over time.

Live URL: https://pala991.github.io/WTE/

The app is designed to be deployed on **GitHub Pages** and supports:

- user authentication (email/password, Google, Apple) through Firebase Auth
- personal settings and history per user
- shopping-cycle planning (default 7 days, anchored to Saturday)
- cuisine, diet, budget, timing, allergy and household constraints
- user-selectable app language (English / Italian)
- meal swaps with automatic grocery-list updates
- seasonal ingredient adaptations (for example, preserved tomato products in winter)

> If Firebase is not configured yet, the app runs in **local demo mode** (email/password only, stored in localStorage) so you can test all planning features immediately.

---

## Project structure

```text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── constants.js
│   ├── data-service.js
│   ├── firebase-client.js
│   ├── firebase-config.js
│   ├── i18n.js
│   ├── planner.js
│   ├── recipes.js
│   ├── seasonality.js
│   ├── ui.js
│   └── utils.js
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   └── FIREBASE_SETUP.md
└── .github/workflows/
    └── deploy-pages.yml
```

---

## Quick start (local)

No build step is required.

1. Clone the repo.
2. Run a static server from the repository root:

   ```bash
   python3 -m http.server 4173
   ```

3. Open `http://localhost:4173`.

---

## Firebase setup (for production auth + cloud data)

The app reads config from:

- [`js/firebase-config.js`](./js/firebase-config.js)

Fill this file with your Firebase project values and enable providers in Firebase Console.

See full guide: [docs/FIREBASE_SETUP.md](./docs/FIREBASE_SETUP.md)

---

## Deploy to GitHub Pages

This repository includes an Actions workflow:

- [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml)

Steps:

1. Push to `main`.
2. In GitHub repo settings, enable **Pages** and choose **GitHub Actions** as source.
3. The workflow deploys the app automatically.

Detailed instructions: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)

---

## Core behavior implemented

- **Authentication**
  - Email/password sign up and sign in
  - Google and Apple popup sign in (when Firebase is configured)
- **User settings**
  - shopping interval days
  - shopping weekday anchor
  - budget range (EUR)
  - app language (English / Italian)
  - multi-select cuisines (Italian default)
  - diet profile
  - difficulty
  - max prep time
  - household adults + children ages
  - common allergies/intolerances
- **Planner**
  - lunch+dinner slots for the cycle
  - scored recipe selection using preferences and past ratings
  - seasonal substitutions and warnings
  - child-specific warnings with alternatives
- **Meal cards**
  - date, lunch/dinner label, recipe title
  - dish image
  - ingredients
  - prep time + swap button
  - preparation steps
  - rating controls (1-5)
- **Shopping list**
  - expandable panel
  - aggregated ingredients, quantities, units
  - estimated budget range and target check
- **History**
  - per-user plan snapshots
  - load a previous plan

---

## Architecture notes

High-level design: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
