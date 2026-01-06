import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { DownArrow } from "../../../../shared/icons/arrows/down-arrow/down-arrow";
import { GuideService } from '../../../../core/services/guides/guide-service';
import { RatingStarsPipe } from "../../../../shared/pipes/rating-stars-pipe";
import { Router } from '@angular/router';
import { TourService } from '../../../../core/services/tours/tour-service';
import { HeaderService } from '../header-service';
import { Typography } from "../../../../shared/components/typography/typography";


@Component({
  selector: 'app-desktop-menu',
  imports: [CommonModule, DownArrow, RatingStarsPipe, Typography],
  templateUrl: './desktop-menu.html',
  styleUrl: './desktop-menu.css',
})
export class DesktopMenu {

  private router = inject(Router);

  private guideService = inject(GuideService);
  private tourService = inject(TourService);
  private headerService = inject(HeaderService);

  private tours = this.tourService.data;
  guides = this.guideService.data;
  colorSwap = this.headerService.colorSwap;

  tourTitles = computed(() => {
    return this.tours()?.map((tour) => tour.title);
  })

}
