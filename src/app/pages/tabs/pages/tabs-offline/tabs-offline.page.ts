import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IAdaptationStage, IPageTab, IProgress, PageTabType} from '../../tabs.interfaces';
import {AppConfigService} from "../../../../core/services/platform/app-config.service";

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
        public router: Router,
        public tabsService: TabsService,
        appConfig: AppConfigService,
    ) {
        this.restUrl = appConfig.getAttribute("restUrl");
    }

    ngOnInit(): void {
        this.tabsService.showMenu$.next('on');
        this.getBusiness();
    }

    public async getBusiness(): Promise<void> {
        try{
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

    public openCard(card: IAdaptationStage): void {
        this.router.navigate(['tabs/tabs-offline/' + card.id]);
        this.tabsService.businessStages$.next(card);
    }

    public filterSections(search: string): void {
        this.sections = this.data.adaptationStages.filter(x => x.name?.toLowerCase().search(search) !== -1);
    }
}
