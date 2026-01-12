import { computed, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  
  isScrolled = signal<boolean>(false);
  isHovered = signal<boolean>(false);
  isSmallScreen = signal<boolean>(false);

  bgColor = computed(() => {
    return (
    this.isScrolled() ||
    this.isHovered() ||
    this.isSmallScreen() 
    ) ? 
    'white' : 'transparent'
  })

  colorSwap = computed(() => {
    if (this.bgColor() === 'white') {
      return 'dark'
    }else{
      return 'light'
    }
  })

}
