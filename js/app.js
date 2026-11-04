import {
  authMode,
  signInWithApple,
  signInWithEmail,
  signInWithGoogle,
  signOutCurrentUser,
  signUpWithEmail,
  subscribeAuthChanges
} from "./auth.js";
import { cloneDefaultSettings } from "./constants.js";
import { loadUserState, saveUserState } from "./data-service.js";
import { createTranslator, normalizeLanguage } from "./i18n.js";
import {
  buildMealSlots,
  generatePlan,
  getShoppingCycleInfo,
  sanitizeSettings,
  swapMealInPlan
} from "./planner.js";
import { RECIPES } from "./recipes.js";
import {
  initializeSettingsFormOptions,
  populateSettingsForm,
  readSettingsFromForm,
  renderHistory,
  renderMeals,
  renderPreview,
  renderShoppingList,
  setSystemMessage
} from "./ui.js";
import { createId, deepClone, formatDate } from "./utils.js";

const defaultSettings = cloneDefaultSettings();

const state = {
  user: null,
  settings: defaultSettings,
  ratings: {},
  plan: null,
  history: [],
  i18n: createTranslator(defaultSettings.language)
};

const recipeImageById = new Map(
  RECIPES.map((recipe) => [recipe.id, recipe.imageUrl])
);

const elements = {
  systemMessage: document.querySelector("#system-message"),
  authPanel: document.querySelector("#auth-panel"),
  appPanel: document.querySelector("#app-panel"),
  authModeNote: document.querySelector("#auth-mode-note"),
  authEmail: document.querySelector("#auth-email"),
  authPassword: document.querySelector("#auth-password"),
  emailSignIn: document.querySelector("#email-sign-in"),
  emailSignUp: document.querySelector("#email-sign-up"),
  googleAuth: document.querySelector("#google-auth"),
  appleAuth: document.querySelector("#apple-auth"),
  userEmail: document.querySelector("#user-email"),
  logoutButton: document.querySelector("#logout-button"),
  settingsForm: document.querySelector("#settings-form"),
  languageSelect: document.querySelector("#language-select"),
  shoppingDaySelect: document.querySelector("#shopping-day-select"),
  dietProfileSelect: document.querySelector("#diet-profile-select"),
  difficultySelect: document.querySelector("#difficulty-select"),
  cuisineOptions: document.querySelector("#cuisine-options"),
  allergyOptions: document.querySelector("#allergy-options"),
  saveSettings: document.querySelector("#save-settings"),
  previewList: document.querySelector("#preview-list"),
  shoppingCycleHint: document.querySelector("#shopping-cycle-hint"),
  shoppingSummary: document.querySelector("#shopping-summary"),
  shoppingList: document.querySelector("#shopping-list"),
  mealPlan: document.querySelector("#meal-plan"),
  historyList: document.querySelector("#history-list")
};

function clearStatus() {
  setSystemMessage(elements.systemMessage, null, "");
}

function showStatus(type, text) {
  setSystemMessage(elements.systemMessage, type, text);
}

function showStatusByKey(type, key, params = {}) {
  showStatus(type, state.i18n.t(key, params));
}

function setLanguage(language) {
  const normalized = normalizeLanguage(language);
  state.settings.language = normalized;
  state.i18n = createTranslator(normalized);
}

function applyStaticTranslations() {
  const { t, language } = state.i18n;
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) {
      return;
    }
    node.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    if (!key) {
      return;
    }
    node.setAttribute("placeholder", t(key));
  });
}

function refreshSettingsForm(settingsForForm) {
  initializeSettingsFormOptions(
    {
      languageSelect: elements.languageSelect,
      shoppingDaySelect: elements.shoppingDaySelect,
      dietProfileSelect: elements.dietProfileSelect,
      difficultySelect: elements.difficultySelect,
      cuisineOptions: elements.cuisineOptions,
      allergyOptions: elements.allergyOptions
    },
    state.i18n
  );

  populateSettingsForm(elements.settingsForm, settingsForForm);
}

