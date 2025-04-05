import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'workout/:id',
    loadComponent: () => import('./pages/workout-details/workout-details.page').then((m) => m.WorkoutDetailsPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'workout-add',
    loadComponent: () => import('./pages/workout-add/workout-add.page').then( m => m.WorkoutAddPage)
  }
];
