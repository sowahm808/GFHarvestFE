import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
        data: { title: 'Grounded and Fruitful' },
      },
      {
        path: 'check-in',
        loadComponent: () =>
          import('./check-in/check-in.page').then((m) => m.CheckInPage),
        data: { title: 'Daily Check-In' },
      },
      {
        path: 'bible-quiz',
        loadComponent: () =>
          import('./bible-quiz/bible-quiz.page').then((m) => m.BibleQuizPage),
        data: { title: 'Bible Quiz' },
      },
      {
        path: 'quiz-history',
        loadComponent: () =>
          import('./quiz-history/quiz-history.page').then(
            (m) => m.QuizHistoryPage
          ),
        data: { title: 'Quiz History' },
      },
      {
        path: 'essay-tracker',
        loadComponent: () =>
          import('./essay-tracker/essay-tracker.page').then(
            (m) => m.EssayTrackerPage
          ),
        data: { title: 'Essay Tracker' },
      },
      {
        path: 'project-tracker',
        loadComponent: () =>
          import('./project-tracker/project-tracker.page').then(
            (m) => m.ProjectTrackerPage
          ),
        data: { title: 'Project Tracker' },
      },
      {
        path: 'mentor-record',
        loadComponent: () =>
          import('./mentor-record/mentor-record.page').then(
            (m) => m.MentorRecordPage
          ),
        data: { title: 'Mentor Board' },
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./admin/admin.page').then((m) => m.AdminPage),
        data: { title: 'Assign Mentor' },
      },
      {
        path: 'admin-user-management',
        loadComponent: () =>
          import('./admin/admin-user-management.page').then(
            (m) => m.AdminUserManagementPage
          ),
        data: { title: 'User Management' },
      },
      {
        path: 'admin-parent-child',
        loadComponent: () =>
          import('./admin/admin-parent-child.page').then(
            (m) => m.AdminParentChildPage
          ),
        data: { title: 'Parent Child' },
      },
      {
        path: 'academic-progress',
        loadComponent: () =>
          import('./academic-progress/academic-progress.page').then(
            (m) => m.AcademicProgressPage
          ),
        data: { title: 'Academic Progress' },
      },
      {
        path: 'child-account',
        loadComponent: () =>
          import('./child-account/child-account.page').then(
            (m) => m.ChildAccountPage
          ),
        data: { title: 'Add a Child Account' },
      },
      {
        path: 'group',
        loadComponent: () =>
          import('./group/group.page').then((m) => m.GroupPage),
        data: { title: 'Group Selection' },
      },
      {
        path: 'leaderboard',
        loadComponent: () =>
          import('./leaderboard/leaderboard.page').then((m) => m.LeaderboardPage),
        data: { title: 'Leaderboard' },
      },
      {
        path: 'reward-center',
        loadComponent: () =>
          import('./reward-center/reward-center.page').then(
            (m) => m.RewardCenterPage
          ),
        data: { title: 'Reward Center' },
      },
      {
        path: 'mental-status',
        loadComponent: () =>
          import('./mental-status/mental-status.page').then(
            (m) => m.MentalStatusPage
          ),
        data: { title: 'Mental & Emotional Status' },
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
    data: { title: 'Login' },
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
    data: { title: 'Register' },
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
];
