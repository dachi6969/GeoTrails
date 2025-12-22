import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DownArrow } from "../../../shared/icons/arrows/down-arrow/down-arrow";
import { GuideService } from '../../../core/services/guides/guide-service';
import { RatingStarsPipe } from "../../../shared/pipes/rating-stars-pipe";
import { Router } from '@angular/router';


@Component({
  selector: 'app-desktop-menu',
  imports: [CommonModule, DownArrow, RatingStarsPipe],
  templateUrl: './desktop-menu.html',
  styleUrl: './desktop-menu.css',
})
export class DesktopMenu {

  router = inject(Router);
  guideService = inject(GuideService);

  guides = this.guideService.data;


}
