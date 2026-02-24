import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  
  isLoggedIn = signal<boolean>(false);
  isRegistered = signal<boolean>(false);
  isModalOpen = signal<boolean>(false);

  constructor() {
    const status = JSON.parse(sessionStorage.getItem('userStatus') ?? 'false');
    const isUserRegistered = localStorage.getItem('userInfo') ? true : false;

    this.isLoggedIn.set(status);
    this.isRegistered.set(isUserRegistered);
  }

  login() {
    this.isLoggedIn.set(true);
    sessionStorage.setItem('userStatus', 'true');
  }

  confirm (): boolean {
    this.isModalOpen.set(true);
    return false;
  }

  register(): void {
    this.isRegistered.set(true);
  }

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

}
