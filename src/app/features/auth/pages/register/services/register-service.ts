import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { UserInfoType } from '../../../../../core/models/user-info.model';
import { UserInfoService } from '../../../../../core/services/user-info/user-info-service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  private isUserInfoSaved = signal(false);
  isUnsavedModalOpen = signal<boolean>(false);

  resolver = new Subject<boolean>();

  private userInfoService = inject(UserInfoService);
  readonly userInfo = this.userInfoService.userInfo;

  async confirm(){
    this.openUnsavedModal();

    const p = firstValueFrom(this.resolver);
    const result = await p;

    return result;
  }

  stay() {
    this.resolver.next(false);
    this.resolver = new Subject<boolean>();
  }
  leave() {
    this.resolver.next(true);
    this.resolver = new Subject<boolean>();
  }

  openUnsavedModal() {
    this.isUnsavedModalOpen.set(true);
  }
  closeUnsavedModal() {
    this.isUnsavedModalOpen.set(false);
  }

  get isInfoSaved () {
    return this.isUserInfoSaved;
  }

    // compare existed user data and new registration data 
  hasAnyEqualValue(obj1: UserInfoType) {

    const userInf = this.userInfo();

    if (obj1 === null || userInf === null ) return { match: false, key: null }; 

    const skipKeys = ['name', 'lastname', 'password', 'confirm']; // skipping check process in case of those inputs
  
    for (const key of Object.keys(obj1) as (keyof UserInfoType)[]) {
      if (skipKeys.includes(key)) continue; 
  
      const v1 = String(obj1[key] ?? '').trim().toLowerCase();
      const v2 = String(userInf[key] ?? '').trim().toLowerCase();
  
      if (v1 && v1 === v2) {
        return { match: true, key };
      }
    }
  
    return { match: false, key: null };
  }
  
  
  saveInfo(registrationInfo: UserInfoType) {
    this.isUserInfoSaved.set(true);
    this.userInfoService.userInfo.set(registrationInfo);
    
    localStorage
    .setItem('userInfo', JSON.stringify(registrationInfo));
  };

}
