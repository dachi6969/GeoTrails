import { Component, inject, signal, ViewChild } from '@angular/core';
import { ContentBox } from "../../components/content-box/content-box";
import { BreakpointObserver } from '@angular/cdk/layout';
import { ValidationService } from '../../../../core/services/validators/validation-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RegBox } from "../../components/reg-box/reg-box";
import { SucessfullyRegisterModal } from "../../components/reg-box/successfully-register-modal/successfully-register-modal";


export interface CanLeave {
  canLeave(): boolean | Promise<boolean>;
}


@Component({
  selector: 'app-register-page',
  imports: [ContentBox, RegBox],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {

  isDesktop = signal<boolean>(false);

  validationService = inject(ValidationService);

  @ViewChild(RegBox) formComponent!: RegBox;

  canLeave() {
    return !this.formComponent.form.dirty
  }

  constructor() {
    inject(BreakpointObserver)
      .observe(['(min-width: 1023px)'])
      .pipe(takeUntilDestroyed())
      .subscribe(result => this.isDesktop.set(result.matches));
  }

}
