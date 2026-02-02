import { Injectable, signal } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  
  isLoggedIn = signal<boolean>(false);
  isModalOpen = signal<boolean>(false);

  constructor() {
    const status = JSON.parse(sessionStorage.getItem('userStatus') ?? 'false');
    this.isLoggedIn.set(status);
  }

  confirm (): boolean {
    this.isModalOpen.set(true);
    return false;
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

}
