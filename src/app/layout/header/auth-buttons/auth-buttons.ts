import { Component, inject, output } from '@angular/core';
import { UiButton } from "../../../shared/components/buttons/ui-button/ui-button";
import { Router } from '@angular/router';
import { HeaderService } from '../services/header-service';

@Component({
  selector: 'auth-buttons',
  imports: [UiButton],
  templateUrl: './auth-buttons.html',
  styleUrl: './auth-buttons.css',
})
export class AuthButtons {

  closeMenu = output();

  router = inject(Router);
  headerService = inject(HeaderService);

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
