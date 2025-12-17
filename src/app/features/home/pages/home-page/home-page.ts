import { Component } from '@angular/core';
import { DownArrow } from "../../../../shared/icons/arrows/down-arrow/down-arrow";
import { LeftArrow } from "../../../../shared/icons/arrows/left-arrow/left-arrow";
import { RightArrow } from "../../../../shared/icons/arrows/right-arrow/right-arrow";
import { UpArrow } from "../../../../shared/icons/arrows/up-arrow/up-arrow";


@Component({
  selector: 'app-home-page',
  imports: [DownArrow, LeftArrow, RightArrow, UpArrow],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
