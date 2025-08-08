# Mentor API

The backend provides endpoints for creating mentors and linking them to children.

## Create Mentor

`POST /mentors`

Body:
```json
{ "name": "Mentor Name", "email": "mentor@example.com", "phone": "555-1234" }
```

Response:
```json
{ "id": "mentorId", "name": "Mentor Name", "email": "mentor@example.com", "phone": "555-1234" }
```

Only administrators may access this endpoint.

## Assign Mentor to Child

`POST /mentors/assign`

Body:
```json
{ "mentorId": "mentorUid", "childId": "childUid" }
```

## Get Mentor's Children

`GET /mentors/:mentorId/children`

Returns:
```json
{ "children": ["childUid1", "childUid2"] }
```
