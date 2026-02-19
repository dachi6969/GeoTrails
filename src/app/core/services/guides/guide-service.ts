import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Guide } from '../../models/guide.model';

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
