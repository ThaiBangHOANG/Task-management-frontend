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
  path: 'tasks/create',
  loadComponent: () =>
    import('./features/tasks/task-create/task-create')
      .then(m => m.TaskCreateComponent)
},

{
  path: 'tasks/edit/:id',
  loadComponent: () =>
    import('./features/tasks/task-edit/task-edit')
      .then(m => m.TaskEditComponent)
},

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];