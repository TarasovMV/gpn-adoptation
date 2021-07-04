import { Component, Inject, Input, OnInit } from '@angular/core';
import { IAdaptationComponent } from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-progress-card-manual-input',
  templateUrl: './progress-card-manual-input.component.html',
  styleUrls: ['./progress-card-manual-input.component.scss'],
})
export class ProgressCardManualInputComponent implements OnInit {

  // @Input() item: IAdaptationComponent;
  public text: { [key: number]: string } = {};

  constructor(@Inject('item') public item: IAdaptationComponent) {
  }

  ngOnInit() { }

  public sendIt(id: number): void {
    this.text[id] = '';
  }

}
