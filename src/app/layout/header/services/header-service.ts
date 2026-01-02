import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {

  isScrolled = signal<boolean>(false);
  isHeaderShown = signal<boolean>(false);

  colorSwap = computed(() => {
    if ( this.isScrolled() ) return 'dark'
    return this.isHeaderShown() ?
    'dark' : 'light'
  })

}
