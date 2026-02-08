import { Component, computed, inject, signal } from '@angular/core';
import { UiButton } from "../../../../shared/components/buttons/ui-button/ui-button";
import { RouterLink } from "@angular/router";
import { UserInfoService, UserInfoType } from '../../../../core/services/user-info/user-info-service';
import { AuthInput } from "../../../../shared/components/inputs/auth-input/auth-input";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../../../../core/services/validators/validation-service';

@Component({
  selector: 'app-profile-info-page',
  imports: [UiButton, RouterLink, AuthInput, ReactiveFormsModule],
  templateUrl: './profile-info-page.html',
  styleUrl: './profile-info-page.css',
})
export class ProfileInfoPage {

  userInfoService = inject(UserInfoService);
  userInfo = this.userInfoService.userInfo;

  isInfoEditable = signal<boolean>(true);

  email = computed(() => this.userInfo()?.email);
  phone = computed(() => this.userInfo()?.phone );
  password = computed(() => this.userInfo()?.password );

  validationService = inject(ValidationService);

  form = new FormGroup({
    email: new FormControl({
      value: this.email(),
      disabled: true,
    },[
      this.validationService.required,
      this.validationService.emailValidation
    ]),
    phone: new FormControl({
      value: this.phone(),
      disabled: true,
    },[
      this.validationService.required,
      this.validationService.numberValidation
    ]),
    password: new FormControl({
      value: this.password(),
      disabled: true,
    },[
      this.validationService.required,
      this.validationService.passwordValidation
    ])
  }, {
    updateOn: 'blur'
  })

  sameInfoCompare(): boolean {
   const { email, phone, password } = this.form.getRawValue();

    return  (
      this.email() === email &&
      this.phone() === phone &&
      this.password() === password
    )
  }

  toggleInfoButton(buttonName: string) {
    this.form.markAllAsTouched();
    
    if ( !this.form.valid && buttonName === 'Save changes') return;

    this.isInfoEditable.update(prev => !prev);

    if ( buttonName === 'Edit Profile' ) {
      this.form.enable();
    }else if ( buttonName === 'Save changes' ){
      this.form.disable();
    }

    if ( this.sameInfoCompare() ) return; // return in case if data is immutable;
    
    const updatedData = 
    { 
      ...this.userInfo(), 
      ...this.form.getRawValue()
    } as UserInfoType;

    localStorage.setItem('userInfo', JSON.stringify(updatedData));
    this.userInfoService.userInfo.set(updatedData); // update service to sync UI and logic

  };

}
