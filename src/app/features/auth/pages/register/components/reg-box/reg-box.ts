import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ValidationService } from '../../../../../../core/services/validators/validation-service';
import { AuthInput } from "../../../../../../shared/components/inputs/auth-input/auth-input";
import { RegisterService } from '../../services/register-service';
import { SucessfullyRegisterModal } from "./successfully-register-modal/successfully-register-modal";
import { UnsavedChangesModal } from "./unsaved-changes-modal/unsaved-changes-modal";
import { RouterLink } from "@angular/router";

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
  }, {
    updateOn: 'blur'
  });

    // succesful registration actions 
  finishRegister() {
    this.form.reset();
    this.isRegistered.set(false);
  }

  isMatched() {
    const password = this.form.controls.password.value;
    const confirm = this.form.controls.confirm.value;

    return confirm !== '' ? 
    confirm !== password : 
    false
  }

    // *** submit actions ***
  onSubmit() {
    
    this.form.markAllAsTouched();
    this.form.markAllAsDirty();

        // *** actions if pass and confirm match or not ***
      if ( this.form.valid && !this.isMatched() ) {
        
        // *** user's new regist data ***
          const userNewInfo = {
            name: this.form.controls.name.value,
            lastname: this.form.controls.lastname.value,
            email: this.form.controls.email.value,
            phone: this.form.controls.phone.value,
            password: this.form.controls.password.value,
          }

          const anyInfoMatcher = 
          this.registerService
          .hasAnyEqualValue(
            userNewInfo, 
            this.registerService.userInfo
          ) 
            // *** setting up new error in case of duplicate data ***
          if ( anyInfoMatcher.match ) {
            const control = this.form.get(`${anyInfoMatcher.key}`);

            control?.setErrors({
              infoMatched: {
                fieldName: anyInfoMatcher.key
              }
            })
          }else{
              localStorage.setItem(
              'userInfo', 
              JSON.stringify(userNewInfo)
              );
              this.registerService.saveInfo();
            }
          }
  };
}
