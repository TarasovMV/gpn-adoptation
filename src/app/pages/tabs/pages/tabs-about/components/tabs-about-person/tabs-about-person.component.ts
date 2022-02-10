import {Component, OnInit} from '@angular/core';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IBullet} from '../../tabs-about.page';
import {NavController} from "@ionic/angular";
import {IPageTab, PageTabType} from "../../../../tabs.model";
import {MyThemeService} from "../../../../../../core/services/platform/my-theme-service.service";

@Component({
    selector: 'app-tabs-about-person',
    templateUrl: './tabs-about-person.component.html',
    styleUrls: ['./tabs-about-person.component.scss'],
})
export class TabsAboutPersonComponent implements OnInit, IPageTab {
    public route: PageTabType = 'about';
    public data: IBullet[];

    constructor(
        public tabsService: TabsService,
        private navCtrl: NavController,
        public myThemeService: MyThemeService
    ) {
    }

    ngOnInit() {
        this.tabsService.person$.subscribe(value => {
            this.data = value.bullets;
        });
    }

    public backToPersonal(): void {
        this.navCtrl.back();
    }
}
