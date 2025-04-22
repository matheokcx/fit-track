import { Routes } from "@angular/router";

// ==============================================


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.page').then((m) => m.HomePage),
    children: [
      {
        path: 'workouts-list',
        loadComponent: () => import('../workouts-list/workouts-list.page').then(m => m.WorkoutsListPage)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('../dashboard/dashboard.page').then(m => m.DashboardPage)
      },
      {
        path: 'dictionary',
        loadComponent: () => import('../dictionary/dictionary.page').then(m => m.DictionaryPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('../profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
