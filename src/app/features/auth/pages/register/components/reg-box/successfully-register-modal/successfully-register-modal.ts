import { Component, inject, output } from '@angular/core';
import { UiButton } from "../../../../../../../shared/components/buttons/ui-button/ui-button";
import { Router } from '@angular/router';

@Component({
  selector: 'successfully-register-modal',
  imports: [UiButton],
  templateUrl: './successfully-register-modal.html',
  styleUrl: './successfully-register-modal.css',
})
export class SucessfullyRegisterModal {

  onConfirm = output();

  router = inject(Router);

  confirmHandle() {
    this.onConfirm.emit();
    this.router.navigate(['/auth/login'])
  }
}
