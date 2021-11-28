import {Component, Inject, Input, OnInit} from '@angular/core';
import {IAdaptationComponent} from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-progress-card-checkbox',
  templateUrl: './progress-card-checkbox.component.html',
  styleUrls: ['./progress-card-checkbox.component.scss'],
})
export class ProgressCardCheckboxComponent implements OnInit {

  constructor(@Inject('item') public item: IAdaptationComponent) {
  }

  ngOnInit() {
  }

}
