import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const userLoggedGuard: CanActivateFn = async (route, state) => {

  let authService: AuthService = inject(AuthService);
  let router: Router = inject(Router);

  try {
    await authService.loadUser();
    return true;
  } catch (error) {
    router.navigateByUrl('/auth/sign-in');
    return false;
  }
};
