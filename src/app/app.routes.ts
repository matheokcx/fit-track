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
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
      },
      {
        path: 'dictionary',
        loadComponent: () => import('./pages/dictionary/dictionary.page').then( m => m.DictionaryPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: 'home/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'workout-add',
    loadComponent: () => import('./pages/workout-add/workout-add.page').then( m => m.WorkoutAddPage)
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
    redirectTo: 'home/dashboard',
    pathMatch: 'full'
  }
];
