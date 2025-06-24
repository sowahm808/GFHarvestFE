# 📌 TODO List: Kids Faith Tracker App

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
- [ ] School and home treatment checkboxes
- [ ] Bullying report with consent to notify parent
- [ ] Suggestions field
- [ ] Save to `/mentalStatus`

## 📖 Bible Quiz Module
- [ ] Quiz prompt (daily)
- [ ] Randomize from DB question pool
- [ ] Score submission + 200 points
- [ ] Save to `/bibleQuizzes`

## 📝 Essay Tracker
- [ ] Essay title input
- [ ] Progress selection (in progress, draft, submitted)
- [ ] Request help toggle
- [ ] Save to `/essays`

## 📚 Academic Progress
- [ ] Test score input
- [ ] Share result toggle
- [ ] Needs help toggle
- [ ] Save to `/schoolWork`

## 🎓 Project Tracker
- [ ] Project title input
- [ ] Presentation date picker
- [ ] Help toggle & Enjoyment scale
- [ ] Save to `/projects`

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
