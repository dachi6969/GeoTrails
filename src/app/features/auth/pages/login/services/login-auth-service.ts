import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthService {


  compareFields(obj1: any, obj2: any): boolean {

    if (
      ( obj1.email === obj2.email ) &&
      ( obj1.password === obj2.password )
    ){
      return true
    }

    return false;
  }

}
