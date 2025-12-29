import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthInput } from "../../../../shared/components/inputs/auth-input/auth-input";
import { ValidationService } from '../../../../core/services/validators/validation-service';
import { LoginAuthService } from '../../services/login-auth-service';

@Component({
  selector: 'login-box',
  imports: [ReactiveFormsModule, AuthInput],
  templateUrl: './login-box.html',
  styleUrl: './login-box.css',
})
export class LoginBox {

  userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '');

  validationService = inject(ValidationService);
  loginAuthService = inject(LoginAuthService);

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

    if (this.userInfo && this.form.valid) {
      const isCorrectInfo = 
      this.loginAuthService.compareFields(this.loginInfo, this.userInfo)

      if (isCorrectInfo) {
        console.log('emtxveva')
      }else{
        this.form.get('email')?.setErrors({
          invalidLogin: true
        })
        this.form.get('password')?.setErrors({
          invalidLogin: true
        })
        console.log('ar emtxveva')
        console.log( this.form.get('email') )
      }
    }

  }

}
