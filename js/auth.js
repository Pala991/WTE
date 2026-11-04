import {
  auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  isFirebaseConfigured,
  OAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "./firebase-client.js";

const LOCAL_USERS_KEY = "wte:demo-users";
const LOCAL_SESSION_KEY = "wte:demo-session";
const localSubscribers = new Set();

export const authMode = isFirebaseConfigured ? "firebase" : "demo";

function normalizeFirebaseUser(user) {
  return {
    uid: user.uid,
    email: user.email ?? "unknown@user",
    provider: "firebase"
  };
}

function readJsonFromStorage(key, fallbackValue) {
  const raw = localStorage.getItem(key);
  if (!raw) {
    return fallbackValue;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Invalid JSON in localStorage key "${key}".`, error);
    return fallbackValue;
  }
}

function writeJsonToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getDemoUsers() {
  return readJsonFromStorage(LOCAL_USERS_KEY, {});
}

function saveDemoUsers(users) {
  writeJsonToStorage(LOCAL_USERS_KEY, users);
}

function buildDemoUid(email) {
  const safeEmail = email.trim().toLowerCase();
  return `demo-${btoa(safeEmail).replaceAll("=", "")}`;
}

function getDemoSessionUser() {
  return readJsonFromStorage(LOCAL_SESSION_KEY, null);
}

function setDemoSessionUser(user) {
  writeJsonToStorage(LOCAL_SESSION_KEY, user);
}

function clearDemoSessionUser() {
  localStorage.removeItem(LOCAL_SESSION_KEY);
}

function notifyDemoSubscribers(user) {
  for (const callback of localSubscribers) {
    callback(user);
  }
}

function signInWithDemoProvider(providerName) {
  const email = window.prompt(
    `Enter your ${providerName} email to continue in demo mode.`
  );

  if (!email) {
    throw new Error("error.auth.providerCancelled");
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail.includes("@")) {
    throw new Error("error.auth.providerInvalidEmail");
  }

  const users = getDemoUsers();
  const account = users[normalizedEmail];
  const uid = account?.uid ?? buildDemoUid(normalizedEmail);

  if (!account) {
    users[normalizedEmail] = { password: null, uid };
    saveDemoUsers(users);
  }

  const user = {
    uid,
    email: normalizedEmail,
    provider: `demo-${providerName.toLowerCase()}`
  };

  setDemoSessionUser(user);
  notifyDemoSubscribers(user);
  return user;
}

export function subscribeAuthChanges(callback) {
  if (authMode === "firebase") {
    return onAuthStateChanged(auth, (firebaseUser) => {
      callback(firebaseUser ? normalizeFirebaseUser(firebaseUser) : null);
    });
  }

  localSubscribers.add(callback);
  callback(getDemoSessionUser());
  return () => {
    localSubscribers.delete(callback);
  };
}

export async function signUpWithEmail(email, password) {
  if (authMode === "firebase") {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    return normalizeFirebaseUser(credentials.user);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = getDemoUsers();

  if (users[normalizedEmail]) {
    throw new Error("error.auth.accountExists");
  }

  const user = {
    uid: buildDemoUid(normalizedEmail),
    email: normalizedEmail,
    provider: "demo"
  };

  users[normalizedEmail] = {
    password,
    uid: user.uid
  };
  saveDemoUsers(users);
  setDemoSessionUser(user);
  notifyDemoSubscribers(user);
  return user;
}

export async function signInWithEmail(email, password) {
  if (authMode === "firebase") {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return normalizeFirebaseUser(credentials.user);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = getDemoUsers();
  const account = users[normalizedEmail];

  if (!account || account.password !== password) {
    throw new Error("error.auth.wrongCredentials");
  }

  const user = {
    uid: account.uid,
    email: normalizedEmail,
    provider: "demo"
  };

  setDemoSessionUser(user);
  notifyDemoSubscribers(user);
  return user;
}

export async function signInWithGoogle() {
  if (authMode !== "firebase") {
    return signInWithDemoProvider("Google");
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const credentials = await signInWithPopup(auth, provider);
  return normalizeFirebaseUser(credentials.user);
}

export async function signInWithApple() {
  if (authMode !== "firebase") {
    return signInWithDemoProvider("Apple");
  }

  const provider = new OAuthProvider("apple.com");
  provider.addScope("email");
  provider.addScope("name");

  const credentials = await signInWithPopup(auth, provider);
  return normalizeFirebaseUser(credentials.user);
}

export async function signOutCurrentUser() {
  if (authMode === "firebase") {
    await signOut(auth);
    return;
  }

  clearDemoSessionUser();
  notifyDemoSubscribers(null);
}
