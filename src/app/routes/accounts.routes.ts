import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: ':uuid',
        loadComponent: () => import('../views/users/detail/detail.component').then(c => c.DetailComponent),
        children: [
            // {
            //     path: 'edit',
            //     loadComponent: () => import('../views/accounts/edit/edit.component').then(c => c.EditComponent),
            // },
            // {
            //     path: 'posts',
            //     loadComponent: () => import('../views/accounts/edit/edit.component').then(c => c.EditComponent),
            // },

        ]
    },
    {
        path: ':uuid/edit',
        loadComponent: () => import('../views/accounts/edit/edit.component').then(c => c.EditComponent),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
