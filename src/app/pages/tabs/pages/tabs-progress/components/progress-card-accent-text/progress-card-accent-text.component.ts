import { Component, Inject, Input, OnInit } from '@angular/core';
import { IAdaptationComponent } from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-progress-card-accent-text',
  templateUrl: './progress-card-accent-text.component.html',
  styleUrls: ['./progress-card-accent-text.component.scss'],
})
export class ProgressCardAccentTextComponent implements OnInit {

  // @Input() item: IAdaptationComponent;

  constructor(
    @Inject('item') public item: IAdaptationComponent,
  ) { }

  ngOnInit() { }

}
