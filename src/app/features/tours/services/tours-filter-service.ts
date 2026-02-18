import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToursFilterService {

  initialFilterValue = {
    category: '',
    dayDuration: '',
    price: ''
  };

  filtered = signal<any>(this.initialFilterValue);
  
  searchValue = signal('');

  resetFilter() {
    this.filtered.set(this.initialFilterValue)
  }

}
