import { Component, OnInit } from '@angular/core';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import {NavController} from "@ionic/angular";
import {IAdaptationComponent, IStage} from "../tabs/tabs.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AppConfigService} from "../../core/services/platform/app-config.service";
import {Browser} from "@capacitor/browser";
import {TabsProgressService} from "../tabs/pages/tabs-progress/services/tabs-progress.service";

@Component({
    selector: 'app-info',
    templateUrl: './info.page.html',
    styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
    public id: number;
    public cardData: IStage;
    public isDone: boolean = false;
    public isProgress: boolean = true;
    private readonly ratesDefault: {id: number; isActive: boolean}[] = [
        {id: 1, isActive: false},
        {id: 2, isActive: false} ,
        {id: 3, isActive: false},
        {id: 4, isActive: false},
        {id: 5, isActive: false}
    ];

    public rates: { [key: number]: {id: number; isActive: boolean}[] } = {};
    public text: { [key: number]: string } = {};

    public data: IAdaptationComponent[];

    public readonly restUrl: string;

    constructor(
        private route: ActivatedRoute,
        public nav: Router,
        private navCtrl: NavController,
        public tabsService: TabsService,
        private tabsProgressService: TabsProgressService,
        appConfigService: AppConfigService,
    ) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    public ngOnInit(): void {
        this.id = +this.route.snapshot.queryParamMap.get('id');
        this.isProgress = this.route.snapshot.queryParamMap.get('type') === 'progress';
        this.tabsService.adaptationComponents$.subscribe(value => {
            this.data = value?.adaptationComponents;
            this.data?.forEach(x => { this.rates[x.id] = [...this.ratesDefault.map(r => ({...r}))] });
            this.isDone = value.isDone;
        });
    }

    public back(): void {
        this.navCtrl.back();
    }

    public openFile(path: string): void {
        // Browser.open({url: `${this.restUrl}/${path}`});
        window.open(`${this.restUrl}/${path}`);
    }

    public openMore(item: IAdaptationComponent): void {
        item.isActive = !item.isActive;
    }

    public clickButton(item: IAdaptationComponent): void {
        Browser.open({url: item.body}).then();
    }

    public setDone(): void {
        this.tabsProgressService.setDoneId(this.id);
        this.isDone = true;
        setTimeout(() => {
            this.navCtrl.back();
        }, 300);
    }

    public rateIt(rate: {id: number; isActive: boolean}, id: number): void {
        this.rates[id].forEach(x => x.isActive = false);
        this.rates[id].forEach(value => {
            if (value.id <= rate.id) {
                value.isActive = true;
            }
        });
    }

    public sendIt(id: number): void {
        this.text[id] = '';
    }
}
