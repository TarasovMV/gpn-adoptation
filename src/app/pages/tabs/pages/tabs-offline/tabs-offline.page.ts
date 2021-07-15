import {Component, OnInit} from '@angular/core';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IAdaptationStage, IPageTab, IProgress, IRecommendation, PageTabType} from '../../tabs.model';
import {AppConfigService} from "../../../../core/services/platform/app-config.service";
import {ModalController, NavController, Platform} from "@ionic/angular";
import {BackButtonService} from "../../../../core/services/platform/back-button.service";
import { TabsOfflineRecommendationComponent } from './components/tabs-offline-recommendation/tabs-offline-recommendation.component';
import { ApiAdaptationService } from 'src/app/core/services/api/api-adaptation.service';

@Component({
    selector: 'app-tabs-offline',
    templateUrl: './tabs-offline.page.html',
    styleUrls: ['./tabs-offline.page.scss'],
})
export class TabsOfflinePage implements OnInit, IPageTab {
    public route: PageTabType = 'offline';
    public data: IProgress;
    public sections: IAdaptationStage[] = [];
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
        public navCtrl: NavController,
        public tabsService: TabsService,
        private backButtonService: BackButtonService,
        private platform: Platform,
        appConfig: AppConfigService,
        public modalController: ModalController,
        public apiAdaptationService: ApiAdaptationService
    ) {
        this.restUrl = appConfig.getAttribute("restUrl");
    }

    ngOnInit(): void {
        this.backButtonService.disableBackOnRoot(this.platform);
        this.getBusiness().then();
        this.getRecommendation().then();
    }

    public async getBusiness(): Promise<void> {
        try {
            const data = await this.tabsService.getBusinessProcesses();
            data.adaptationStages = (data as any).referenceSections;
            data.adaptationStages.forEach(x => x.adaptationSubStages = (x as any).referenceSubSections);
            data.adaptationStages
                .flatMap(x => x.adaptationSubStages)
                .forEach(x => x.adaptationComponents = (x as any).referenceComponents);
            this.data = data;
            this.sections = data.adaptationStages;
        }
        catch (error) {
            console.error(error);
        }
    }
    public async getRecommendation(): Promise<void> {
        try {
            const adaptationData = await this.apiAdaptationService.getAdaptation();
            const data = await this.tabsService.getRecommendation(adaptationData.id);
            this.recomendations = data;
        }
        catch (error) {
            console.error(error);
        }
    }

    async openStories(item: IRecommendation) {
        this.tabsService.currentStory$.next(item);
        const modal = await this.modalController.create({
            component: TabsOfflineRecommendationComponent,
        });
        return await modal.present();
    }

    public openCard(card: IAdaptationStage): void {
        this.navCtrl.navigateForward('tabs/tabs-offline/' + card.id).then();
        this.tabsService.businessStages$.next(card);
    }

    public filterSections(search: string): void {
        search = search.toLowerCase();
        this.sections = this.data.adaptationStages.filter(x => x.name?.toLowerCase().search(search) !== -1);
    }
}
