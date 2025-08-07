import { Routes } from '@angular/router';
import { userLoggedGuard } from './guards/user-logged.guard';

export const routes: Routes = [
    {
        path: 'posts',
        loadChildren: () => import('./routes/posts.routes').then(r => r.routes),
        canActivate: [userLoggedGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./routes/auth.routes').then(r => r.routes),
    },
    {
        path: 'profile/:uuid',
        loadComponent: () => import('./views/users/detail/detail.component').then(c => c.DetailComponent),
        canActivate: [userLoggedGuard]
    },
    {
        path: '**',
        redirectTo: 'posts',
        pathMatch: 'full'
    },

];
