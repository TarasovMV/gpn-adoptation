import {Component, OnInit} from '@angular/core';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IAdaptationStage, IPageTab, IProgress, PageTabType, ReferenceBookSectionType} from '../../tabs.model';
import {AppConfigService} from "../../../../core/services/platform/app-config.service";
import {NavController, Platform} from "@ionic/angular";
import {BackButtonService} from "../../../../core/services/platform/back-button.service";

@Component({
    selector: 'app-tabs-offline',
    templateUrl: './tabs-offline.page.html',
    styleUrls: ['./tabs-offline.page.scss'],
})
export class TabsOfflinePage implements OnInit, IPageTab {
    public route: PageTabType = 'offline';
    public data: IProgress;
    public sections: IAdaptationStage[] = [];
    public readonly restUrl: string;

    constructor(
        public tabsService: TabsService,
        private navCtrl: NavController,
        private backButtonService: BackButtonService,
        private platform: Platform,
        appConfig: AppConfigService,
    ) {
        this.restUrl = appConfig.getAttribute("restUrl");
    }

    ngOnInit(): void {
        this.backButtonService.disableBackOnRoot(this.platform);
        this.getBusiness().then();
    }

    public async getBusiness(): Promise<void> {
        try {
            const data = await this.tabsService.getBusinessProcesses();
            data.adaptationStages = (data as any).referenceSections;
            data.adaptationStages.forEach(x => x.adaptationSubStages = (x as any).referenceSubSections);
            data.adaptationStages
                .flatMap(x => x.adaptationSubStages)
                .forEach(x => x.adaptationComponents = (x as any).referenceComponents);
            data.adaptationStages.forEach(x => {
                if (x.referenceBookSectionType === ReferenceBookSectionType.Dictionary) {
                    x.adaptationSubStages.forEach(s => {
                        s.adaptationComponents = [
                            {
                                id: 1,
                                order: 1,
                                componentType: 3,
                                body: s.name
                            },
                            {
                                id: 2,
                                order: 2,
                                componentType: 2,
                                body: `<left><indent>${s.description}`,
                            }
                        ]
                    })
                }
            })
            this.data = data;
            this.sections = data.adaptationStages;
        }
        catch (error) {
            console.error(error);
        }
    }

    public openCard(card: IAdaptationStage): void {
        this.navCtrl.navigateForward('tabs/tabs-offline/' + card.id).then();
        this.tabsService.businessStages$.next(card);
    }
}
