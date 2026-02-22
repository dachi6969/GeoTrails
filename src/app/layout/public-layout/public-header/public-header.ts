import { Component, HostListener, inject, OnDestroy } from '@angular/core';
import { Typography } from "../../../shared/components/typography/typography";
import { LogoIcon } from "../../../shared/icons/logo-icon/logo-icon";
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { DesktopMenu } from "./desktop-menu/desktop-menu";
import { MobileMenu } from "./mobile-menu/mobile-menu";
import { HeaderSearch } from "./header-search/header-search";
import { AuthButtons } from "./auth-buttons/auth-buttons";
import { HeaderService } from './header-service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, filter, map} from 'rxjs';

@Component({
  selector: 'app-public-header',
  imports: [Typography, LogoIcon, DesktopMenu, MobileMenu, HeaderSearch, AuthButtons, RouterLink],
  templateUrl: './public-header.html',
  styleUrl: './public-header.css',
})
export class Header implements OnDestroy{

  private headerService = inject(HeaderService);
  private BreakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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
    combineLatest([
      this.BreakpointObserver.observe(['(max-width: 768px)'])
      .pipe(takeUntilDestroyed()),
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.route.firstChild;
    
          while (route?.firstChild) {
            route = route.firstChild;
          }
    
          return route?.snapshot.data ?? {};
        })
      )
    ]).subscribe(([obs,routeData]) => {
      this.isSmallScreen.set((obs.matches || Object.keys(routeData).length > 0))
    })
  }

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
