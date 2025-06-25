import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'check-in',
        loadComponent: () =>
          import('./check-in/check-in.page').then((m) => m.CheckInPage),
      },
      {
        path: 'bible-quiz',
        loadComponent: () =>
          import('./bible-quiz/bible-quiz.page').then((m) => m.BibleQuizPage),
      },
      {
        path: 'essay-tracker',
        loadComponent: () =>
          import('./essay-tracker/essay-tracker.page').then(
            (m) => m.EssayTrackerPage
          ),
      },
      {
        path: 'project-tracker',
        loadComponent: () =>
          import('./project-tracker/project-tracker.page').then(
            (m) => m.ProjectTrackerPage
          ),
      },
      {
        path: 'academic-progress',
        loadComponent: () =>
          import('./academic-progress/academic-progress.page').then(
            (m) => m.AcademicProgressPage
          ),
      },
      {
        path: 'child-account',
        loadComponent: () =>
          import('./child-account/child-account.page').then(
            (m) => m.ChildAccountPage
          ),
      },
      {
        path: 'leaderboard',
        loadComponent: () =>
      import('./leaderboard/leaderboard.page').then((m) => m.LeaderboardPage),
      },
      {
        path: 'mental-status',
        loadComponent: () =>
          import('./mental-status/mental-status.page').then(
            (m) => m.MentalStatusPage
          ),
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
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
];
