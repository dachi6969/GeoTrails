import { Component, inject, OnInit } from '@angular/core';
import { GuideService } from '../../../../core/services/guides/guide-service';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { UiButton } from "../../../../shared/components/buttons/ui-button/ui-button";
import { RatingFormat } from '../../../../shared/pipes/rating-format-pipe';

@Component({
  selector: 'app-guides-page',
  imports: [NgOptimizedImage, UiButton, RatingFormat, CommonModule],
  templateUrl: './guides-page.html',
  styleUrl: './guides-page.css',
})
export class GuidesPage implements OnInit {

  private guideService = inject(GuideService);
  
  readonly guides$ = 
  this.guideService.guides$;

  ngOnInit(): void {
    this.guideService.getGuideData();
  }

}
