import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IAdaptationStage, IAdaptationSubStage} from "../../../tabs.interfaces";
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-tabs-offline-more',
    templateUrl: './tabs-offline-more.component.html',
    styleUrls: ['./tabs-offline-more.component.scss'],
})
export class TabsOfflineMoreComponent implements OnInit {
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
        this.nav.navigate(['tabs/tabs-offline/']);
    }

    public openSubStage(subStage: IAdaptationSubStage): void {
        this.tabsService.adaptationComponents$.next(subStage);
        this.navCtrl.navigateForward('tabs/tabs-progress/', { queryParams: {id: subStage.id, type: 'reference'}});
    }

    public filterSections(search: string): void {
        this.sections = this.data.adaptationSubStages.filter(x => x.name?.toLowerCase().search(search) !== -1);
    }
}
