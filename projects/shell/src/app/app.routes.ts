import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { authGuard } from './guards/auth.guard';
import { ShellComponent } from './components/shell-component/shell-component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ShellComponent,  // shell wraps these child routes
    canActivate: [authGuard],   // protect these routes
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./../../../dashboard/src/app/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('./../../../user-management/src/app/user-management/user-management.module').then(m => m.UserManagementModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

