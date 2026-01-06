import { Injectable, signal } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  private isUserInfoSaved = signal(false);
  isUnsavedModalOpen = signal<boolean>(false);

  resolver = new Subject<boolean>();

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

  get userInfo () {
    const uInfo = localStorage.getItem('userInfo');

    return uInfo ? JSON.parse(uInfo) : null;
  }

    // compare existed user data and new registration data 
  hasAnyEqualValue(obj1: any, obj2: any) {

    if (obj1 === null || obj2 === null ) return { match: false, key: null }; 

    const skipKeys = ['name', 'lastname', 'password'];
  
    for (const key of Object.keys(obj1)) {
      if (skipKeys.includes(key)) continue;
  
      const v1 = String(obj1[key] ?? '').trim().toLowerCase();
      const v2 = String(obj2[key] ?? '').trim().toLowerCase();
  
      if (v1 && v1 === v2) {
        return { match: true, key };
      }
    }
  
    return { match: false, key: null };
  }
  
  
  
  saveInfo() {
    this.isUserInfoSaved.set(true);
  };

}
