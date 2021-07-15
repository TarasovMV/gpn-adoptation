import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { AppConfigService } from 'src/app/core/services/platform/app-config.service';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IRecommendation } from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-tabs-offline-recommendation',
  templateUrl: './tabs-offline-recommendation.component.html',
  styleUrls: ['./tabs-offline-recommendation.component.scss'],
})
export class TabsOfflineRecommendationComponent implements OnInit {

  @ViewChild('bar') bar: ElementRef;
  @Input() story: IRecommendation;
  public index = 0;
  public counter = 0;

  public readonly restUrl: string;

  constructor(
    public tabsService: TabsService,
    public modalController: ModalController,
    appConfig: AppConfigService
  ) {
    this.restUrl = appConfig.getAttribute("restUrl");
  }
  ngOnInit() {
    this.progressBar();
  }

  public dismiss() {
    this.modalController.dismiss();
  }

  public nextStory(): void {
    this.progressBar();
    if (this.index < this.story.history.length - 1) {
      this.index++;
    } else {
      this.dismiss();
    }
  }

  public previousStory(): void {
    this.progressBar();
    if (this.index > 0) {
      this.index--;
    }
  }

  public progressBar(): void {
    let width = 10;
    const id = setInterval(() => {
      if (width >= 100) {
        this.nextStory();
        clearInterval(id);
      } else {
        width++;
        this.bar.nativeElement.style.width = width + '%';
      }
    }, 150);
  }
}
