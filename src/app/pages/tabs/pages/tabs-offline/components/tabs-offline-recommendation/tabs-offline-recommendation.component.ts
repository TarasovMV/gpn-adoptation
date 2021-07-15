import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IRecommendation } from 'src/app/pages/tabs/tabs.model';

@Component({
  selector: 'app-tabs-offline-recommendation',
  templateUrl: './tabs-offline-recommendation.component.html',
  styleUrls: ['./tabs-offline-recommendation.component.scss'],
})
export class TabsOfflineRecommendationComponent implements OnInit {

  @ViewChild('slider') slides: IonSlides;

  constructor(
    public tabsService: TabsService,
    public modalController: ModalController
  ) { }
  ngOnInit() {}

  slidesDidLoad() {
    this.slides.startAutoplay();
  }
  public dismiss() {
    this.modalController.dismiss();
  }
}
