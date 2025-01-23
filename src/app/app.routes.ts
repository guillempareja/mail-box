import { Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'inbox',
    loadComponent: () => import('./pages/inbox/inbox.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'process',
    loadComponent: () => import('./pages/process/process.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'reassign',
    loadComponent: () => import('./pages/reassign/reassign.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'verify',
    loadComponent: () => import('./pages/verify/verify.component'),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'inbox',
  },
];
