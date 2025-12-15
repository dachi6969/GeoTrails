import { Component, inject } from '@angular/core';
import { Typography } from "../../../shared/components/typography/typography";
import { MenuIcon } from "../../../shared/icons/menu-icon/menu-icon";
import { LogoIcon } from "../../../shared/icons/logo-icon/logo-icon";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Typography, MenuIcon, LogoIcon],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {


  router = inject(Router);

  navToHomePage() {
    this.router.navigate(['/home']);
  }
}
