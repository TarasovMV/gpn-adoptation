import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import {IPageTab, PageTabType} from './tabs.model';

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

    public readonly tabsName: { [key in PageTabType]: string } = {
        news: 'Новости',
        chat: 'Сообщения',
        tests: 'Опросы',
        about: 'Главная',
        progress: 'Адаптация',
        offline: 'Справочник',
        notifications: 'Профиль'
    };

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

    public ngOnInit(): void {}

    public selectTab(tab: IPageTab): void {
        this.navCtrl.navigateRoot(this.tabsRouting[tab.route] ?? this.tabsRouting[this.currentTab$.value]).then();
    }

    public routing(tab: IPageTab): void {
        this.currentTab$.next(tab.route);
    }
}
