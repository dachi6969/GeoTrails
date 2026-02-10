import { Injectable, signal } from '@angular/core';

export interface UserInfoType {  // warning! move it into separate folder/file !!
  name: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  
  userInfo = signal<UserInfoType | null>(null);

  constructor() {
    const uInfo = localStorage.getItem('userInfo');
    if (uInfo) {
      this.userInfo.set(JSON.parse(uInfo));
    }
  }

}
