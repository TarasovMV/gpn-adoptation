import {Component, OnDestroy, OnInit} from '@angular/core';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IAdaptationStage, IPageTab, IProgress, PageTabType, ReferenceBookSectionType} from '../../tabs.model';
import {AppConfigService} from "../../../../core/services/platform/app-config.service";
import {NavController} from "@ionic/angular";
import {ApiAdaptationService} from "../../../../core/services/api/api-adaptation.service";
import {MyThemeService} from "../../../../core/services/platform/my-theme-service.service";
import {forkJoin} from "rxjs";
import {FileDownloaderService} from "../../../../core/services/file-downloader.service";

@Component({
    selector: 'app-tabs-offline',
    templateUrl: './tabs-offline.page.html',
    styleUrls: ['./tabs-offline.page.scss'],
})
export class TabsOfflinePage implements OnInit, OnDestroy, IPageTab {
    public route: PageTabType = 'offline';
    public data: IProgress;
    public sections: IAdaptationStage[] = [];
    public readonly restUrl: string;

    constructor(
        public tabsService: TabsService,
        private navCtrl: NavController,
        private apiAdaptationService: ApiAdaptationService,
        appConfig: AppConfigService,
        public myThemeService: MyThemeService,
        private fileDownloaderService: FileDownloaderService
    ) {
        this.restUrl = appConfig.getAttribute("restUrl");
    }

    ngOnInit(): void {
        this.getBusiness().then();
    }

    ngOnDestroy(): void {}

    public async getBusiness(): Promise<void> {
        try {
            const adaptation = await this.apiAdaptationService.getAdaptation();
            const data = await this.tabsService.getBusinessProcesses(adaptation?.id);
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
            console.log(this.sections);
            forkJoin(this.sections.map(p => this.fileDownloaderService.getFileBase64(p.imageId)))
                .subscribe(async (data: Blob[]) => {
                        for (let i = 0; i < data.length; i++)
                        {
                            // @ts-ignore
                            period.sections[i].imageBase64 = await this.fileDownloaderService.convertBlobToBase64(data[i]);
                        }
                    }, (err) => {
                        console.log("Ощибка");
                        console.log(err);
                    }
                );
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
