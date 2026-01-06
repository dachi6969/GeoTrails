import { Component } from '@angular/core';

@Component({
  selector: 'app-whyus-section',
  imports: [],
  templateUrl: './whyus-section.html',
  styleUrl: './whyus-section.css',
})
export class WhyusSection {
  friendlyCards = [
    {
      title: 'Local Guides',
      body: 'Explore Georgia with experienced local guides who know the culture, history, and hidden places beyond tourist routes.'
    },
    {
      title: 'Handpicked Tours',
      body: 'Every tour is carefully selected to offer authentic experiences, balanced itineraries, and unforgettable moments.'
    },
    {
      title: 'Small Groups',
      body: 'Travel in small groups to enjoy a more personal, flexible, and comfortable journey at your own pace.'
    },
    {
      title: 'Full Support',
      body: 'Our team is always ready to help you before, during, and after your trip to ensure a smooth experience.'
    },
  ]
}
