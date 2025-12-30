import { Component, computed, inject, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DownArrow } from "../../../../shared/icons/arrows/down-arrow/down-arrow";
import { UpArrow } from "../../../../shared/icons/arrows/up-arrow/up-arrow";
import { ExitIcon } from "../../../../shared/icons/exit-icon/exit-icon";
import { LogoIcon } from "../../../../shared/icons/logo-icon/logo-icon";
import { GuideService } from '../../../../core/services/guides/guide-service';
import { RatingStarsPipe } from '../../../../shared/pipes/rating-stars-pipe';
import { AuthButtons } from "../../auth-buttons/auth-buttons";
import { TourService } from '../../../../core/services/tours/tour-service';
import { UiButton } from "../../../../shared/components/buttons/ui-button/ui-button";

@Component({
  selector: 'app-menu-sidebar',
  imports: [DownArrow, UpArrow, ExitIcon, LogoIcon, RatingStarsPipe, RouterLink, AuthButtons],
  templateUrl: './menu-sidebar.html',
  styleUrl: './menu-sidebar.css',
})
export class MenuSidebar {

  close = output();

  isGuideSectionOpen = signal<boolean>(false);
  isTourSectionOpen = signal<boolean>(false);

  private guideService = inject(GuideService);
  private tourService = inject(TourService);

  guides = this.guideService.data;
  tours = this.tourService.data;

  tourTitles = computed(() => {
    return this.tours()?.map((tour) => tour.title);
  });

  closeMenu() {
    this.close.emit();
  }


  preventClose(event: any) {
    event.stopPropagation();
  };

  guideSectionToggle() {
    this.isGuideSectionOpen.update(prev => !prev);
  };
  tourSectionToggle() {
    this.isTourSectionOpen.update(prev => !prev);
  }
}
