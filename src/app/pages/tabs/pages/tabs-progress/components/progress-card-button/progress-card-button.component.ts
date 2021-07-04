import { Component, Inject, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { IAdaptationComponent } from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-progress-card-button',
  templateUrl: './progress-card-button.component.html',
  styleUrls: ['./progress-card-button.component.scss'],
})
export class ProgressCardButtonComponent implements OnInit {
  // @Input() item: IAdaptationComponent;

  constructor(
    @Inject('item') public item: IAdaptationComponent,
  ) { }

  ngOnInit() {}

  public clickButton(item: IAdaptationComponent): void {
    console.log(item.body);
    Browser.open({url: item.body});
}

}
