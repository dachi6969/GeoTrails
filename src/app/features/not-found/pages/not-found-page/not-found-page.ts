import { Component, inject } from '@angular/core';
import { UiButton } from "../../../../shared/components/buttons/ui-button/ui-button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [UiButton],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.css',
})
export class NotFoundPage {

  private router = inject(Router);

  navBackToHome(): void {
    this.router.navigate(['/home']);
  }
  navToToursPage(): void {
    this.router.navigate(['/tours']);
  }

}
