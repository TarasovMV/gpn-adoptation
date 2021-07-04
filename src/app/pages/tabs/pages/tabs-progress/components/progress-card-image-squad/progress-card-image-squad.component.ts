import { Component, Inject, Input, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/core/services/platform/app-config.service';
import { IAdaptationComponent } from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-progress-card-image-squad',
  templateUrl: './progress-card-image-squad.component.html',
  styleUrls: ['./progress-card-image-squad.component.scss'],
})
export class ProgressCardImageSquadComponent implements OnInit {
  // @Input() item: IAdaptationComponent;

  public readonly restUrl: string;
  constructor(
    @Inject('item') public item: IAdaptationComponent,
    appConfigService: AppConfigService,
  ) {
    this.restUrl = appConfigService.getAttribute('restUrl');
  }

  ngOnInit() {}

}
