import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IAdaptationComponents, IStage} from '../../../tabs.interfaces';
import { Browser } from "@capacitor/browser";
import {TabsProgressService} from "../services/tabs-progress.service";

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

    public data: IAdaptationComponents[];

    constructor(
        private route: ActivatedRoute,
        public nav: Router,
        public tabsService: TabsService,
        private tabsProgressService: TabsProgressService,
    ) {
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.tabsService.showMenu$.next(null);
        this.tabsService.adaptationComponents$.subscribe(value => {
            this.data = value;
        });
    }

    public backToProgress(): void {
        this.nav.navigate(['tabs/tabs-progress/']);
        this.tabsService.showMenu$.next('on');
    }

    public openFile(path: string): void {
        Browser.open({url: `http://185.165.161.23/${path}`});
    }

    public openMore(item: IAdaptationComponents): void {
        item.isActive = !item.isActive;
    }

    public clickButton(item: IAdaptationComponents): void {
        console.log(item.body);
        Browser.open({url: item.body});
    }

    public setDone(): void {
        console.log(this.id);
        this.tabsProgressService.setDoneId(this.id);
    }
}
