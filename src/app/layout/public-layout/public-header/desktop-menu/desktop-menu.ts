import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderService } from '../header-service';
import { Typography } from "../../../../shared/components/typography/typography";
import { UserInfoService } from '../../../../core/services/user-info/user-info-service';


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
  profileNavUrl = `/profile/${this.userInfo().name}`

}
