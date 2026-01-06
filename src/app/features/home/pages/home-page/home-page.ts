import { Component } from '@angular/core';
import { HeroSection } from "../../components/sections/hero-section/hero-section";
import { WhyusSection } from "../../components/sections/whyus-section/whyus-section";
import { ExpandSection } from "../../components/sections/expand-section/expand-section";
import { BookingSection } from "../../components/sections/booking-section/booking-section";


@Component({
  selector: 'app-home-page',
  imports: [HeroSection, WhyusSection, ExpandSection, BookingSection],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {


}
