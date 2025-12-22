import { Component, inject, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DownArrow } from "../../../../shared/icons/arrows/down-arrow/down-arrow";
import { UpArrow } from "../../../../shared/icons/arrows/up-arrow/up-arrow";
import { ExitIcon } from "../../../../shared/icons/exit-icon/exit-icon";
import { LogoIcon } from "../../../../shared/icons/logo-icon/logo-icon";
import { GuideService } from '../../../../core/services/guides/guide-service';
import { RatingStarsPipe } from '../../../../shared/pipes/rating-stars-pipe';
import { AuthButtons } from "../../auth-buttons/auth-buttons";

@Component({
  selector: 'app-menu-sidebar',
  imports: [DownArrow, UpArrow, ExitIcon, LogoIcon, RatingStarsPipe, AuthButtons, RouterLink],
  templateUrl: './menu-sidebar.html',
  styleUrl: './menu-sidebar.css',
})
export class MenuSidebar {

  close = output();

  guidesIsOpen = signal(false);

  guideService = inject(GuideService);

  guides = this.guideService.data;


  closeMenu() {
    this.close.emit();
  }


  preventClose(event: any) {
    event.stopPropagation();
  };

  guideSectionToggle() {
    this.guidesIsOpen.update(prev => !prev);
  };
}
