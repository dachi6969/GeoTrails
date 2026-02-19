import { Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { SearchIcon } from "../../../../shared/icons/search-icon/search-icon";
import { LeftArrow } from "../../../../shared/icons/arrows/left-arrow/left-arrow";
import { CommonModule } from '@angular/common';
import { TourService } from '../../../../core/services/tours/tour-service';
import { HeaderService } from '../header-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-header-search',
  imports: [SearchIcon, LeftArrow, CommonModule, CommonModule, ReactiveFormsModule],
  templateUrl: './header-search.html',
  styleUrl: './header-search.css',
})
export class HeaderSearch {

  activeBar = signal(0);
  isSearchOpen = signal<boolean>(false);

  private tourService = inject(TourService);
  private headerService = inject(HeaderService);
  colorSwap = this.headerService.colorSwap;

  form = new FormControl<string>('');

  readonly tourTitles$ = 
  this.form.valueChanges.pipe(
    debounceTime(500),
    map(value => String(value).toLowerCase().trim()),
    distinctUntilChanged(),

    switchMap(searchVal => {
      if ( searchVal === '' ) return of([]);
      return this.tourService.getTours().pipe(
        map(tours => tours.filter(tour => 
          tour.title.toLowerCase().includes(searchVal)
        ))
      )
    })
  )

  @ViewChild('headerSearch') searchInput!: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      if (this.isSearchOpen()) {
        queueMicrotask(() => {   
          this.searchInput.nativeElement.focus(); // making tiny delay before element appears
        })
      }
    })
  }

  openSearch() {
    this.isSearchOpen.set(true);
  };
  closeSearch() {
    this.form.reset();
    this.isSearchOpen.set(false);
    this.activeBar.set(0);
  };


}
