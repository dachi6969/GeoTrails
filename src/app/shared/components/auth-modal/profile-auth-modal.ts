import { Component, inject } from '@angular/core';
import { StatusService } from '../../../core/services/user-status/status-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-canactive-modal',
  imports: [],
  templateUrl: './profile-auth-modal.html',
  styleUrl: './profile-auth-modal.css',
})
export class GlobalCanactiveModal {

  private statusService = inject(StatusService);
  isModalOpen = this.statusService.isModalOpen;
  isRegistered = this.statusService.isRegistered;

  private router = inject(Router);

  close() {
    this.statusService.closeModal();
  };

  navToLoginPage() {
    this.close();
    this.router.navigate(['/auth/login']);
  };

  navToRegisterPage(): void {
    this.close();
    this.router.navigate(['/auth/register']);
  };
}
