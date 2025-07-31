# Role Assignment Guide

This document explains how to assign user roles in the Grounded and Fruitful App.

## Roles Overview

The application defines two roles:

- **Parent/Guardian** – Registers, links, and monitors child accounts. Parents have view-only access to child records and receive notifications based on their children's activity.
- **Child** – Interacts with all daily prompts, academic check-ins, Bible quizzes, and project trackers. Children can also request help or report issues.

## Assigning Roles in Firestore

1. **User Document**
   - Create a `/users/{userId}` document immediately after account creation.
   - Include a `role` field with the value `"parent"` or `"child"`.
   - Parents may also store an array `linkedChildIds` containing the UIDs of all child accounts they manage.
2. **Child Profile Document**
   - For each child account, create a `/children/{childId}` document storing the child profile and `parentId` reference.
   - This allows security rules to verify ownership and enables parents to view their child's records.

## Example

```ts
// When a parent registers
await setDoc(doc(db, 'users', parentUid), {
  role: 'parent',
  linkedChildIds: [],
});

// When a child account is created under a parent
await setDoc(doc(db, 'users', childUid), {
  role: 'child',
  parentId: parentUid,
});
await setDoc(doc(db, 'children', childUid), {
  parentId: parentUid,
  name: childName,
  dob: childDob,
  grade: childGrade,
});
```

## Notes on Security Rules

Firestore rules should check `parentId` and `childId` fields to ensure that parents can only read data belonging to their linked children, while children can write their own records. The sample rules in `firebase/firestore.rules` illustrate this pattern.
