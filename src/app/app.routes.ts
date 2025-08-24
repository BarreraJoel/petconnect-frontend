import { Routes } from '@angular/router';
import { userLoggedGuard } from './guards/user-logged.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./routes/auth.routes').then(r => r.routes),
    },
    {
        path: 'posts',
        loadChildren: () => import('./routes/posts.routes').then(r => r.routes),
        canActivate: [userLoggedGuard]
    },
    {
        path: ':username',
        loadChildren: () => import('./routes/accounts.routes').then(r => r.routes),
        canActivate: [userLoggedGuard]
    },
    {
        path: '**',
        redirectTo: 'posts',
        pathMatch: 'full'
    },

];
