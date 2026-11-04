# Firebase Setup

This project supports Firebase Authentication and Firestore persistence.

## 1) Create a Firebase project

1. Open Firebase Console.
2. Create a new project.
3. Add a **Web App**.
4. Copy the Web App config object.

## 2) Configure WTE

Edit [`js/firebase-config.js`](../js/firebase-config.js) and replace `REPLACE_ME` fields:

- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

## 3) Enable authentication providers

In Firebase Console > Authentication > Sign-in method:

- Enable **Email/Password**
- Enable **Google**
- Enable **Apple**

### Apple provider notes

Apple Sign-In requires extra setup:

- Apple Developer account
- Service ID
- Redirect URI configured in Apple and Firebase

If Apple is not configured correctly in Firebase, Apple login will fail while other providers continue to work.

## 4) Create Firestore database

1. Enable Firestore.
2. Start in test mode for development, then apply stricter rules for production.

## 5) Recommended Firestore rules

Use per-user ownership:

```txt
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

## 6) Verify

1. Start the app.
2. Sign up with email/password.
3. Save settings and generate a plan.
4. Reload and verify data is restored.

If all values in `firebase-config.js` are still placeholders, WTE automatically runs in local demo mode.
