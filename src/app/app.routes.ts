import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard').then((c) => c.Dashboard),
  },
  {
    path: 'tasks',
    loadComponent: () => import('./features/tasks/tasks').then((c) => c.Tasks),
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./features/calendar/calendar').then((c) => c.Calendar),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./features/analytics/analytics').then((c) => c.Analytics),
  },
  {
    path: 'team',
    loadComponent: () => import('./features/team/team').then((c) => c.Team),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings').then((c) => c.Settings),
  },
];
