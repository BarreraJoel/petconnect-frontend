import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../views/posts/dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
        path: ':uuid/edit',
        loadComponent: () => import('../views/posts/edit/edit.component').then(c => c.EditComponent)
    },
    {
        path: ':uuid',
        loadComponent: () => import('../views/posts/detail/detail.component').then(c => c.DetailComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('../views/posts/create/create.component').then(c => c.CreateComponent)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
