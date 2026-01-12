import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToursFilterService {
  
  categoryValue = signal('');
  durationValue = signal('');
  priceValue = signal('');

  constructor() {
    effect(() => {
      console.log(this.durationValue())
      console.log(this.categoryValue())
      console.log(this.priceValue())
    })
  }

}
