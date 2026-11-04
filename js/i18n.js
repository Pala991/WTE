const TRANSLATIONS = {
  en: {
    "app.title": "WhatToEat? (WTE)",
    "app.subtitle":
      "Plan lunch and dinner, stay on budget, and update your shopping list automatically.",
    "auth.title": "Sign in to your account",
    "auth.label.email": "Email",
    "auth.label.password": "Password",
    "auth.button.signIn": "Sign in",
    "auth.button.signUp": "Create account",
    "auth.orContinue": "or continue with",
    "auth.button.google": "Google",
    "auth.button.apple": "Apple",
    "auth.mode.firebase":
      "Firebase authentication is active. Email, Google and Apple sign-in are enabled.",
    "auth.mode.demo":
      "Firebase is not configured. Running in local demo mode (email/password only).",
    "auth.validation.emailPasswordRequired": "Email and password are required.",
    "auth.validation.passwordMin":
      "Password must contain at least 6 characters.",
    "account.title": "Account",
    "account.button.signOut": "Sign out",
    "settings.title": "Preferences",
    "settings.label.language": "App language",
    "settings.label.shoppingIntervalDays": "Shopping interval (days)",
    "settings.label.shoppingDay": "Shopping day",
    "settings.label.budgetMin": "Budget min (EUR)",
    "settings.label.budgetMax": "Budget max (EUR)",
    "settings.label.dietProfile": "Diet profile",
    "settings.label.difficulty": "Difficulty",
    "settings.label.maxPrepMinutes": "Max preparation time (minutes)",
    "settings.label.adults": "Adults",
    "settings.label.childrenAges":
      "Children ages (comma separated, example: 4, 8)",
    "settings.placeholder.childrenAges": "4, 8",
    "settings.legend.cuisines": "Preferred cuisines",
    "settings.legend.allergies": "Allergies / intolerances",
    "settings.button.save": "Save settings",
    "settings.button.generate": "Generate plan",
    "preview.title": "Upcoming meal preview",
    "preview.cycleHint":
      "Cycle: {start} to {end} • Next shopping day: {next}",
    "preview.meal.lunch": "Lunch",
    "preview.meal.dinner": "Dinner",
    "preview.item.withRecipe": "{date} - {meal}: {recipe}",
    "preview.item.noRecipe": "{date} - {meal}",
    "plan.title": "Meal plan",
    "shopping.summaryTitle": "Shopping list",
    "shopping.empty": "Generate a plan to see your shopping list.",
    "shopping.estimated":
      "Estimated shopping cost: {estimated} ({min} - {max})",
    "shopping.target":
      "Target budget: {min} - {max} ({position} target)",
    "shopping.target.inside": "inside",
    "shopping.target.outside": "outside",
    "meal.empty": "Generate a plan to view meals.",
    "meal.meta": "Prep {minutes} min • {difficulty} • {cuisine}",
    "meal.allergenTag": "contains {allergen}",
    "meal.button.swap": "Change recipe",
    "meal.section.ingredients": "Ingredients",
    "meal.section.steps": "Preparation steps",
    "meal.rating.average":
      "Average rating: {average}/5 ({count} votes)",
    "meal.rating.none": "No rating yet. Rate this recipe:",
    "history.title": "Plan history",
    "history.empty": "No saved plan yet.",
    "history.item.title": "Plan {dateTime} ({count} meals)",
    "history.item.meta": "{start} to {end} • {budget}",
    "history.button.load": "Load this plan",
    "noscript.message": "JavaScript is required to run this application.",
    "status.planGenerated":
      "A new meal plan was generated. Shopping list and history were updated.",
    "status.settingsSaved": "Settings saved.",
    "status.mealSwapped": "Recipe changed. Shopping list updated.",
    "status.ratingSaved":
      "Rating saved. Future plans will use this feedback.",
    "status.historyLoaded": "Historical plan loaded.",
    "status.signedIn":
      "Signed in as {email}. Your settings and plan history are ready.",
    "status.signedOut": "Signed out.",
    "error.plan.generate": "Could not generate the meal plan.",
    "error.settings.save": "Could not save settings.",
    "error.meal.swap": "Could not swap this recipe.",
    "error.rating.save": "Could not save this rating.",
    "error.rating.invalid": "Invalid rating value.",
    "error.meal.notFound": "Meal not found.",
    "error.history.notFound": "Selected history entry was not found.",
    "error.history.persist":
      "Plan loaded but could not persist state.",
    "error.userData.load": "Could not load user data.",
    "error.auth.signIn": "Sign in failed.",
    "error.auth.signUp": "Sign up failed.",
    "error.auth.google": "Google sign in failed.",
    "error.auth.apple": "Apple sign in failed.",
    "error.auth.signOut": "Could not sign out.",
    "error.auth.accountExists": "An account with this email already exists.",
    "error.auth.wrongCredentials": "Wrong credentials.",
    "error.auth.googleRequiresFirebase":
      "Google sign-in is available only when Firebase is configured.",
    "error.auth.appleRequiresFirebase":
      "Apple sign-in is available only when Firebase is configured.",
    "planner.note.relaxedCuisine":
      "Cuisine preferences were relaxed for some slots.",
    "planner.note.relaxedTime":
      "Preparation time was relaxed by up to 20 minutes for some slots.",
    "planner.note.relaxedDifficulty":
      "Difficulty preference was relaxed for some slots.",
    "planner.note.relaxedDiet":
      "Diet filters were relaxed for a few meals after applying allergies and timing constraints.",
    "planner.note.strictFallback":
      "Very strict filters were detected. The planner used broad compatibility fallback.",
    "planner.warning.mushrooms":
      "Child age {age}: Mushrooms can be served separately for children under 6. Add them at the end for adults.",
    "planner.warning.chili":
      "Child age {age}: Reduce or remove chili for children under 8, then season adult portions separately.",
    "planner.warning.nuts":
      "Child age {age}: Avoid whole nuts for children under 5. Use ground nuts or omit them.",
    "planner.error.mealMissing":
      "The selected meal was not found in the current plan.",
    "planner.error.noAlternative":
      "No alternative recipe is available with the current preferences. Relax filters and try again.",
    "option.weekday.0": "Sunday",
    "option.weekday.1": "Monday",
    "option.weekday.2": "Tuesday",
    "option.weekday.3": "Wednesday",
    "option.weekday.4": "Thursday",
    "option.weekday.5": "Friday",
    "option.weekday.6": "Saturday",
    "option.language.en": "English",
    "option.language.it": "Italian",
    "option.cuisine.italian": "Italian",
    "option.cuisine.mediterranean": "Mediterranean",
    "option.cuisine.asian": "Asian",
    "option.cuisine.mexican": "Mexican",
    "option.cuisine.middle-eastern": "Middle Eastern",
    "option.cuisine.comfort": "Comfort food",
    "option.allergy.gluten": "Gluten",
    "option.allergy.lactose": "Lactose / dairy",
    "option.allergy.nuts": "Tree nuts / peanuts",
    "option.allergy.shellfish": "Shellfish",
    "option.allergy.eggs": "Eggs",
    "option.allergy.soy": "Soy",
    "option.allergy.fish": "Fish",
    "option.diet.balanced": "Balanced",
    "option.diet.vegetarian": "Vegetarian",
    "option.diet.high-protein": "High protein",
    "option.diet.light": "Light meals",
    "option.difficulty.easy": "Easy",
    "option.difficulty.medium": "Medium",
    "option.difficulty.hard": "Advanced",
    "option.nutritionFocus.legumes": "Legumes",
    "option.nutritionFocus.fish": "Fish",
    "option.nutritionFocus.meat": "Meat",
    "option.nutritionFocus.whole-grains": "Whole grains",
    "option.nutritionFocus.carbs": "Carbs",
    "option.nutritionFocus.eggs": "Eggs",
    "option.nutritionFocus.vegetables": "Vegetables"
  },
  it: {
    "app.title": "WhatToEat? (WTE)",
    "app.subtitle":
      "Pianifica pranzo e cena, resta nel budget e aggiorna automaticamente la lista della spesa.",
    "auth.title": "Accedi al tuo account",
    "auth.label.email": "Email",
    "auth.label.password": "Password",
    "auth.button.signIn": "Accedi",
    "auth.button.signUp": "Crea account",
    "auth.orContinue": "oppure continua con",
    "auth.button.google": "Google",
    "auth.button.apple": "Apple",
    "auth.mode.firebase":
      "Autenticazione Firebase attiva. Accesso con email, Google e Apple abilitato.",
    "auth.mode.demo":
      "Firebase non è configurato. Modalità demo locale attiva (solo email/password).",
    "auth.validation.emailPasswordRequired":
      "Email e password sono obbligatorie.",
    "auth.validation.passwordMin":
      "La password deve contenere almeno 6 caratteri.",
    "account.title": "Account",
    "account.button.signOut": "Esci",
    "settings.title": "Preferenze",
    "settings.label.language": "Lingua app",
    "settings.label.shoppingIntervalDays": "Intervallo spesa (giorni)",
    "settings.label.shoppingDay": "Giorno della spesa",
    "settings.label.budgetMin": "Budget minimo (EUR)",
    "settings.label.budgetMax": "Budget massimo (EUR)",
    "settings.label.dietProfile": "Profilo dieta",
    "settings.label.difficulty": "Difficoltà",
    "settings.label.maxPrepMinutes":
      "Tempo massimo preparazione (minuti)",
    "settings.label.adults": "Adulti",
    "settings.label.childrenAges":
      "Età bambini (separati da virgola, esempio: 4, 8)",
    "settings.placeholder.childrenAges": "4, 8",
    "settings.legend.cuisines": "Cucine preferite",
    "settings.legend.allergies": "Allergie / intolleranze",
    "settings.button.save": "Salva impostazioni",
    "settings.button.generate": "Genera piano",
    "preview.title": "Anteprima prossimi pasti",
    "preview.cycleHint":
      "Ciclo: {start} - {end} • Prossimo giorno spesa: {next}",
    "preview.meal.lunch": "Pranzo",
    "preview.meal.dinner": "Cena",
    "preview.item.withRecipe": "{date} - {meal}: {recipe}",
    "preview.item.noRecipe": "{date} - {meal}",
    "plan.title": "Piano pasti",
    "shopping.summaryTitle": "Lista della spesa",
    "shopping.empty": "Genera un piano per vedere la lista della spesa.",
    "shopping.estimated":
      "Costo spesa stimato: {estimated} ({min} - {max})",
    "shopping.target":
      "Budget obiettivo: {min} - {max} ({position} target)",
    "shopping.target.inside": "dentro al",
    "shopping.target.outside": "fuori dal",
    "meal.empty": "Genera un piano per visualizzare i pasti.",
    "meal.meta":
      "Preparazione {minutes} min • {difficulty} • {cuisine}",
    "meal.allergenTag": "contiene {allergen}",
    "meal.button.swap": "Cambia ricetta",
    "meal.section.ingredients": "Ingredienti",
    "meal.section.steps": "Passaggi preparazione",
    "meal.rating.average":
      "Valutazione media: {average}/5 ({count} voti)",
    "meal.rating.none": "Ancora nessuna valutazione. Valuta questa ricetta:",
    "history.title": "Storico piani",
    "history.empty": "Nessun piano salvato.",
    "history.item.title": "Piano {dateTime} ({count} pasti)",
    "history.item.meta": "{start} - {end} • {budget}",
    "history.button.load": "Carica questo piano",
    "noscript.message":
      "JavaScript è necessario per eseguire questa applicazione.",
    "status.planGenerated":
      "Nuovo piano generato. Lista spesa e storico aggiornati.",
    "status.settingsSaved": "Impostazioni salvate.",
    "status.mealSwapped": "Ricetta cambiata. Lista spesa aggiornata.",
    "status.ratingSaved":
      "Valutazione salvata. I prossimi piani useranno questo feedback.",
    "status.historyLoaded": "Piano storico caricato.",
    "status.signedIn":
      "Accesso effettuato come {email}. Impostazioni e storico pronti.",
    "status.signedOut": "Disconnessione completata.",
    "error.plan.generate": "Impossibile generare il piano pasti.",
    "error.settings.save": "Impossibile salvare le impostazioni.",
    "error.meal.swap": "Impossibile cambiare questa ricetta.",
    "error.rating.save": "Impossibile salvare la valutazione.",
    "error.rating.invalid": "Valore valutazione non valido.",
    "error.meal.notFound": "Pasto non trovato.",
    "error.history.notFound": "Voce storico selezionata non trovata.",
    "error.history.persist":
      "Piano caricato ma non è stato possibile salvare lo stato.",
    "error.userData.load": "Impossibile caricare i dati utente.",
    "error.auth.signIn": "Accesso fallito.",
    "error.auth.signUp": "Registrazione fallita.",
    "error.auth.google": "Accesso Google fallito.",
    "error.auth.apple": "Accesso Apple fallito.",
    "error.auth.signOut": "Impossibile eseguire la disconnessione.",
    "error.auth.accountExists": "Esiste già un account con questa email.",
    "error.auth.wrongCredentials": "Credenziali errate.",
    "error.auth.googleRequiresFirebase":
      "Accesso Google disponibile solo con Firebase configurato.",
    "error.auth.appleRequiresFirebase":
      "Accesso Apple disponibile solo con Firebase configurato.",
    "planner.note.relaxedCuisine":
      "Le preferenze cucina sono state rilassate per alcuni slot.",
    "planner.note.relaxedTime":
      "Il tempo di preparazione è stato rilassato fino a 20 minuti per alcuni slot.",
    "planner.note.relaxedDifficulty":
      "La difficoltà è stata rilassata per alcuni slot.",
    "planner.note.relaxedDiet":
      "I filtri dieta sono stati rilassati per alcuni pasti dopo i vincoli su allergie e tempi.",
    "planner.note.strictFallback":
      "Filtri molto restrittivi rilevati. Il planner ha usato un fallback di compatibilità.",
    "planner.warning.mushrooms":
      "Età bambino {age}: i funghi possono essere serviti separatamente ai bambini sotto i 6 anni. Aggiungili alla fine per gli adulti.",
    "planner.warning.chili":
      "Età bambino {age}: riduci o rimuovi il peperoncino sotto gli 8 anni, poi condisci separatamente le porzioni adulte.",
    "planner.warning.nuts":
      "Età bambino {age}: evita frutta secca intera sotto i 5 anni. Usa frutta secca macinata o omettila.",
    "planner.error.mealMissing":
      "Il pasto selezionato non è stato trovato nel piano corrente.",
    "planner.error.noAlternative":
      "Nessuna ricetta alternativa disponibile con le preferenze correnti. Rilassa i filtri e riprova.",
    "option.weekday.0": "Domenica",
    "option.weekday.1": "Lunedì",
    "option.weekday.2": "Martedì",
    "option.weekday.3": "Mercoledì",
    "option.weekday.4": "Giovedì",
    "option.weekday.5": "Venerdì",
    "option.weekday.6": "Sabato",
    "option.language.en": "Inglese",
    "option.language.it": "Italiano",
    "option.cuisine.italian": "Italiana",
    "option.cuisine.mediterranean": "Mediterranea",
    "option.cuisine.asian": "Asiatica",
    "option.cuisine.mexican": "Messicana",
    "option.cuisine.middle-eastern": "Medio orientale",
    "option.cuisine.comfort": "Comfort food",
    "option.allergy.gluten": "Glutine",
    "option.allergy.lactose": "Lattosio / latticini",
    "option.allergy.nuts": "Frutta secca / arachidi",
    "option.allergy.shellfish": "Crostacei",
    "option.allergy.eggs": "Uova",
    "option.allergy.soy": "Soia",
    "option.allergy.fish": "Pesce",
    "option.diet.balanced": "Bilanciata",
    "option.diet.vegetarian": "Vegetariana",
    "option.diet.high-protein": "Alta proteina",
    "option.diet.light": "Pasti leggeri",
    "option.difficulty.easy": "Facile",
    "option.difficulty.medium": "Media",
    "option.difficulty.hard": "Avanzata",
    "option.nutritionFocus.legumes": "Legumi",
    "option.nutritionFocus.fish": "Pesce",
    "option.nutritionFocus.meat": "Carne",
    "option.nutritionFocus.whole-grains": "Cereali integrali",
    "option.nutritionFocus.carbs": "Carboidrati",
    "option.nutritionFocus.eggs": "Uova",
    "option.nutritionFocus.vegetables": "Verdure"
  }
};

const LANGUAGE_LOCALES = {
  en: "en-GB",
  it: "it-IT"
};

export function normalizeLanguage(value) {
  if (typeof value === "string" && Object.hasOwn(TRANSLATIONS, value)) {
    return value;
  }
  return "en";
}

export function getLocaleForLanguage(language) {
  const normalized = normalizeLanguage(language);
  return LANGUAGE_LOCALES[normalized];
}

export function translate(language, key, params = {}) {
  const normalized = normalizeLanguage(language);
  const dictionary = TRANSLATIONS[normalized];
  const fallbackDictionary = TRANSLATIONS.en;
  const template = dictionary[key] ?? fallbackDictionary[key] ?? key;

  return template.replace(/\{(\w+)\}/g, (fullMatch, variableName) => {
    if (!Object.hasOwn(params, variableName)) {
      return fullMatch;
    }
    return String(params[variableName]);
  });
}

export function createTranslator(language) {
  const normalized = normalizeLanguage(language);
  return {
    language: normalized,
    locale: getLocaleForLanguage(normalized),
    t: (key, params = {}) => translate(normalized, key, params)
  };
}
