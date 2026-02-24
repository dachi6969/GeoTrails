import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderService } from '../header-service';
import { Typography } from "../../../../shared/components/typography/typography";
import { UserInfoService } from '../../../../core/services/user-info/user-info-service';
import { StatusService } from '../../../../core/services/user-status/status-service';


@Component({
  selector: 'app-desktop-menu',
  imports: [CommonModule, Typography, RouterLink],
  templateUrl: './desktop-menu.html',
  styleUrl: './desktop-menu.css',
})
export class DesktopMenu {

  private headerService = inject(HeaderService);
  colorSwap = this.headerService.colorSwap;

  private userInfoService = inject(UserInfoService);
  private userInfo = this.userInfoService.userInfo;

  private statusService = inject(StatusService);
  private isRegistered = this.statusService.isRegistered;
  private isLoggedIn = this.statusService.isLoggedIn;

  private router = inject(Router);


  scrollToFooter() {
    window.document.getElementById("footer")?.scrollIntoView({
      behavior: "smooth"
    })
  };

  navToProfilePage(): void {
    if ( !this.isRegistered() || !this.isLoggedIn() ) {
      this.statusService.openModal();
      return;
    }

    const userName = this.userInfo()?.name;

    this.router.navigate(['/profile', userName])
  }

}
