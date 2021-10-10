import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  slides = [
    {
      text: "Slide 1",
      background: "/assets/textile-background.png"
    },
    {
      text: "Slide 2",
      background: "/assets/textile-background.png"
    },
    {
      text: "Slide 3",
      background: "/assets/textile-background.png"
    }
  ];

  constructor() { }

  ngOnInit() { }

}
