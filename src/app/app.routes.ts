import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';

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
        .then(m => m.TaskListComponent), canActivate: [AuthGuard]
  },

{
  path: 'tasks/create',
  loadComponent: () =>
    import('./features/tasks/task-create/task-create')
      .then(m => m.TaskCreateComponent), canActivate: [AuthGuard]
},

{
  path: 'tasks/edit/:id',
  loadComponent: () =>
    import('./features/tasks/task-edit/task-edit')
      .then(m => m.TaskEditComponent), canActivate: [AuthGuard] 
},

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];