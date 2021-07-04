import { Component, Input, OnInit } from '@angular/core';
import { IAdaptationComponent } from 'src/app/pages/tabs/tabs.model';
import { Browser } from "@capacitor/browser";
import { AppConfigService } from 'src/app/core/services/platform/app-config.service';

@Component({
  selector: 'app-progress-card-file',
  templateUrl: './progress-card-file.component.html',
  styleUrls: ['./progress-card-file.component.scss'],
})
export class ProgressCardFileComponent implements OnInit {
  @Input() item: IAdaptationComponent;
  public readonly restUrl: string;

  constructor(
    appConfigService: AppConfigService,
  ) {
    this.restUrl = appConfigService.getAttribute('restUrl');
  }

  ngOnInit() {}

  public openFile(path: string): void {
    Browser.open({url: `${this.restUrl}/${path}`});
}
}
