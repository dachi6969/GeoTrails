import { Component, signal } from '@angular/core';
import { UiButton } from "../../../../shared/components/buttons/ui-button/ui-button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profile-info-page',
  imports: [UiButton, RouterLink],
  templateUrl: './profile-info-page.html',
  styleUrl: './profile-info-page.css',
})
export class ProfileInfoPage {

  userInfo!: any;

  isInfoDisabled = signal<boolean>(true);

  emailInputVal = signal( this.userInfo.email );
  phoneInputVal = signal( this.userInfo.phone );
  passwordInputVal = signal( this.userInfo.password );


  constructor() {
    const uInfo = localStorage.getItem('userInfo');
    if (uInfo) {
      this.userInfo = JSON.parse(uInfo);
    }
  }

  toggleInfoButton() {
    this.isInfoDisabled.update(prev => !prev);

    if ( 
      this.userInfo.email === this.emailInputVal() &&
      this.userInfo.phone === this.phoneInputVal() &&
      this.userInfo.password === this.passwordInputVal()
      ) return;


    const newData = 
    { 
      ...this.userInfo, 
      email: this.emailInputVal(),
      phone: this.phoneInputVal(),
      password: this.passwordInputVal()
    };


    localStorage.setItem('userInfo', JSON.stringify(newData));

  };

}
