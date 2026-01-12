import { Component, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExitIcon } from "../../../../../shared/icons/exit-icon/exit-icon";
import { LogoIcon } from "../../../../../shared/icons/logo-icon/logo-icon";
import { AuthButtons } from "../../auth-buttons/auth-buttons";

@Component({
  selector: 'app-menu-sidebar',
  imports: [ExitIcon, LogoIcon, RouterLink, AuthButtons],
  templateUrl: './menu-sidebar.html',
  styleUrl: './menu-sidebar.css',
})
export class MenuSidebar {

  close = output();

  isGuideSectionOpen = signal<boolean>(false);
  isTourSectionOpen = signal<boolean>(false);

  closeMenu() {
    this.close.emit();
  }


  preventClose(event: any) {
    event.stopPropagation();
  };

}
