import { Component, Input, OnInit } from '@angular/core';
import { IAdaptationComponent } from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-progress-card-points',
  templateUrl: './progress-card-points.component.html',
  styleUrls: ['./progress-card-points.component.scss'],
})
export class ProgressCardPointsComponent implements OnInit {
  @Input() item: IAdaptationComponent;

  constructor() { }

  ngOnInit() {}

}
