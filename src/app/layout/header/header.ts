import { Component, inject, OnInit } from '@angular/core';
import { Typography } from "../../shared/components/typography/typography";
import { LogoIcon } from "../../shared/icons/logo-icon/logo-icon";
import { RouterLink } from '@angular/router';
import { DesktopMenu } from "./desktop-menu/desktop-menu";
import { MobileMenu } from "./mobile-menu/mobile-menu";
import { HeaderSearch } from "./header-search/header-search";
import { AuthButtons } from "./auth-buttons/auth-buttons";
import { GuideService } from '../../core/services/guides/guide-service';

@Component({
  selector: 'app-header',
  imports: [Typography, LogoIcon, DesktopMenu, MobileMenu, HeaderSearch, AuthButtons, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{

  guideService = inject(GuideService);

  ngOnInit(): void {
    this.guideService.fetchGuidesData();
  }

}
