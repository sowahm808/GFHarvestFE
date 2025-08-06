# Firebase Setup

This document describes the Firestore collections and provides basic security rules and index configuration.

## Collections

- **parentChildLinks** – links a `parentId` to a `childId`.
- **children** – child profiles storing `name`, `age`, and `parentId`. Parents must supply both the child's name and age when creating an account.
- **mentors** – mentor profiles with `name`, `email`, and `phone`.
- **mentorAssignments** – associates a `mentorId` with a `childId`.
- **dailyCheckins** – stored check‑in data from the child. Each document should include `childId`, `parentId` and a `timestamp` field.
- **mentalStatus** – mental health form results. Store `childId`, `parentId` and `timestamp`.
- **bibleQuizzes** – quiz attempts. Store `childId`, `parentId`, `score` and `timestamp`.
- **essays** – essay tracker items. Store `childId`, `parentId` and `timestamp`.
- **schoolWork** – academic progress entries. Store `childId`, `parentId` and `timestamp`.
- **projects** – project tracker entries. Store `childId`, `parentId` and `timestamp`.
- **bibleQuestions** – pool of quiz questions. No user‑specific fields required.
- **userStats** – points and streak information used for the leaderboard. Document ID matches the child's UID.

Every document that references a child should include `childId` and `parentId`. This allows security rules to verify ownership.

## Security Rules

A set of sample Firestore rules is provided in `firebase/firestore.rules`. These rules grant each parent read access to their child’s documents while allowing the child to create and read their own data. The `userStats` collection, used for the leaderboard, is readable by any authenticated user while write access is limited to the child’s UID.

## Indexes

When querying data by `childId` and ordering by `timestamp`, Firestore requires composite indexes. Example index configuration is included in `firebase/firestore.indexes.json`.

Copy these files into your Firebase project and deploy them using the Firebase CLI:

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

## Authorized Domains

If the application is hosted on a custom domain (for example
`kidsfaithtracker.netlify.app`), that domain must be added to the **Authorized
domains** list in the Firebase console. Navigate to **Authentication →
Settings** in your Firebase project and add the domain under "Authorized
domains". Without this step OAuth-based sign in (such as Google login) will
fail and pages that rely on the authenticated user—like the quiz history—will
appear empty.
