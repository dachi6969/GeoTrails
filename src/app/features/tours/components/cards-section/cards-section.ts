import { Component, inject, OnDestroy } from '@angular/core';
import { TourService } from '../../../../core/services/tours/tour-service';
import { ToursFilterService } from '../../services/tours-filter-service';
import { CommonModule } from '@angular/common';
import { combineLatest, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cards-section',
  imports: [CommonModule],
  templateUrl: './cards-section.html',
  styleUrl: './cards-section.css',
})
export class CardsSection implements OnDestroy {

  toursFilterService = inject(ToursFilterService);
  searchBarValue = this.toursFilterService.searchValue;
  filteredCategory = this.toursFilterService.filtered;
  
  tourService = inject(TourService);

  readonly tours$ =
  this.tourService.getTours();

  readonly filteredTours$ = 
  combineLatest([
    this.tours$,
    toObservable(this.filteredCategory),
    toObservable(this.searchBarValue)
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
  ]).pipe(
    map(([tours,filters,searchVal]) => {
      const { category, dayDuration, price } = filters;
      const searched = searchVal.toLowerCase().trim();
      const [ minPrice, maxPrice ] = price.split(' - ').map(Number);

      return tours.filter(tour => {
        const selectedCategory = 
        !category || tour.category === category;

        const selectedDayDuration = 
        !dayDuration || String(tour.dayDuration) === dayDuration; 

        const selectedPrice = 
        !price || (tour.price >= minPrice && tour.price <= maxPrice);

        const searchFilter = 
        !searched || tour.title.toLowerCase().includes(searched);

        return selectedCategory && selectedDayDuration && selectedPrice && searchFilter
      })
    })
  )

  ngOnDestroy(): void {
    this.toursFilterService.resetFilter();
  }

}
