import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TourService } from '../../../core/services/tours/tour-service';
import { catchError, map, of } from 'rxjs';

export const canEnterGuard: CanActivateFn = (route) => {

  const tourService = inject(TourService);
  const router = inject(Router);
  
  const slug = 
  route.paramMap.get('title')?.toLowerCase();

  return tourService.getTours().pipe(
    map(tours => {
      const found = tours.some(tour => tour.title.toLowerCase() === slug);

      return found || router.createUrlTree(['/not-found'])
    }),
    catchError((err) => {
      console.error('tour page guard error:', err);

      return of(router.createUrlTree(['/not-found']));
    })
    
  )


};
