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
  Meal slot generation from the meal-template settings, recipe scoring, swap logic, strict no-repeat enforcement, shopping-list aggregation, budget estimation.

- `js/recipes.js`  
  Core curated recipes plus an auto-generated expanded catalog (200+) with consistent metadata, ingredients, steps, allergies, and tags.

- `js/content-localization.js`  
  Recipe-name, ingredient-name and seasonality-note localization for user-facing meal content.

- `js/seasonality.js`  
  Seasonal substitutions (for example tomato -> preserved tomato in winter) and notes.

- `js/ui.js`  
  DOM rendering for settings, preview, shopping list, meal cards, history, and meal-template editor.

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

`settings` includes:

- `language`
- `shoppingIntervalDays`
- `shoppingDay`
- `mealPlanTemplate` (lunch/dinner selection per cycle day)

This keeps both language and meal-template preferences persistent per user.

In Firebase mode this is stored in:

- `users/{uid}` document

## Planning engine

For each cycle:

1. Build meal slots from the per-day template (`lunch`, `dinner`) for N days.
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
5. Enforce recipe uniqueness across the generated cycle (no repeats).
6. Aggregate ingredients into the shopping list.
7. Estimate budget range.

## Child warnings and alternatives

Meal cards can display warnings for younger children (for example mushrooms or chili), with practical alternatives such as separate preparation.

## Deployment model

- GitHub Actions workflow publishes repository contents directly to GitHub Pages.
- No bundling required.

## App layout model

Once authenticated, the app uses a hamburger + side menu with dedicated views:

- Home: preview + generated meals
- Shopping: shopping list + regeneration action
- Settings: profile/preferences + meal-template editor
- History: historical plan snapshots
