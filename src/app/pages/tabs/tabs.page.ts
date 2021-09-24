import {AfterViewInit, Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import {IPageTab, PageTabType} from './tabs.model';
import {StatusBarService} from '../../core/services/platform/status-bar.service';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, AfterViewInit {
    public currentTab$: BehaviorSubject<PageTabType> = new BehaviorSubject<PageTabType>('news');

    public readonly tabs: IPageTab[] = [
        {
            route: 'about',
            ripple$: new BehaviorSubject(false),
        },
        {
            route: 'progress',
            ripple$: new BehaviorSubject(false),
        },
        {
            route: 'offline',
            ripple$: new BehaviorSubject(false),
        },
        {
            route: 'tests',
            ripple$: new BehaviorSubject(false),
        },
        {
            route: 'notifications',
            ripple$: new BehaviorSubject(false),
        },
    ];

    public readonly tabsName: { [key in PageTabType]: string } = {
        news: 'Новости',
        chat: 'Сообщения',
        tests: 'Квизы',
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
        public tabsService: TabsService,
        public statusBarService: StatusBarService
    ) { }

    public ngOnInit(): void {}

    public ngAfterViewInit(): void {
        this.statusBarService.setAlternativeColor();
    }

    public selectTab(tab: IPageTab): void {
        tab.ripple$.next(true);
        setTimeout(() => tab.ripple$.next(false), 500);
        this.navCtrl.navigateRoot(this.tabsRouting[tab.route] ?? this.tabsRouting[this.currentTab$.value]).then();
    }

    public routing(tab: IPageTab): void {
        this.currentTab$.next(tab.route);
    }

    public tabTrack(index: number, el: IPageTab): string {
        return el.route;
    }
}
