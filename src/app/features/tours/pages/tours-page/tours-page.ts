import { Component } from '@angular/core';
import { HeroSection } from "../../components/hero-section/hero-section";
import { FiltersSection } from "../../components/filters-section/filters-section";
import { CardsSection } from "../../components/cards-section/cards-section";

@Component({
  selector: 'app-tours-page',
  imports: [HeroSection, FiltersSection, CardsSection],
  templateUrl: './tours-page.html',
  styleUrl: './tours-page.css',
})
export class ToursPage {

}
