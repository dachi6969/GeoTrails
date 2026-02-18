import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';


export interface Guide {
  id: number;
  avalible: boolean;
  experienceYears: number;
  languages: string [];
  name: string;
  lastname: string;
  location: string;
  rating: number;
  pricePerDay: number;
  specialty: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class GuideService {

  private guideSubject = new BehaviorSubject<Guide[]>([]);
  guides$ = this.guideSubject.asObservable();

  http = inject(HttpClient);

  getGuideData(): void {
    if ( this.guideSubject.value.length > 0 ) return;

    this.http.get<Guide[]>('/assets/data/guide-data.json')
    .subscribe(response => this.guideSubject.next(response));
  }

}
