import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  
  userInfo = signal<any>('');

  constructor() {
    const uInfo = JSON.parse(localStorage.getItem('userInfo') ?? '');
    this.userInfo.set(uInfo);
  }

}
