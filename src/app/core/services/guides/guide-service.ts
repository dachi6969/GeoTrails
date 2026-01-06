import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';


export type Guide = {
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
}

@Injectable({
  providedIn: 'root',
})
export class GuideService {

  data = signal<Guide[] | null>(null);
  loading = signal<boolean>(false);
  error = signal<string>('');

  http = inject(HttpClient);

  fetchGuidesData() {
    if (this.data() !== null) return;
    this.loading.set(true);

    this.http.get<Guide[]>('/assets/data/guide-data.json')
    .pipe( retry(3) )
    .subscribe({
      next: (resp) => {
        this.data.set(resp);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(`something went wrong: ${error.status}`);
        this.loading.set(false);
      }
    })
  };

}
