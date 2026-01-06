import { Component, computed, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { SearchIcon } from "../../../../shared/icons/search-icon/search-icon";
import { LeftArrow } from "../../../../shared/icons/arrows/left-arrow/left-arrow";
import { CommonModule } from '@angular/common';
import { TourService } from '../../../../core/services/tours/tour-service';
import { HeaderService } from '../header-service';


@Component({
  selector: 'app-header-search',
  imports: [SearchIcon, LeftArrow, CommonModule],
  templateUrl: './header-search.html',
  styleUrl: './header-search.css',
})
export class HeaderSearch {

  inputValue = signal('');
  activeBar = signal(0);

  searchIsOpen = signal<boolean>(false);
  isSearchMatched = signal<boolean>(false);

  private tourService = inject(TourService);
  private headerService = inject(HeaderService);
  
  tours = this.tourService.data;
  colorSwap = this.headerService.colorSwap;

  tourTitles = computed(() => {
    return this.tours()?.map((tour) => tour.title);
  });


  searchMatch = computed(() => {
    const value = this.inputValue().toLowerCase().trim();
    if (!value) return null;
  
    const filtered = this.tourTitles()?.filter(tour =>
      tour.toLowerCase().includes(value)
    );
  
    return filtered?.length ? filtered : null;
  });
  

  searchResultMsg = computed(() => {
    if (!this.inputValue()) {
      return 'No recent searches';
    }
  
    if (this.searchMatch() === null) {
      return `No results for "${this.inputValue()}"`;
    }
  
    return '';
  });
  


  @ViewChild('headerSearch') searchInput!: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      if (this.searchIsOpen()) {
        queueMicrotask(() => {
          this.searchInput.nativeElement.focus();
        })
      }
    })
  }


  openSearch() {
    this.searchIsOpen.set(true);
  };
  closeSearch() {
    this.searchIsOpen.set(false);
  };
  inputValueChange(event: any) {
    const value = event.target.value;
    this.inputValue.set(value);
  }
}
