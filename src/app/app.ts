import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalCanactiveModal } from "./shared/components/global-canactive-modal/global-canactive-modal";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalCanactiveModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GeoTrails');

}
