import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    children: [
      {
        path: 'workouts-list',
        loadComponent: () => import('./pages/workouts-list/workouts-list.page').then( m => m.WorkoutsListPage)
      },
      {
        path: 'workout-add',
        loadComponent: () => import('./pages/workout-add/workout-add.page').then( m => m.WorkoutAddPage)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
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
    path: 'pattern-add',
    loadComponent: () => import('./pages/pattern-add/pattern-add.page').then( m => m.PatternAddPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];
