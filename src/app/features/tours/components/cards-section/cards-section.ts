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

  filteredCategory = this.toursFilterService.filtered;

  toursData = computed(() => {
    const category = this.filteredCategory()['category'];
    const dayDuration = this.filteredCategory()['dayDuration'];
    const price = this.filteredCategory()['price'];

    const filteredTours = this.tours()?.filter(tour => {
      return (
        tour.category.includes(category) &&  
        tour.dayDuration.toString().includes(dayDuration)
      )
    })


    return filteredTours;
  })

  ngOnInit(): void {
    this.tourService.fetchToursData();
  }


}
