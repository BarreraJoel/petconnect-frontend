import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../views/users/detail/detail.component').then(c => c.DetailComponent),
    },
    {
        path: ':slug/edit-post',
        loadComponent: () => import('../views/posts/edit/edit.component').then(c => c.EditComponent)
    },
    {
        path: 'posts',
        loadComponent: () => import('../views/accounts/post-list-account/post-list-account.component').then(c => c.PostListAccountComponent)
    },
    {
        path: 'edit-profile',
        loadComponent: () => import('../views/accounts/edit/edit.component').then(c => c.EditComponent),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
