import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register')
        .then(m => m.RegisterComponent)
  },

  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/tasks/task-list/task-list')
        .then(m => m.TaskListComponent)
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];