import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'sign-in',
        loadComponent: () => import('../views/auth/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'sign-up',
        loadComponent: () => import('../views/auth/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
    },
];
