import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { TourService } from '../../../../core/services/tours/tour-service';
import { UiButton } from "../../../../shared/components/buttons/ui-button/ui-button";

@Component({
  selector: 'app-selected-tour-page',
  imports: [NgOptimizedImage, CommonModule, UiButton],
  templateUrl: './selected-tour-page.html',
  styleUrl: './selected-tour-page.css',
})
export class SelectedTourPage {

  private route = inject(ActivatedRoute);
  private tourService = inject(TourService);

  readonly currentTour$ =
  this.route.paramMap.pipe(
    map(param => param.get('title')),
    switchMap((title) => {
      return this.tourService.getTours().pipe(
        map(tours => tours.filter(tour => tour.title === title))
      )
    }))

}
