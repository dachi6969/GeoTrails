import { Component, computed, inject, OnInit } from '@angular/core';
import { TourService } from '../../../../core/services/tours/tour-service';
import { ToursFilterService } from '../../services/tours-filter-service';

@Component({
  selector: 'app-cards-section',
  imports: [],
  templateUrl: './cards-section.html',
  styleUrl: './cards-section.css',
})
export class CardsSection implements OnInit {

  toursFilterService = inject(ToursFilterService);
  tourService = inject(TourService);
  tours = this.tourService.data;
  loading = this.tourService.loading;

  toursData = computed(() => {
    if (
      this.toursFilterService.categoryValue() ||
      this.toursFilterService.durationValue() ||
      this.toursFilterService.priceValue() 
    ){
      return this.tours()?.filter((tour) => {
        return tour.category === this.toursFilterService.categoryValue().toLowerCase()
      })
    }
    return this.tours();
  })

  ngOnInit(): void {
    this.tourService.fetchToursData();
  }


}
