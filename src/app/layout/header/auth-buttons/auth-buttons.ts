import { Component, inject, output } from '@angular/core';
import { UiButton } from "../../../shared/components/buttons/ui-button/ui-button";
import { Router } from '@angular/router';

@Component({
  selector: 'auth-buttons',
  imports: [UiButton],
  templateUrl: './auth-buttons.html',
  styleUrl: './auth-buttons.css',
})
export class AuthButtons {

  closeMenu = output();

  router = inject(Router);

  closeMobileMenu() {
    this.closeMenu.emit();
  };

  navToLoginPage() {
    this.router.navigate(['/login']);
    this.closeMobileMenu();
  };
  navToRegisterPage() {
    this.router.navigate(['/register']);
    this.closeMobileMenu();
  };

}
