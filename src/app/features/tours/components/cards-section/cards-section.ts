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
  searchBarValue = this.toursFilterService.searchValue;
  filteredCategory = this.toursFilterService.filtered;
  
  tourService = inject(TourService);
  tours = this.tourService.data;
  loading = this.tourService.loading;


  // triple filtering logic.
  toursData = computed(() => {
    const tours = this.tours() || [];
    const searched = this.searchBarValue().toLowerCase().trim();
    const { category, dayDuration, price } = this.filteredCategory();

    const [ minPrice, maxPrice ] = price.split(' - ').map(Number)

    return tours.filter((tour) => {

    const selectedCategory = 
    !category || tour.category === category;

    const selectedDayDuration = 
    !dayDuration || tour.dayDuration === dayDuration; 

    const searchFilter = 
    !searched || tour.title.toLowerCase().includes(searched);

    const selectedPrice = 
    !price || (tour.price >= minPrice && tour.price <= maxPrice)


    return selectedCategory && selectedDayDuration && searchFilter && selectedPrice

    })
  })

  ngOnInit(): void {
    this.tourService.fetchToursData();
  }

}
