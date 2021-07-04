import { Component, Input, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/core/services/platform/app-config.service';
import { IAdaptationComponent } from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-progress-card-image',
  templateUrl: './progress-card-image.component.html',
  styleUrls: ['./progress-card-image.component.scss'],
})
export class ProgressCardImageComponent implements OnInit {

  @Input() item: IAdaptationComponent;
  public readonly restUrl: string;

  constructor(
    appConfigService: AppConfigService,
  ) {
    this.restUrl = appConfigService.getAttribute('restUrl');
  }

  ngOnInit() {}

}