function updateLanguageAndUi(language, settingsForForm) {
  setLanguage(language);
  applyStaticTranslations();
  refreshSettingsForm(settingsForForm);
  markAuthMode();
}

function ensureStateShape(stateFromStorage) {
  const safeState = stateFromStorage ?? {};

  return {
    settings: sanitizeSettings(safeState.settings ?? cloneDefaultSettings()),
    ratings:
      safeState.ratings && typeof safeState.ratings === "object"
        ? safeState.ratings
        : {},
    plan: safeState.currentPlan ?? null,
    history: Array.isArray(safeState.history) ? safeState.history : []
  };
}

function normalizePlanImages(plan) {
  if (!plan || !Array.isArray(plan.meals)) {
    return plan;
  }

  plan.meals = plan.meals.map((meal) => ({
    ...meal,
    imageUrl: recipeImageById.get(meal.recipeId) ?? meal.imageUrl
  }));
  return plan;
}

function normalizeHistoryEntries(entries) {
  return [...entries]
    .filter((entry) => entry && entry.id && entry.plan)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .slice(0, 10);
}

function planRecipeMap(plan) {
  if (!plan) {
    return new Map();
  }
  return new Map(plan.meals.map((meal) => [meal.id, meal.recipeName]));
}

function renderPreviewFromDraft(draftSettingsOverride = null) {
  const draftSettings = sanitizeSettings(
    draftSettingsOverride ?? readSettingsFromForm(elements.settingsForm)
  );
  const previewI18n = createTranslator(draftSettings.language);
  const cycleInfo = getShoppingCycleInfo(draftSettings);
  const slots = buildMealSlots(draftSettings);

  elements.shoppingCycleHint.textContent = previewI18n.t("preview.cycleHint", {
    start: formatDate(cycleInfo.startDate, previewI18n.locale),
    end: formatDate(cycleInfo.endDate, previewI18n.locale),
    next: formatDate(cycleInfo.nextShoppingDate, previewI18n.locale)
  });
  renderPreview(
    elements.previewList,
    slots,
    previewI18n,
    planRecipeMap(state.plan)
  );
}

function renderPlanSections(draftSettingsOverride = null) {
  renderShoppingList(
    elements.shoppingSummary,
    elements.shoppingList,
    state.plan,
    state.i18n
  );
  renderMeals(elements.mealPlan, state.plan, state.ratings, state.i18n);
  renderHistory(elements.historyList, state.history, state.i18n);
  renderPreviewFromDraft(draftSettingsOverride);
}

function markAuthMode() {
  const authModeKey =
    authMode === "firebase" ? "auth.mode.firebase" : "auth.mode.demo";
  elements.authModeNote.textContent = state.i18n.t(authModeKey);

  if (authMode === "demo") {
    elements.googleAuth.disabled = true;
    elements.appleAuth.disabled = true;
    return;
  }

  elements.googleAuth.disabled = false;
  elements.appleAuth.disabled = false;
}

function getAuthFormValues() {
  return {
    email: elements.authEmail.value.trim(),
    password: elements.authPassword.value
  };
}

function validateAuthForm() {
  const { email, password } = getAuthFormValues();
  if (!email || !password) {
    throw new Error("auth.validation.emailPasswordRequired");
  }
  if (password.length < 6) {
    throw new Error("auth.validation.passwordMin");
  }
  return { email, password };
}

async function persistState(reason) {
  if (!state.user) {
    return;
  }

  await saveUserState(
    state.user.uid,
    {
      settings: state.settings,
      ratings: state.ratings,
      currentPlan: state.plan,
      history: state.history
    },
    reason
  );
}

function buildHistoryEntryFromPlan(plan, existingEntry = null) {
  return {
    id: plan.planId,
    createdAt: existingEntry?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    plan: deepClone(plan)
  };
}

function upsertHistoryWithCurrentPlan() {
  if (!state.plan) {
    return;
  }

  if (!state.plan.planId) {
    state.plan.planId = createId();
  }

  const existingIndex = state.history.findIndex(
    (entry) => entry.id === state.plan.planId
  );

  if (existingIndex >= 0) {
    const existingEntry = state.history[existingIndex];
    state.history[existingIndex] = buildHistoryEntryFromPlan(
      state.plan,
      existingEntry
    );
  } else {
    state.history.unshift(buildHistoryEntryFromPlan(state.plan));
  }

  state.history = normalizeHistoryEntries(state.history);
}

