import { inject, Injectable } from '@angular/core';
import { UserInfoService } from '../../../../../core/services/user-info/user-info-service';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthService {

  userInfoService = inject(UserInfoService);
  userInfo = this.userInfoService.userInfo;


  compareFields(email: any, password: any): boolean {

    return email === this.userInfo()?.email && 
    password === this.userInfo()?.password ? 
    true : false;
  }

}
