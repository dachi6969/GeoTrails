import { Component, inject, signal } from '@angular/core';
import { MenuIcon } from "../../../../shared/icons/menu-icon/menu-icon";
import { ProfileIcon } from "../../../../shared/icons/profile-icon/profile-icon";
import { Router } from '@angular/router';
import { MenuSidebar } from "./menu-sidebar/menu-sidebar";
import { HeaderService } from '../header-service';
import { UserInfoService } from '../../../../core/services/user-info/user-info-service';
import { StatusService } from '../../../../core/services/user-status/status-service';

@Component({
  selector: 'app-mobile-menu',
  imports: [MenuIcon, ProfileIcon, MenuSidebar],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.css',
})
export class MobileMenu {

  isMenuOpen = signal<boolean>(false);

  private headerService = inject(HeaderService);
  
  private userInfoService = inject(UserInfoService);
  private userInfo = this.userInfoService.userInfo;
  
  private statusService = inject(StatusService);
  private isRegistered = this.statusService.isRegistered;
  private isLoggedIn = this.statusService.isLoggedIn;
  
  private router = inject(Router);

  colorSwap = this.headerService.colorSwap;

  openMenu() {
    this.isMenuOpen.set(true);
  };
  closeMenu() {
    this.isMenuOpen.set(false);
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
