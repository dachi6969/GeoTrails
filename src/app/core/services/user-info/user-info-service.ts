import { Injectable, signal } from '@angular/core';
import { UserInfoType } from '../../models/user-info.model';

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
