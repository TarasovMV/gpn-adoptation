import { Component, Input, OnInit } from '@angular/core';
import { IAdaptationComponent } from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-progress-card-attention',
  templateUrl: './progress-card-attention.component.html',
  styleUrls: ['./progress-card-attention.component.scss'],
})
export class ProgressCardAttentionComponent implements OnInit {
  @Input() item: IAdaptationComponent;

  constructor() { }

  ngOnInit() {}

}
