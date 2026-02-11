import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToursFilterService {

  searchValue = signal('');

  filtered = signal<any>({
    category: '',
    dayDuration: '',
    price: ''
  });
  

}
