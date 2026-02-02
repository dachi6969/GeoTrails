import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToursFilterService {

  filtered = signal<any>({
    category: '',
    dayDuration: '',
    price: ''
  });


}
