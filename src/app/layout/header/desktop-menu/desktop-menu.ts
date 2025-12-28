import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { DownArrow } from "../../../shared/icons/arrows/down-arrow/down-arrow";
import { GuideService } from '../../../core/services/guides/guide-service';
import { RatingStarsPipe } from "../../../shared/pipes/rating-stars-pipe";
import { Router } from '@angular/router';
import { TourService } from '../../../core/services/tours/tour-service';


@Component({
  selector: 'app-desktop-menu',
  imports: [CommonModule, DownArrow, RatingStarsPipe],
  templateUrl: './desktop-menu.html',
  styleUrl: './desktop-menu.css',
})
export class DesktopMenu {

  private router = inject(Router);
  private guideService = inject(GuideService);
  private tourService = inject(TourService);

  guides = this.guideService.data;
  private tours = this.tourService.data;

  tourTitles = computed(() => {
    return this.tours()?.map((tour) => tour.title);
  })

}
