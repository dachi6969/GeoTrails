import { Component, inject } from '@angular/core';
import { StatusService } from '../../../core/services/user-status/status-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-canactive-modal',
  imports: [],
  templateUrl: './global-canactive-modal.html',
  styleUrl: './global-canactive-modal.css',
})
export class GlobalCanactiveModal {

  statusService = inject(StatusService);
  router = inject(Router);

  close() {
    this.statusService.closeModal();
  }
  navToLoginPage() {
    this.statusService.closeModal();
    this.router.navigate(['/auth/login']);
  }
}
