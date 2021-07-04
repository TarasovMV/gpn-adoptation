import { Component, Input, OnInit } from '@angular/core';
import { IAdaptationComponent } from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-progress-card-block',
  templateUrl: './progress-card-block.component.html',
  styleUrls: ['./progress-card-block.component.scss'],
})
export class ProgressCardBlockComponent implements OnInit {
  @Input() item: IAdaptationComponent;

  constructor() { }

  ngOnInit() {}

}
