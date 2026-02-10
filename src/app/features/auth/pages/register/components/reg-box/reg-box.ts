import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ValidationService } from '../../../../../../core/services/validators/validation-service';
import { AuthInput } from "../../../../../../shared/components/inputs/auth-input/auth-input";
import { RegisterService } from '../../services/register-service';
import { SucessfullyRegisterModal } from "./successfully-register-modal/successfully-register-modal";
import { UnsavedChangesModal } from "./unsaved-changes-modal/unsaved-changes-modal";
import { RouterLink } from "@angular/router";
import { UserInfoService, UserInfoType } from '../../../../../../core/services/user-info/user-info-service';

@Component({
  selector: 'reg-box',
  imports: [
    AuthInput,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    SucessfullyRegisterModal,
    UnsavedChangesModal,
    RouterLink
],
  templateUrl: './reg-box.html',
  styleUrl: './reg-box.css',
})
export class RegBox {
  
  private validationService = inject(ValidationService);
  
  registerService = inject(RegisterService);
  isRegistered = this.registerService.isInfoSaved;

  userInfoService = inject(UserInfoService);
  userInfo = this.userInfoService.userInfo;

    // *** forms section ***
  form = new FormGroup({
    name: new FormControl('', [
      this.validationService.required,
      this.validationService.usernameValidation
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl('', [
      this.validationService.required,
      this.validationService.emailValidation,
    ]),
    phone: new FormControl('', [
      this.validationService.required,
      this.validationService.numberValidation
    ]),
    password: new FormControl('', [
      this.validationService.required,
      this.validationService.passwordValidation,
    ]),
    confirm: new FormControl('', [
      this.validationService.required,
    ]),
  }, { updateOn: 'blur' });

    // succesful registration actions 
  finishRegister() {
    this.form.reset();
    this.isRegistered.set(false);
  }

  isPasswordMismatch() {
    const { password, confirm } = this.form.getRawValue();

    return confirm !== '' ? 
    confirm !== password : 
    false
  }

    // *** submit actions ***
  onSubmit() {
    this.form.markAllAsTouched();
    this.form.markAllAsDirty();

        // *** actions if pass and confirm match or not ***
      if ( this.form.valid && !this.isPasswordMismatch() ) {
        
        // *** user's new regist data ***
          const userNewInfo = this.form.getRawValue();

          const anyInfoMatcher = 
          this.registerService
          .hasAnyEqualValue(userNewInfo, this.userInfo()); // passing new data and existed one!

            // *** setting up new error in case of duplicate data ***
          if ( anyInfoMatcher.match ) {
            const control = this.form.get(`${anyInfoMatcher.key}`);

            control?.setErrors({
              infoMatched: {
                fieldName: anyInfoMatcher.key
              }
            })
          }
          
          this.registerService.saveInfo(userNewInfo as UserInfoType); 
        }
  };
}
