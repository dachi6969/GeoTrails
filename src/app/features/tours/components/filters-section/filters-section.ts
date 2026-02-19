import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FilterDropdown } from "./filter-dropdown/filter-dropdown";
import { TourService } from '../../../../core/services/tours/tour-service';
import { ToursFilterService } from '../../services/tours-filter-service';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

export type Category = {
  option: string;
  dropDownName: string;
}

@Component({
  selector: 'app-filters-section',
  imports: [FilterDropdown, FormsModule, CommonModule],
  templateUrl: './filters-section.html',
  styleUrl: './filters-section.css',
})
export class FiltersSection {

  toursPrices = ['0 - 100', '100 - 150', '150 - 250'];

  searchbarValue = signal('');
  categoryVal = signal('');
  dayDurationVal = signal('');
  priceVal = signal('');
  
  private toursFilterSerice = inject(ToursFilterService);
  private tourService = inject(TourService);
  readonly tours$ = this.tourService.getTours();

  readonly toursCategories$ = this.tours$.pipe(
    map(tours => 
      [...new Set(tours.map(tour => String(tour.category)))] // returning existed categories for dropdown
    ));

  readonly toursDurations$ = this.tours$.pipe(
    map(tours => 
      [...new Set(tours.map(tour => String(tour.dayDuration)))] // returning existed dayDurations for dropdown
    ));

  setValue(signalRef: WritableSignal<string>, option: string): void {
    signalRef.set(option);
  };

  filterClick(): void {
    this.toursFilterSerice.searchValue.set(this.searchbarValue())

    this.toursFilterSerice.filtered.update(prev => ({
      ...prev,
      category: this.categoryVal(),
      dayDuration: this.dayDurationVal(),
      price: this.priceVal()
    }))
  };


}
