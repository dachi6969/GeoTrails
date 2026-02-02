import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthInput } from "../../../../../../shared/components/inputs/auth-input/auth-input";
import { ValidationService } from '../../../../../../core/services/validators/validation-service';
import { LoginAuthService } from '../../services/login-auth-service';
import { StatusService } from '../../../../../../core/services/user-status/status-service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../../../../core/services/user-info/user-info-service';

@Component({
  selector: 'login-box',
  imports: [ReactiveFormsModule, AuthInput],
  templateUrl: './login-box.html',
  styleUrl: './login-box.css',
})
export class LoginBox {

  validationService = inject(ValidationService);
  loginAuthService = inject(LoginAuthService);
  statusService = inject(StatusService);
  router = inject(Router);
  
  userInfoService = inject(UserInfoService);
  userInfo = this.userInfoService.userInfo;

  form = new FormGroup({
    email: new FormControl('', [
      this.validationService.required,
      this.validationService.emailValidation
    ]),
    password: new FormControl('', [
      this.validationService.required,
      this.validationService.passwordValidation
    ])
  },{
    updateOn: 'blur'
  });

  get loginInfo() {
    return {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    }
  }


  onSubmit() {

    this.form.markAllAsTouched();
    this.form.markAllAsDirty();

    if (this.userInfo() && this.form.valid) {
      const isCorrectInfo = 
      this.loginAuthService.compareFields(this.loginInfo, this.userInfo())

      if (isCorrectInfo) {
        console.log('emtxveva')
        this.statusService.isLoggedIn.set(true);
        sessionStorage.setItem('userStatus', 'true');
        this.router.navigate(['profile', `${this.userInfo().name}`])
      }else{
        this.form.get('email')?.setErrors({
          invalidLogin: true
        })
        this.form.get('password')?.setErrors({
          invalidLogin: true
        })
        // console.log('ar emtxveva')
        // console.log( this.form.get('email') )
      }
    }

  }

}
