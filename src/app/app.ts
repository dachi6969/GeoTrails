import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalCanactiveModal } from "./shared/components/auth-modal/profile-auth-modal";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalCanactiveModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GeoTrails');

}
