import {
  db,
  doc,
  getDoc,
  isFirebaseConfigured,
  serverTimestamp,
  setDoc
} from "./firebase-client.js";
import { deepClone } from "./utils.js";

const LOCAL_DATA_PREFIX = "wte:user-state:";

const EMPTY_USER_STATE = Object.freeze({
  settings: null,
  ratings: {},
  currentPlan: null,
  history: []
});

function cloneEmptyState() {
  return deepClone(EMPTY_USER_STATE);
}

function normalizeUserState(rawState) {
  const state = rawState ?? {};

  return {
    settings: state.settings ?? null,
    ratings:
      state.ratings && typeof state.ratings === "object" ? state.ratings : {},
    currentPlan: state.currentPlan ?? null,
    history: Array.isArray(state.history) ? state.history : []
  };
}

function localStorageKey(uid) {
  return `${LOCAL_DATA_PREFIX}${uid}`;
}

function loadLocalState(uid) {
  const raw = localStorage.getItem(localStorageKey(uid));
  if (!raw) {
    return cloneEmptyState();
  }

  try {
    const parsed = JSON.parse(raw);
    return normalizeUserState(parsed);
  } catch (error) {
    console.error("Could not parse local user state.", error);
    return cloneEmptyState();
  }
}

function saveLocalState(uid, state) {
  const normalized = normalizeUserState(state);
  localStorage.setItem(localStorageKey(uid), JSON.stringify(normalized));
}

export async function loadUserState(uid) {
  if (!uid) {
    throw new Error("A valid user id is required to load user state.");
  }

  if (!isFirebaseConfigured || !db) {
    return loadLocalState(uid);
  }

  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return cloneEmptyState();
  }

  return normalizeUserState(snapshot.data());
}

export async function saveUserState(uid, state, reason = "update") {
  if (!uid) {
    throw new Error("A valid user id is required to save user state.");
  }

  const normalized = normalizeUserState(state);

  if (!isFirebaseConfigured || !db) {
    saveLocalState(uid, normalized);
    return;
  }

  const userRef = doc(db, "users", uid);
  await setDoc(
    userRef,
    {
      ...normalized,
      lastUpdateReason: reason,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}
