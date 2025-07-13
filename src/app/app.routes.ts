import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'posts',
        // loadComponent: () => import('./views/home/home.component').then(c => c.HomeComponent),
        loadChildren: () => import('./routes/posts.routes').then(r => r.routes),
    },
    {
        path: 'auth',
        loadChildren: () => import('./routes/auth.routes').then(r => r.routes),
    },
    {
        path: '**',
        redirectTo: 'posts',
        pathMatch: 'full'
    },

];
