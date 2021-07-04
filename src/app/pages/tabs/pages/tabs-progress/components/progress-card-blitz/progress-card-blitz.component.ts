import { Component, Inject, Input, OnInit } from '@angular/core';
import { IAdaptationComponent } from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-progress-card-blitz',
  templateUrl: './progress-card-blitz.component.html',
  styleUrls: ['./progress-card-blitz.component.scss'],
})
export class ProgressCardBlitzComponent implements OnInit {
  // @Input() item: IAdaptationComponent;
  public rates: { [key: number]: {id: number; isActive: boolean}[] } = {};

  constructor(
    @Inject('item') public item: IAdaptationComponent,
  ) { }

  ngOnInit() {}

  public rateIt(rate: {id: number; isActive: boolean}, id: number): void {
    this.rates[id].forEach(x => x.isActive = false);
    this.rates[id].forEach(value => {
        if (value.id <= rate.id) {
            value.isActive = true;
        }
    });
}
}
