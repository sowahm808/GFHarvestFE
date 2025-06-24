import { Routes } from '@angular/router';

export const routes: Routes = [
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
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'child-account',
    loadComponent: () =>
      import('./child-account/child-account.page').then((m) => m.ChildAccountPage),
  },
  {
    path: 'mental-status',
    loadComponent: () =>
      import('./mental-status/mental-status.page').then((m) => m.MentalStatusPage),
  },
  {
    path: 'bible-quiz',
    loadComponent: () =>
      import('./bible-quiz/bible-quiz.page').then((m) => m.BibleQuizPage),
  },
  {
    path: 'essay-tracker',
    loadComponent: () =>
      import('./essay-tracker/essay-tracker.page').then((m) => m.EssayTrackerPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
