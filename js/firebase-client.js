import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const REQUIRED_CONFIG_KEYS = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId"
];

function isConfigValueValid(value) {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    !value.includes("REPLACE_ME")
  );
}

export const isFirebaseConfigured = REQUIRED_CONFIG_KEYS.every((key) =>
  isConfigValueValid(firebaseConfig[key])
);

let app = null;
let auth = null;
let db = null;

if (isFirebaseConfigured) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };

export {
  createUserWithEmailAndPassword,
  doc,
  getDoc,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  serverTimestamp,
  setDoc,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
};