function applyRating(recipeId, ratingValue) {
  const previous = state.ratings[recipeId] ?? { average: 0, count: 0 };
  const nextCount = previous.count + 1;
  const nextAverage =
    (previous.average * previous.count + ratingValue) / nextCount;

  state.ratings[recipeId] = {
    average: Number(nextAverage.toFixed(2)),
    count: nextCount,
    lastRating: ratingValue,
    lastRatedAt: new Date().toISOString()
  };
}

function parseFriendlyError(error, fallbackKey) {
  if (error instanceof Error && error.message) {
    const translated = state.i18n.t(error.message);
    if (translated !== error.message) {
      return translated;
    }
    return error.message;
  }
  return state.i18n.t(fallbackKey);
}

async function onGeneratePlan(event) {
  event.preventDefault();
  clearStatus();

  try {
    const freshSettings = sanitizeSettings(readSettingsFromForm(elements.settingsForm));
    state.settings = freshSettings;
    updateLanguageAndUi(state.settings.language, state.settings);

    const plan = generatePlan(state.settings, state.ratings, new Date());
    plan.planId = createId();
    state.plan = plan;

    upsertHistoryWithCurrentPlan();
    renderPlanSections(state.settings);
    await persistState("generate-plan");

    showStatusByKey("success", "status.planGenerated");
  } catch (error) {
    console.error(error);
    showStatus("error", parseFriendlyError(error, "error.plan.generate"));
  }
}

async function onSaveSettings() {
  clearStatus();

  try {
    state.settings = sanitizeSettings(readSettingsFromForm(elements.settingsForm));
    updateLanguageAndUi(state.settings.language, state.settings);
    renderPlanSections(state.settings);
    await persistState("save-settings");
    showStatusByKey("success", "status.settingsSaved");
  } catch (error) {
    console.error(error);
    showStatus("error", parseFriendlyError(error, "error.settings.save"));
  }
}

async function onMealPlanAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button || !state.plan) {
    return;
  }

  const card = button.closest("[data-meal-id]");
  if (!card) {
    return;
  }

  const mealId = card.dataset.mealId;
  const action = button.dataset.action;

  if (action === "swap") {
    clearStatus();
    try {
      state.plan = swapMealInPlan(state.plan, mealId, state.settings, state.ratings);
      upsertHistoryWithCurrentPlan();
      renderPlanSections();
      await persistState("swap-meal");
      showStatusByKey("success", "status.mealSwapped");
    } catch (error) {
      console.error(error);
      showStatus("error", parseFriendlyError(error, "error.meal.swap"));
    }
    return;
  }

  if (action === "rate") {
    const ratingValue = Number.parseInt(button.dataset.rating ?? "", 10);
    if (!Number.isFinite(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      showStatusByKey("error", "error.rating.invalid");
      return;
    }

    const meal = state.plan.meals.find((item) => item.id === mealId);
    if (!meal) {
      showStatusByKey("error", "error.meal.notFound");
      return;
    }

    clearStatus();
    try {
      applyRating(meal.recipeId, ratingValue);
      upsertHistoryWithCurrentPlan();
      renderPlanSections();
      await persistState("rate-recipe");
      showStatusByKey("success", "status.ratingSaved");
    } catch (error) {
      console.error(error);
      showStatus("error", parseFriendlyError(error, "error.rating.save"));
    }
  }
}

async function onHistoryAction(event) {
  const button = event.target.closest('button[data-action="load-history"]');
  if (!button) {
    return;
  }

  const historyId = button.dataset.historyId;
  const entry = state.history.find((item) => item.id === historyId);
  if (!entry) {
    showStatusByKey("error", "error.history.notFound");
    return;
  }

  state.plan = deepClone(entry.plan);
  renderPlanSections();

  try {
    await persistState("load-history");
    showStatusByKey("success", "status.historyLoaded");
  } catch (error) {
    console.error(error);
    showStatus("error", parseFriendlyError(error, "error.history.persist"));
  }
}

