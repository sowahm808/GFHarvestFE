# 📌 TODO List: Grounded and Fruitful App

## 🔐 Authentication
- [x] Set up Firebase Authentication
- [x] Implement parent registration & login
- [x] Enable child account creation under parent
- [ ] Role-based access control in Firebase rules

## 👨‍👩‍👧 Onboarding
- [x] Parent creates or links child profile
- [ ] Child logs in via invite or code
- [x] Store parent-child linkage in Firestore

## 📆 Daily Check-In (Child)
- [x] Gratitude prompt (3 inputs)
- [x] One wish entry
- [x] Weekly goal setting
- [x] Next birthday selector
- [x] Mood tracker with emojis
- [x] Sleep, appetite, mood descriptions
- [x] Form save to `/dailyCheckins`

## 🧠 Mental & Emotional Status
- [x] School and home treatment checkboxes
- [x] Bullying report with consent to notify parent
- [x] Suggestions field
- [x] Save to `/mentalStatus`

## 📖 Bible Quiz Module
- [x] Quiz prompt (daily)
- [x] Randomize from DB question pool
- [x] Limit to five questions per day
- [x] Score submission + 200 points
- [x] Save to `/bibleQuizzes`

## 📝 Essay Tracker
- [x] Essay title input
- [x] Progress selection (in progress, draft, submitted)
- [x] Request help toggle
- [x] Save to `/essays`

## 📚 Academic Progress
- [x] Test score input
- [x] Share result toggle
- [x] Needs help toggle
- [x] Save to `/schoolWork`

## 🎓 Project Tracker
- [x] Project title input
- [x] Presentation date picker
- [x] Help toggle & Enjoyment scale
- [x] Save to `/projects`

## 🧪 Firebase Setup
- [ ] Define Firestore collections
- [ ] Write Firebase rules for child/parent access
- [ ] Set up Firestore indexes if needed

## 💬 Notifications (Phase 2)
- [ ] Alert parent if bullying or mental health flag is set
- [ ] Weekly summary to parent (optional)

## 🧩 Gamification (Phase 2)
- [ ] Quiz leaderboard by age group
- [ ] Streak counter for daily check-ins
- [ ] Points for milestones (completing a week)

## 📱 UI/UX (Ionic Angular)
- [ ] Tabs: Home, Quiz, Essay, Projects, Check-in
- [ ] Role-based UI views (Parent vs. Child)
- [ ] Add form validation
- [ ] Add toast notifications and loaders
