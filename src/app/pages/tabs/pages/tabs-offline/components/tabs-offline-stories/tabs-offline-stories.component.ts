import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ApiAdaptationService } from 'src/app/core/services/api/api-adaptation.service';
import { AppConfigService } from 'src/app/core/services/platform/app-config.service';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IRecommendation } from 'src/app/pages/tabs/tabs.model';
import { TabsOfflineRecommendationComponent } from '../tabs-offline-recommendation/tabs-offline-recommendation.component';

@Component({
  selector: 'app-tabs-offline-stories',
  templateUrl: './tabs-offline-stories.component.html',
  styleUrls: ['./tabs-offline-stories.component.scss'],
})
export class TabsOfflineStoriesComponent implements OnInit {
  public recomendations: IRecommendation[] = [
    {
        id: 1,
        header: 'Основные правила онлайн коммуникаций',
        body: '',
        order: 1,
        imagePath: 'https://www.planetware.com/wpimages/2019/10/switzerland-in-pictures-most-beautiful-places-matterhorn.jpg',
        history: [
            {
                id: 1,
                header: 'Деловое общение',
                body: `Я поздравляю вас с началом работы в Компании «Газпром нефть»! 
                Наша компания является одним из признанных лидеров российской нефтяной
                отрасли и своими успехами во многом обязана людям, которые у нас работают.
                За всеми процессами, будь то добыча 
                `,
                order: 1,
                imagePath: 'https://blog.ipleaders.in/wp-content/uploads/2018/02/BV-Acharya-17.jpg',
            },
            {
                id: 1,
                header: 'Деловое общение',
                body: `Я поздравляю вас с началом работы в Компании «Газпром нефть»! 
                Наша компания является одним из признанных лидеров российской нефтяной
                отрасли и своими успехами во многом обязана людям, которые у нас работают.
                За всеми процессами, будь то добыча 
                `,
                order: 2,
                imagePath: 'https://assets.entrepreneur.com/content/3x2/2000/20200429211042-GettyImages-1164615296.jpeg',
            }
        ]
    },
    {
        id: 1,
        header: 'Основные правила онлайн коммуникаций',
        body: '',
        order: 1,
        imagePath: 'https://www.planetware.com/wpimages/2019/10/switzerland-in-pictures-most-beautiful-places-matterhorn.jpg',
        history: [
            {
                id: 1,
                header: 'Деловое общение',
                body: `Я поздравляю вас с началом работы в Компании «Газпром нефть»! 
                Наша компания является одним из признанных лидеров российской нефтяной
                отрасли и своими успехами во многом обязана людям, которые у нас работают.
                За всеми процессами, будь то добыча 
                `,
                order: 1,
                imagePath: 'https://blog.ipleaders.in/wp-content/uploads/2018/02/BV-Acharya-17.jpg',
            },
            {
                id: 1,
                header: 'Деловое общение',
                body: `Я поздравляю вас с началом работы в Компании «Газпром нефть»! 
                Наша компания является одним из признанных лидеров российской нефтяной
                отрасли и своими успехами во многом обязана людям, которые у нас работают.
                За всеми процессами, будь то добыча 
                `,
                order: 2,
                imagePath: 'https://assets.entrepreneur.com/content/3x2/2000/20200429211042-GettyImages-1164615296.jpeg',
            }
        ]
    },
    {
        id: 1,
        header: 'Основные правила онлайн коммуникаций',
        body: '',
        order: 1,
        imagePath: 'https://www.planetware.com/wpimages/2019/10/switzerland-in-pictures-most-beautiful-places-matterhorn.jpg',
        history: [
            {
                id: 1,
                header: 'Деловое общение',
                body: `Я поздравляю вас с началом работы в Компании «Газпром нефть»! 
                Наша компания является одним из признанных лидеров российской нефтяной
                отрасли и своими успехами во многом обязана людям, которые у нас работают.
                За всеми процессами, будь то добыча 
                `,
                order: 1,
                imagePath: 'https://blog.ipleaders.in/wp-content/uploads/2018/02/BV-Acharya-17.jpg',
            },
            {
                id: 1,
                header: 'Деловое общение',
                body: `Я поздравляю вас с началом работы в Компании «Газпром нефть»! 
                Наша компания является одним из признанных лидеров российской нефтяной
                отрасли и своими успехами во многом обязана людям, которые у нас работают.
                За всеми процессами, будь то добыча 
                `,
                order: 2,
                imagePath: 'https://assets.entrepreneur.com/content/3x2/2000/20200429211042-GettyImages-1164615296.jpeg',
            }
        ]
    }
];
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
      this.recomendations = data;
    }
    catch (error) {
      console.error(error);
    }
  }

  async openStories(item: IRecommendation) {
    this.getRecommendation();
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
