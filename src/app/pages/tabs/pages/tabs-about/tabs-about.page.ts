import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import {IPageTab, PageTabType} from "../../tabs.model";
import { IHistory } from './components/tabs-about-history/tabs-about-history.component';
import {AppConfigService} from "../../../../core/services/platform/app-config.service";
import {BackButtonService} from "../../../../core/services/platform/back-button.service";
import {IonSlides, Platform} from "@ionic/angular";
import {SLIDE_CONFIG_HISTORY} from "./tabs-about.config";
import {MyThemeService} from "../../../../core/services/platform/my-theme-service.service";

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
export class TabsAboutPage implements OnInit, OnDestroy, IPageTab {
    public route: PageTabType = 'about';

    @ViewChild('ionSlides') public ionSlide: IonSlides;
    public readonly restUrl: string;
    public readonly sections: string[] = ['Руководство', 'История'];
    public section$: BehaviorSubject<string> = new BehaviorSubject<string>('Руководство');
    public leadership: IMasterMindCategory[] = [];
    public history: IHistory[] =[];
    public showHistory: IHistory;
    public slideOptions = SLIDE_CONFIG_HISTORY(() => this.changeHistory());
    private detectSlide$: Subject<unknown> = new Subject<unknown>();

    constructor(
        public tabsService: TabsService,
        appConfigService: AppConfigService,
        public myThemeService: MyThemeService
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

    ngOnDestroy(): void {}

    public async getMasterMindCategories(): Promise<void> {
        const data = await this.tabsService.getMasterMindCategories();
        this.leadership = data;
        if (this.leadership?.[0]) {
            this.leadership[0].isActive = true;
        }
    }

    public async getHistoryBullets(): Promise<void> {
        this.history = await this.tabsService.getHistory();
        this.tabsService.historyPeriod$.next(this.history?.[0]);
    }

    public changeSection(section: string): void {
        this.section$.next(section);
        console.log(this.section$);
    }

    public async changeHistory(): Promise<void> {
        this.detectSlide$.next(true);
    }
}
