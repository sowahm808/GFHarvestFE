# Reward Center Admin Flow

This document explains how administrators can adjust point totals and how parents request changes.

## Admin Accounts

Administrators are Firebase users with the custom auth claim `admin: true`. The Firestore rules allow these users to update any document in `/userStats`.

Set the claim using the Firebase Admin SDK:

```ts
import { getAuth } from 'firebase-admin/auth';
await getAuth().setCustomUserClaims(uid, { admin: true });
```

## Parent Requests

Parents should email the admin team with their child's UID and the number of points to award. After verifying the request, an admin updates `/userStats/{childId}` in the Firebase console or through an internal admin screen.

Updating the document will immediately reflect in the child's Reward Center page.
