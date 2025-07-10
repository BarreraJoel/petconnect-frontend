import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./views/home/home.component').then(c => c.HomeComponent),
    },
    {
        path: 'auth',
        loadChildren: () => import('./routes/auth.routes').then(r => r.routes),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },

];
