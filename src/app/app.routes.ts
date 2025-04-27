import { Routes } from '@angular/router';

// ==============================================


export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes').then(m => m.routes)
  },
  {
    path: 'workout/:id',
    loadComponent: () => import('./pages/workout-details/workout-details.page').then((m) => m.WorkoutDetailsPage)
  },
  {
    path: 'workout-edit/:id',
    loadComponent: () => import('./pages/workout-edit/workout-edit.page').then( m => m.WorkoutEditPage)
  },
  {
    path: 'pattern-add',
    loadComponent: () => import('./pages/pattern-add/pattern-add.page').then( m => m.PatternAddPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
