import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StatusService } from '../../../core/services/user-status/status-service';

export const canActiveGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const statusService = inject(StatusService);

  const userInfo: any = JSON.parse(localStorage.getItem('userInfo') ?? '{}');

  const activeSlug = route.paramMap.get('slug');

  if ( activeSlug !== userInfo.name ) {
    return router.parseUrl('/home');
  };
  
  const status = statusService.isLoggedIn();

  if ( status ) return true;

  return statusService.confirm();

};
