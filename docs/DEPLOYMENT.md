# GitHub Pages Deployment

This repository includes a GitHub Actions workflow for static deployment.

Workflow file:

- [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml)

## One-time repository setup

1. Push the repository to GitHub.
2. Open repository **Settings**.
3. Go to **Pages**.
4. Under Source, choose **GitHub Actions**.

## Deploy flow

- Every push to `main` triggers deployment.
- You can also trigger deployment manually via **workflow_dispatch**.

## Production checklist

Before deploying publicly:

1. Configure Firebase values in `js/firebase-config.js`.
2. Enable Email, Google, and Apple providers in Firebase.
3. Ensure Firestore rules are restricted per user.
4. Verify the deployed app URL from the workflow output.

## Troubleshooting

- If deployment job fails, open the workflow run logs.
- If app loads but auth does not work, verify Firebase config and provider setup.
- If the page URL returns old assets, hard refresh browser cache.
