import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IPageTab, PageTabType} from "../tabs/tabs.interfaces";
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-preview',
    templateUrl: './preview.page.html',
    styleUrls: ['./preview.page.scss'],
})
export class PreviewPage implements OnInit {
    public currentTab$: BehaviorSubject<PageTabType> = new BehaviorSubject<PageTabType>('news');

    // TODO: add icons
    public readonly tabs: IPageTab[] = [
        {
            route: 'news',
        },
        {
            route: 'chat',
        },
        {
            route: 'tests',
        },
        {
            route: 'about',
        },
        {
            route: 'progress',
        },
        {
            route: 'offline',
        },
    ];

    private readonly tabsRouting: {[key in PageTabType]: string} = {
        news: 'tabs/tabs-news',
        chat: 'tabs/tabs-chat',
        tests: 'tabs/tabs-tests',
        about: 'tabs/tabs-about',
        progress: 'tabs/tabs-progress',
        offline: 'tabs/tabs-offline',
    };

    constructor(private navCtrl: NavController) {
    }

    ngOnInit(): void {
    }

    public selectTab(tab: IPageTab): void {
        this.navCtrl.navigateRoot(this.tabsRouting[tab.route] ?? this.tabsRouting[this.currentTab$.value]).then();
    }

    // TODO: вызвать функцию на переключение табов
    public routing(tab: IPageTab): void {
        this.currentTab$.next(tab.route);
    }
}
