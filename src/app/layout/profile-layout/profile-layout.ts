import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { ProfileSidebar } from "./profile-sidebar/profile-sidebar";

@Component({
  selector: 'app-profile-layout',
  imports: [RouterOutlet, ProfileSidebar],
  templateUrl: './profile-layout.html',
  styleUrl: './profile-layout.css',
})
export class ProfileLayout {

}
