import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, shareReplay } from 'rxjs';
import { ToursData } from '../../models/tour.model';


@Injectable({
  providedIn: 'root',
})
export class TourService {

  http = inject(HttpClient);

  readonly tours$: Observable<ToursData[]> =
  this.http.get<ToursData[]>('/assets/data/tours-data.json')
  .pipe( 
    delay(1000),
    shareReplay(1)
  );

  getTours(): Observable<ToursData[]>{
    return this.tours$
  }

}
