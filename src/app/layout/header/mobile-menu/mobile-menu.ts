import { Component, inject, OnDestroy, signal } from '@angular/core';
import { MenuIcon } from "../../../shared/icons/menu-icon/menu-icon";
import { ProfileIcon } from "../../../shared/icons/profile-icon/profile-icon";
import { Router } from '@angular/router';
import { MenuSidebar } from "./menu-sidebar/menu-sidebar";

@Component({
  selector: 'app-mobile-menu',
  imports: [MenuIcon, ProfileIcon, MenuSidebar],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.css',
})
export class MobileMenu {

  isMenuOpen = signal<boolean>(false);

  router = inject(Router);

  openMenu() {
    this.isMenuOpen.set(true);
  };
  closeMenu() {
    this.isMenuOpen.set(false);
  };

}
