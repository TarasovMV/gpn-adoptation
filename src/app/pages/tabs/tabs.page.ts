import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { PageTabType } from './tabs.interfaces';

export interface IPageTab {
    readonly route: PageTabType;
}

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
    public currentTab$: BehaviorSubject<PageTabType> = new BehaviorSubject<PageTabType>('news');

    public readonly tabs: IPageTab[] = [
        {
            route: 'about',
        },
        {
            route: 'progress',
        },
        {
            route: 'offline',
        },
        {
            route: 'tests',
        },
        {
            route: 'notifications',
        },
    ];

    private readonly tabsRouting: { [key in PageTabType]: string } = {
        news: 'tabs/tabs-news',
        chat: 'tabs/tabs-chat',
        tests: 'tabs/tabs-tests',
        about: 'tabs/tabs-about',
        progress: 'tabs/tabs-progress',
        offline: 'tabs/tabs-offline',
        notifications: 'tabs/tabs-notifications'
    };

    constructor(
        private navCtrl: NavController,
        public tabsService: TabsService
        ) { }

    ngOnInit(): void {
    }

    public selectTab(tab: IPageTab): void {
        this.navCtrl.navigateRoot(this.tabsRouting[tab.route] ?? this.tabsRouting[this.currentTab$.value]).then();
    }

    public routing(tab: IPageTab): void {
        this.currentTab$.next(tab.route);
    }
}
