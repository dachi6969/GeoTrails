import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Header } from "./public-header/public-header";
import { PublicFooter } from "./public-footer/public-footer";

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, Header, PublicFooter],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {

}
