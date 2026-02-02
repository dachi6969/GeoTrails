import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RightArrow } from "../../../shared/icons/arrows/right-arrow/right-arrow";

@Component({
  selector: 'app-profile-sidebar',
  imports: [RightArrow],
  templateUrl: './profile-sidebar.html',
  styleUrl: './profile-sidebar.css',
})
export class ProfileSidebar {
  
  profileName = signal('');
  profileLastname = signal('');

  profileInfoUrl = computed(() => {
    return '/profile/' + this.profileName() + '/info';
  })
  profileSettingsUrl = computed(() => {
    return '/profile/' + this.profileName() + '/settings';
  });

  router = inject(Router);

  constructor( route: ActivatedRoute) {
    const name = route.snapshot.paramMap.get('slug');
    const userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '');

    this.profileLastname.set(userInfo?.lastname ?? '');
    this.profileName.set(userInfo?.name ?? '');

  }

  navToProfileInfo() {
    this.router.navigate([`/profile/${this.profileName()}/info`]);
  };
  
  navToProfileBookings() {
    this.router.navigate([`/profile/${this.profileName()}/bookings`]);
  };

  navToProfileSettings () {
    this.router.navigate([`/profile/${this.profileName()}/settings`]);
  };

}
