import { Component, Inject, Input, OnInit } from '@angular/core';
import { IAdaptationComponent } from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-progress-card-more',
  templateUrl: './progress-card-more.component.html',
  styleUrls: ['./progress-card-more.component.scss'],
})
export class ProgressCardMoreComponent implements OnInit {

  // @Input() item: IAdaptationComponent;

  constructor(@Inject('item') public item: IAdaptationComponent) {
  }

  ngOnInit() {}

  public openMore(item: IAdaptationComponent): void {
    item.isActive = !item.isActive;
}
}
