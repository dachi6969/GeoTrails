import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Typography } from "../../shared/components/typography/typography";
import { LogoIcon } from "../../shared/icons/logo-icon/logo-icon";
import { RouterLink } from '@angular/router';
import { DesktopMenu } from "./desktop-menu/desktop-menu";
import { MobileMenu } from "./mobile-menu/mobile-menu";
import { HeaderSearch } from "./header-search/header-search";
import { AuthButtons } from "./auth-buttons/auth-buttons";
import { GuideService } from '../../core/services/guides/guide-service';
import { TourService } from '../../core/services/tours/tour-service';
import { HeaderService } from './services/header-service';

@Component({
  selector: 'app-header',
  imports: [Typography, LogoIcon, DesktopMenu, MobileMenu, HeaderSearch, AuthButtons, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{

  private guideService = inject(GuideService);
  private tourService = inject(TourService);
  private headerService  = inject(HeaderService);

  isScrolled = this.headerService.isScrolled;
  isHeaderShown = this.headerService.isHeaderShown;
  colorSwap = this.headerService.colorSwap;

  @HostListener('window:scroll')
  onScroll() {
    this.headerService.isScrolled.set(
      window.scrollY > 20
    )
  }

  ngOnInit(): void {
    this.guideService.fetchGuidesData();
    this.tourService.fetchToursData();
  }

  headerOn() {
    if ( this.isScrolled() ) return;
    this.isHeaderShown.set(true);
  }
  headerOff() {
    if ( this.isScrolled() ) return;
    this.isHeaderShown.set(false);
  }

}
