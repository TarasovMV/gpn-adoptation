import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IAdaptationComponent, IStage} from '../../../tabs.interfaces';
import { Browser } from "@capacitor/browser";
import {TabsProgressService} from "../services/tabs-progress.service";
import {NavController} from "@ionic/angular";

export enum AdaptationComponentsType {
    none, imageWithText, textWithText, headerWithText,
    term, note, textBlock, blitz, file, moreDetails,
    points, video, buttons, squareImage
}

@Component({
    selector: 'app-progress-card',
    templateUrl: './progress-card.component.html',
    styleUrls: ['./progress-card.component.scss'],
})
export class ProgressCardComponent implements OnInit {
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

    constructor(
        private route: ActivatedRoute,
        public nav: Router,
        private navCtrl: NavController,
        public tabsService: TabsService,
        private tabsProgressService: TabsProgressService,
    ) {
    }

    ngOnInit(): void {
        this.id = +this.route.snapshot.queryParamMap.get('id');
        this.isProgress = this.route.snapshot.queryParamMap.get('type') === 'progress';
        this.tabsService.showMenu$.next(null);
        this.tabsService.adaptationComponents$.subscribe(value => {
            this.data = value?.adaptationComponents;
            this.data.forEach(x => { this.rates[x.id] = [...this.ratesDefault.map(r => ({...r}))] });
            this.isDone = value.isDone;
        });
    }

    public backToProgress(): void {
        this.navCtrl.back();
        this.tabsService.showMenu$.next('on');
    }

    public openFile(path: string): void {
        Browser.open({url: `http://185.165.161.23/${path}`});
    }

    public openMore(item: IAdaptationComponent): void {
        item.isActive = !item.isActive;
    }

    public clickButton(item: IAdaptationComponent): void {
        console.log(item.body);
        Browser.open({url: item.body});
    }

    public setDone(): void {
        this.tabsProgressService.setDoneId(this.id);
        this.isDone = true;
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
