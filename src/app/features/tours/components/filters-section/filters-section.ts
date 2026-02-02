import { Component, computed, inject, signal } from '@angular/core';
import { FilterDropdown } from "./filter-dropdown/filter-dropdown";
import { TourService } from '../../../../core/services/tours/tour-service';
import { ToursFilterService } from '../../services/tours-filter-service';

export type Category = {
  option: string;
  dropDownName: string;
}

@Component({
  selector: 'app-filters-section',
  imports: [FilterDropdown],
  templateUrl: './filters-section.html',
  styleUrl: './filters-section.css',
})
export class FiltersSection {

  toursPrices = ['0 - 100', '100 - 200', '200 - 300'];

  categoryVal = signal('');
  dayDurationVal = signal('');
  priceVal = signal('');
  
  private toursFilterSerice = inject(ToursFilterService);
  private tourService = inject(TourService);
  tours = this.tourService.data;

  toursCategories = computed(() => {
    const arr: string[] = [];
    this.tours()?.map((tour) => {
      if ( !arr.includes(`${tour.category}` ) ) {
        arr.push(tour.category);
      }
    })
    return arr;
  });

  toursDurations = computed(() => {
    const arr: any[] = [];
    this.tours()?.map((tour) => {
      if ( !arr.includes(tour.dayDuration) ) {
        arr.push(tour.dayDuration);
      }
    })
    return arr;
  });

  categoryValue (category: Category): void {
    this.categoryVal.set(category.option);
  };

  durationValue (category: Category) {
    this.dayDurationVal.set(category.option);
  };

  priceValue (category: Category) {
    this.priceVal.set(category.option);
  };

  filterClick() {
    this.toursFilterSerice.filtered.update(prev => ({
      ...prev,
      category: this.categoryVal(),
      dayDuration: this.dayDurationVal(),
      price: this.priceVal()
    }))
  }

}
