import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { delay, retry } from 'rxjs';

export type ImagesType = {
  card: string;
  intro: string;
  gallery: string[];
}

export type ToursDataType = {
  id: number;
  dayDuration: number;
  price: number;
  visitorsCount: number;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  images: ImagesType;
}

@Injectable({
  providedIn: 'root',
})
export class TourService {
  
  data = signal<ToursDataType[] | null>(null);
  loading = signal<boolean>(false);
  error = signal<string>('');

  http = inject(HttpClient);

  fetchToursData() {

    if ( this.data() !== null ) return;

    this.loading.set(true);

    this.http.get<ToursDataType[]>('/assets/data/tours-data.json')
    .pipe( retry(3), delay(1000) )
    .subscribe({
      next: (resp) => {
        this.loading.set(false);
        this.data.set(resp);
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set(`Something went wrong: ${error.status}`)
      }
    })
  }

}
