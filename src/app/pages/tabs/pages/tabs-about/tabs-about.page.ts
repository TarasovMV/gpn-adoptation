import {Component, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import {IPageTab, PageTabType} from "../../tabs.interfaces";
import { IHistory } from './components/tabs-about-history/tabs-about-history.component';
import {AppConfigService} from "../../../../core/services/platform/app-config.service";

export interface IMasterMindCategory {
    id: number,
    name: string,
    masterMinds: IMasterMind[],
    isActive?: boolean
}

export interface IMasterMind {
    id: number,
    surname: string,
    firstName: string,
    patronymic: string,
    position: string,
    image: string,
    imagePath: string,
    bullets: IBullet[]
}

export interface IBullet {
    id: number,
    title: string,
    content: string,
    masterMindId: string,
}

@Component({
    selector: 'app-tabs-about',
    templateUrl: './tabs-about.page.html',
    styleUrls: ['./tabs-about.page.scss'],
})
export class TabsAboutPage implements OnInit, IPageTab {
    public route: PageTabType = 'about';

    public readonly restUrl: string;
    public readonly sections: string[] = ['Руководство', 'История'];
    public section$: BehaviorSubject<string> = new BehaviorSubject<string>('Руководство');
    public leadership: IMasterMindCategory[] = [];
    public history: IHistory[] =[];
    public showHistory: IHistory;

    constructor(
        public tabsService: TabsService,
        appConfigService: AppConfigService,
    ) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    ngOnInit(): void {
        this.getMasterMindCategories();
        this.getHistoryBullets();
        this.tabsService.historyPeriod$.subscribe(value => {
            this.showHistory = value;
        });
    }


    public async getMasterMindCategories(): Promise<void> {
        const data = await this.tabsService.getMasterMindCategories();
        this.leadership = data;
    }

    public async getHistoryBullets(): Promise<void> {
        this.history = await this.tabsService.getHistory();
        this.tabsService.historyPeriod$.next(this.history?.[0]);
    }

    public changeSection(section: string): void {
        this.section$.next(section);
    }
}
