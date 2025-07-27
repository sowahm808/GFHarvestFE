# Backend Recommendations for Reward Center

The front‑end Reward Center displays a child's cumulative points, group rankings
and notifications. To support these features the backend should expose a minimal
set of endpoints and Firestore structures.

## Firestore Collections

- **userStats** – existing collection storing each child's `points` and `streak`.
- **groups** – optional collection defining groups within a church. Documents
  should include a `name` and an array of member child IDs.

### Points Updates

Administrators can update the `userStats/{childId}` document whenever parents
send appraisal information. This is the same document currently read by the
front‑end.

### Aggregated Group Points

To show group rankings, aggregate the sum of `points` for each group. A simple
Cloud Function triggered on writes to `userStats` can update documents under
`groupStats/{groupId}` containing the total points for that group.

## REST Endpoints

```
GET  /api/groups/points        → returns `[ { id, name, points } ]`
POST /api/users/:childId/points → body: `{ points: number }` (admin only)
```

These endpoints allow the front‑end to fetch group scores and for admins to
adjust a child's points without using the Firebase console.
