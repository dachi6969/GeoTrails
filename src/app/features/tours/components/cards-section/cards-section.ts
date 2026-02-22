import { Component, inject, OnDestroy } from '@angular/core';
import { TourService } from '../../../../core/services/tours/tour-service';
import { ToursFilterService } from '../../services/tours-filter-service';
import { CommonModule } from '@angular/common';
import { combineLatest, distinctUntilChanged, map } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { UiButton } from "../../../../shared/components/buttons/ui-button/ui-button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards-section',
  imports: [CommonModule, UiButton],
  templateUrl: './cards-section.html',
  styleUrl: './cards-section.css',
})
export class CardsSection implements OnDestroy {

  toursFilterService = inject(ToursFilterService);
  searchBarValue = this.toursFilterService.searchValue;
  filteredCategory = this.toursFilterService.filtered;
  
  private tourService = inject(TourService);
  private router = inject(Router);

  readonly tours$ =
  this.tourService.getTours();

  readonly filteredTours$ = 
  combineLatest([
    this.tours$,
    toObservable(this.filteredCategory),
    toObservable(this.searchBarValue)
    .pipe(
      map(searched => searched.toLocaleLowerCase().trim()),
      distinctUntilChanged()
    )
  ]).pipe(
    map(([tours,filters,searchVal]) => {
      const { category, dayDuration, price } = filters;
      const [ minPrice, maxPrice ] = price.split(' - ').map(Number);

      return tours.filter(tour => {
        const selectedCategory = 
        !category || tour.category === category;

        const selectedDayDuration = 
        !dayDuration || String(tour.dayDuration) === dayDuration; 

        const selectedPrice = 
        !price || (tour.price >= minPrice && tour.price <= maxPrice);

        const searchFilter = 
        !searchVal || tour.title.toLowerCase().includes(searchVal);

        return selectedCategory && selectedDayDuration && selectedPrice && searchFilter
      })
    })
  )

  ngOnDestroy(): void {
    this.toursFilterService.resetFilter();
  }

  navToCurrentTour(tourName: string): void {
    this.router.navigate(['tours', tourName]);
  }

}
