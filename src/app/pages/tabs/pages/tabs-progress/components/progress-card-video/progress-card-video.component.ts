import { Component, Inject, Input, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/core/services/platform/app-config.service';
import { IAdaptationComponent } from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-progress-card-video',
  templateUrl: './progress-card-video.component.html',
  styleUrls: ['./progress-card-video.component.scss'],
})
export class ProgressCardVideoComponent implements OnInit {

  // @Input() item: IAdaptationComponent;
  public readonly restUrl: string;

  constructor(
    appConfigService: AppConfigService,
    @Inject('item') public item: IAdaptationComponent,
  ) {
    this.restUrl = appConfigService.getAttribute('restUrl');
  }

  ngOnInit() {}

}
