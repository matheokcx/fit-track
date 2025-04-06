import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    children: [
      {
        path: 'workoutAdd',
        loadComponent: () => import('./pages/workout-add/workout-add.page').then( m => m.WorkoutAddPage)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
      },
      {
        path: 'patternAdd',
        loadComponent: () => import('./pages/pattern-add/pattern-add.page').then( m => m.PatternAddPage)
      },
      {
        path: '',
        redirectTo: 'home/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'workout/:id',
    loadComponent: () => import('./pages/workout-details/workout-details.page').then((m) => m.WorkoutDetailsPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];
