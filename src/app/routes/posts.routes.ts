import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../views/posts/dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
        path: 'publish',
        loadComponent: () => import('../views/posts/create/create.component').then(c => c.CreateComponent)
    },
    {
        path: ':slug',
        loadComponent: () => import('../views/posts/detail/detail.component').then(c => c.DetailComponent)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
