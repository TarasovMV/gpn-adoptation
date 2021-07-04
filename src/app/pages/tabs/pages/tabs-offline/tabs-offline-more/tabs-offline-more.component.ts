import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IAdaptationStage, IAdaptationSubStage, IPageTab, PageTabType} from "../../../tabs.model";
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-tabs-offline-more',
    templateUrl: './tabs-offline-more.component.html',
    styleUrls: ['./tabs-offline-more.component.scss'],
})
export class TabsOfflineMoreComponent implements OnInit, IPageTab {
    public route: PageTabType = 'offline';
    public data: IAdaptationStage = null;
    public sections: IAdaptationSubStage[] = [];

    constructor(
        public nav: Router,
        public tabsService: TabsService,
        private navCtrl: NavController,
    ) {}

    ngOnInit(): void {
        this.tabsService.businessStages$.subscribe(value => {
            this.data = value;
        });
        this.sections = this.data?.adaptationSubStages;
    }

    public backToOffline(): void {
        // this.navCtrl.navigateRoot(['tabs/tabs-offline/']);
        this.navCtrl.back();
    }

    public openSubStage(subStage: IAdaptationSubStage): void {
        this.tabsService.adaptationComponents$.next(subStage);
        this.navCtrl.navigateForward('info', { queryParams: {id: subStage.id, type: 'reference'}});
    }

    public filterSections(search: string): void {
        search = search.toLowerCase();
        this.sections = this.data.adaptationSubStages.filter(x => x.name?.toLowerCase().search(search) !== -1);
    }
}
