import { Component, Input, OnInit } from '@angular/core';
import { IMasterMind } from '../../tabs-about.page';

@Component({
  selector: 'app-tabs-about-leadership-card',
  templateUrl: './tabs-about-leadership-card.component.html',
  styleUrls: ['./tabs-about-leadership-card.component.scss'],
})
export class TabsAboutLeadershipCardComponent implements OnInit {

  @Input() element: IMasterMind;

  constructor() { }

  ngOnInit() {}

}
