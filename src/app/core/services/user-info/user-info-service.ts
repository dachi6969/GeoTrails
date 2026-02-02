import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  
  userInfo = signal<any>('');

  constructor() {
    const uInfo = localStorage.getItem('userInfo');
    if (uInfo) {
      this.userInfo.set(JSON.parse(uInfo));
    }
  }

}
