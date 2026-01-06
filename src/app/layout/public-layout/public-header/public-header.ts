import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { Typography } from "../../../shared/components/typography/typography";
import { LogoIcon } from "../../../shared/icons/logo-icon/logo-icon";
import { RouterLink } from '@angular/router';
import { DesktopMenu } from "./desktop-menu/desktop-menu";
import { MobileMenu } from "./mobile-menu/mobile-menu";
import { HeaderSearch } from "./header-search/header-search";
import { AuthButtons } from "./auth-buttons/auth-buttons";
import { GuideService } from '../../../core/services/guides/guide-service';
import { TourService } from '../../../core/services/tours/tour-service';
import { HeaderService } from './header-service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-public-header',
  imports: [Typography, LogoIcon, DesktopMenu, MobileMenu, HeaderSearch, AuthButtons, RouterLink],
  templateUrl: './public-header.html',
  styleUrl: './public-header.css',
})
export class Header implements OnInit, OnDestroy{

  private guideService = inject(GuideService);
  private tourService = inject(TourService);
  private headerService = inject(HeaderService);

  isScrolled = this.headerService.isScrolled;
  colorSwap = this.headerService.colorSwap;
  isSmallScreen = this.headerService.isSmallScreen;
  bgColor = this.headerService.bgColor;

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(
      window.scrollY > 40
    )
  }

  constructor() {
    inject(BreakpointObserver)
    .observe(['(max-width: 768px)'])
    .pipe(takeUntilDestroyed())
    .subscribe(result => this.isSmallScreen.set(result.matches));
  }

  ngOnInit(): void {
    this.guideService.fetchGuidesData();
    this.tourService.fetchToursData();
  };

  ngOnDestroy(): void {
    this.headerService.isHovered.set(false);
    this.headerService.isScrolled.set(false);
  }

  onHover() {
    this.headerService.isHovered.set(true);
  }
  onLeave() {
    this.headerService.isHovered.set(false);
  }


}