function onSettingsInput(event) {
  if (event.target.name === "language") {
    const draftSettings = sanitizeSettings(readSettingsFromForm(elements.settingsForm));
    updateLanguageAndUi(draftSettings.language, draftSettings);
    renderPlanSections(draftSettings);
    return;
  }

  renderPreviewFromDraft();
}

async function loadUserData(user) {
  const persisted = await loadUserState(user.uid);
  const safeState = ensureStateShape(persisted);

  state.settings = safeState.settings;
  state.ratings = safeState.ratings;
  state.plan = normalizePlanImages(safeState.plan);
  state.history = normalizeHistoryEntries(safeState.history).map((entry) => ({
    ...entry,
    plan: normalizePlanImages(entry.plan)
  }));

  updateLanguageAndUi(state.settings.language, state.settings);
  renderPlanSections(state.settings);
}

async function onAuthStateChange(user) {
  state.user = user;

  if (!user) {
    elements.authPanel.classList.remove("hidden");
    elements.appPanel.classList.add("hidden");
    state.settings = cloneDefaultSettings();
    state.ratings = {};
    state.plan = null;
    state.history = [];
    updateLanguageAndUi(state.settings.language, state.settings);
    renderPlanSections(state.settings);
    return;
  }

  elements.authPanel.classList.add("hidden");
  elements.appPanel.classList.remove("hidden");
  elements.userEmail.textContent = user.email;

  try {
    await loadUserData(user);
    showStatusByKey("success", "status.signedIn", { email: user.email });
  } catch (error) {
    console.error(error);
    showStatus("error", parseFriendlyError(error, "error.userData.load"));
  }
}

async function handleEmailSignIn() {
  clearStatus();
  try {
    const { email, password } = validateAuthForm();
    await signInWithEmail(email, password);
  } catch (error) {
    console.error(error);
    showStatus("error", parseFriendlyError(error, "error.auth.signIn"));
  }
}

async function handleEmailSignUp() {
  clearStatus();
  try {
    const { email, password } = validateAuthForm();
    await signUpWithEmail(email, password);
  } catch (error) {
    console.error(error);
    showStatus("error", parseFriendlyError(error, "error.auth.signUp"));
  }
}

async function handleGoogleSignIn() {
  clearStatus();
  try {
    await signInWithGoogle();
  } catch (error) {
    console.error(error);
    showStatus("error", parseFriendlyError(error, "error.auth.google"));
  }
}

async function handleAppleSignIn() {
  clearStatus();
  try {
    await signInWithApple();
  } catch (error) {
    console.error(error);
    showStatus("error", parseFriendlyError(error, "error.auth.apple"));
  }
}

async function handleSignOut() {
  clearStatus();
  try {
    await signOutCurrentUser();
    showStatusByKey("success", "status.signedOut");
  } catch (error) {
    console.error(error);
    showStatus("error", parseFriendlyError(error, "error.auth.signOut"));
  }
}

function bindEvents() {
  elements.emailSignIn.addEventListener("click", handleEmailSignIn);
  elements.emailSignUp.addEventListener("click", handleEmailSignUp);
  elements.googleAuth.addEventListener("click", handleGoogleSignIn);
  elements.appleAuth.addEventListener("click", handleAppleSignIn);
  elements.logoutButton.addEventListener("click", handleSignOut);

  elements.settingsForm.addEventListener("submit", onGeneratePlan);
  elements.settingsForm.addEventListener("input", onSettingsInput);
  elements.saveSettings.addEventListener("click", onSaveSettings);

  elements.mealPlan.addEventListener("click", onMealPlanAction);
  elements.historyList.addEventListener("click", onHistoryAction);
}

function bootstrap() {
  updateLanguageAndUi(state.settings.language, state.settings);
  renderPlanSections(state.settings);
  bindEvents();
  subscribeAuthChanges(onAuthStateChange);
}

bootstrap();
