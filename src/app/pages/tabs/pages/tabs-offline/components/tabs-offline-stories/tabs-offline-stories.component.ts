import {Component, OnInit} from '@angular/core';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {ApiAdaptationService} from 'src/app/core/services/api/api-adaptation.service';
import {AppConfigService} from 'src/app/core/services/platform/app-config.service';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IRecommendation} from 'src/app/pages/tabs/tabs.model';
import {TabsOfflineRecommendationComponent} from '../tabs-offline-recommendation/tabs-offline-recommendation.component';

@Component({
    selector: 'app-tabs-offline-stories',
    templateUrl: './tabs-offline-stories.component.html',
    styleUrls: ['./tabs-offline-stories.component.scss'],
})
export class TabsOfflineStoriesComponent implements OnInit {
    public recommendations: IRecommendation[] = [];
    public readonly restUrl: string;

    constructor(
        public tabsService: TabsService,
        appConfig: AppConfigService,
        public modalController: ModalController,
        public apiAdaptationService: ApiAdaptationService,
        private routerOutlet: IonRouterOutlet
    ) {
        this.restUrl = appConfig.getAttribute("restUrl");
    }

    ngOnInit() {
        this.getRecommendation().then();
    }

    public async getRecommendation(): Promise<void> {
        try {
            const adaptationData = await this.apiAdaptationService.getAdaptation();
            const data = await this.tabsService.getRecommendation(adaptationData.id);
            data.forEach(x => x.history = x.history.sort((a, b) => a.order - b.order));
            this.recommendations = data;
        } catch (error) {
            console.error(error);
        }
    }

    async openStories(item: IRecommendation) {
        this.tabsService.currentStory$.next(item);
        const modal = await this.modalController.create({
            component: TabsOfflineRecommendationComponent,
            swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl,
            componentProps: {
                story: item
            }
        });
        return await modal.present();
    }

}
