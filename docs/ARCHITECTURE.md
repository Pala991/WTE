# WTE Architecture

## Overview

WTE is a static single-page app built with plain HTML/CSS/JavaScript (ES modules).

- No framework
- No build step
- GitHub Pages compatible

The app has two runtime modes:

1. **Firebase mode** (production): authentication + cloud persistence.
2. **Demo mode** (fallback): localStorage-based auth + persistence.

## Frontend modules

- `js/app.js`  
  Main orchestrator, event wiring, state lifecycle.

- `js/planner.js`  
  Meal slot generation, recipe scoring, swap logic, shopping-list aggregation, budget estimation.

- `js/recipes.js`  
  Curated recipe dataset (metadata, ingredients, steps, allergies, tags).

- `js/seasonality.js`  
  Seasonal substitutions (for example tomato -> preserved tomato in winter) and notes.

- `js/ui.js`  
  DOM rendering for settings, preview, shopping list, meal cards, and history.

- `js/i18n.js`  
  Runtime localization dictionary and translation helpers (English/Italian).

- `js/auth.js`  
  Authentication abstraction for Firebase mode and local demo mode.

- `js/data-service.js`  
  User data persistence abstraction (Firestore/localStorage).

- `js/firebase-client.js` + `js/firebase-config.js`  
  Firebase initialization and configuration.

## Data model (per user)

Stored as one object:

- `settings`
- `ratings` (recipe feedback history)
- `currentPlan`
- `history` (up to 10 snapshots)

`settings` includes `language`, so the selected UI language is persisted per user.

In Firebase mode this is stored in:

- `users/{uid}` document

## Planning engine

For each cycle:

1. Build meal slots (`lunch`, `dinner`) for N days.
2. Apply strict filters:
   - allergies/intolerances
   - cuisine preferences
   - diet profile
   - difficulty
   - max prep time
3. Relax constraints progressively only when needed.
4. Score candidates using:
   - user ratings
   - cuisine match
   - prep time fit
   - diversity (avoid repetition)
   - diet-focused bonuses
5. Aggregate ingredients into the shopping list.
6. Estimate budget range.

## Child warnings and alternatives

Meal cards can display warnings for younger children (for example mushrooms or chili), with practical alternatives such as separate preparation.

## Deployment model

- GitHub Actions workflow publishes repository contents directly to GitHub Pages.
- No bundling required.
