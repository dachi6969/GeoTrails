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
    updateOn: 'submit'
  });

  get loginInfo() {
    return this.form.getRawValue();
  }

  isCorrectInfo (): boolean {
    return this.loginAuthService
    .compareFields(
      this.loginInfo.email, 
      this.loginInfo.password
      );
  }

  onSubmit() {
    this.form.markAllAsTouched();
    
    if ( !this.form.valid ) return;

    const user = this.userInfo();
    console.log(user)

    if ( !user || !this.isCorrectInfo() ) {
      this.form.setErrors({ invalidLogin: true });
      return;
    };
 
    this.statusService.login();
    this.router.navigate(['profile', user.name]);
  }

}
