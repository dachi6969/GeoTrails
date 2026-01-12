import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderService } from '../header-service';
import { Typography } from "../../../../shared/components/typography/typography";


@Component({
  selector: 'app-desktop-menu',
  imports: [CommonModule, Typography, RouterLink],
  templateUrl: './desktop-menu.html',
  styleUrl: './desktop-menu.css',
})
export class DesktopMenu {

  private headerService = inject(HeaderService);
  colorSwap = this.headerService.colorSwap;


}
