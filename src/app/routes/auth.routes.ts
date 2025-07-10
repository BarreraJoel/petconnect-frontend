import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('../views/auth/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('../views/auth/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
    },
];
