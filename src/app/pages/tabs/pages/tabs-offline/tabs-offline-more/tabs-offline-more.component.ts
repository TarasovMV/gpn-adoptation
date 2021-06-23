import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IBusiness} from '../tabs-offline.page';
import {IAdaptationStage} from "../../../tabs.interfaces";

@Component({
    selector: 'app-tabs-offline-more',
    templateUrl: './tabs-offline-more.component.html',
    styleUrls: ['./tabs-offline-more.component.scss'],
})
export class TabsOfflineMoreComponent implements OnInit {
    public data: IAdaptationStage = null;

    constructor(
        public nav: Router,
        public tabsService: TabsService
    ) {
    }

    ngOnInit(): void {
        this.tabsService.businessStages$.subscribe(value => {
            this.data = value;
        })
    }

    public backToOffline(): void {
        this.nav.navigate(['tabs/tabs-offline/'])
    }
}
