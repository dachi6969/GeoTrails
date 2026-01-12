import { Component, computed, inject, signal } from '@angular/core';
import { FilterDropdown } from "./filter-dropdown/filter-dropdown";
import { TourService } from '../../../../core/services/tours/tour-service';
import { ToursFilterService } from '../../services/tours-filter-service';

@Component({
  selector: 'app-filters-section',
  imports: [FilterDropdown],
  templateUrl: './filters-section.html',
  styleUrl: './filters-section.css',
})
export class FiltersSection {

  toursPrices = ['0 - 50', '50 - 100', '100 - 200'];
  
  toursFilterSerice = inject(ToursFilterService);
  tourService = inject(TourService);
  tours = this.tourService.data;

  toursCategories = computed(() => {
    const arr: any = [];
    this.tours()?.map((tour) => {
      if ( !arr.includes(`${tour.category}`) ) {
        arr.push(tour.category);
      }
    })
    return arr;
  });

  toursDurations = computed(() => {
    const arr: any = [];
    this.tours()?.map((tour) => {
      if ( !arr.includes(tour.dayDuration) ) {
        arr.push(tour.dayDuration);
      }
    })
    return arr;
  });

  categoryValue (category: any): void {
    if ( category.dropDownName === 'Category' ) {
      this.toursFilterSerice.categoryValue.set(category.option)
    }else if ( category.dropDownName === 'Duration' ) {
      this.toursFilterSerice.durationValue.set(category.option)
    }else if ( category.dropDownName === 'Price' ) {
      this.toursFilterSerice.priceValue.set(category.option)
    }
  }

}
