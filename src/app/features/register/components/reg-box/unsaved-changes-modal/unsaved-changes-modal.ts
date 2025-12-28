import { Component, inject } from '@angular/core';
import { UiButton } from "../../../../../shared/components/buttons/ui-button/ui-button";
import { RegisterService } from '../../../services/register-service';

@Component({
  selector: 'unsaved-changes-modal',
  imports: [UiButton],
  templateUrl: './unsaved-changes-modal.html',
  styleUrl: './unsaved-changes-modal.css',
})
export class UnsavedChangesModal {

  registerService = inject(RegisterService);

  stayOnPage() {
    this.registerService.closeUnsavedModal()
    this.registerService.stay();
  }
  leavePage() {
    this.registerService.closeUnsavedModal()
    this.registerService.leave();
  }
}
