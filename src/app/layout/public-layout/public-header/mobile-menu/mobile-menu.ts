import { Component, inject, signal } from '@angular/core';
import { MenuIcon } from "../../../../shared/icons/menu-icon/menu-icon";
import { ProfileIcon } from "../../../../shared/icons/profile-icon/profile-icon";
import { Router } from '@angular/router';
import { MenuSidebar } from "./menu-sidebar/menu-sidebar";
import { HeaderService } from '../header-service';
import { UserInfoService } from '../../../../core/services/user-info/user-info-service';

@Component({
  selector: 'app-mobile-menu',
  imports: [MenuIcon, ProfileIcon, MenuSidebar],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.css',
})
export class MobileMenu {

  isMenuOpen = signal<boolean>(false);

  private router = inject(Router);
  private headerService = inject(HeaderService);

  private userInfoService = inject(UserInfoService);
  private userInfo = this.userInfoService.userInfo;

  colorSwap = this.headerService.colorSwap;

  openMenu() {
    this.isMenuOpen.set(true);
  };
  closeMenu() {
    this.isMenuOpen.set(false);
  };

  navToProfilePage() {
    this.router.navigate(['profile', `${this.userInfo().name}`]);
  }

}
