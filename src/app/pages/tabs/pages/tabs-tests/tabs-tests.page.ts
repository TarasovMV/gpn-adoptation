import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import {IPageTab, PageTabType} from '../../tabs.model';
import {NavController, Platform} from "@ionic/angular";
import {BackButtonService} from "../../../../core/services/platform/back-button.service";
import {Subscription} from "rxjs";

export interface ITests {
    id: number;
    testName: string;
    isShuffleQuestionsInt: number;
    questionsCount: number;
    questions: IQuestion[];
    time: number;
    endDate: Date;
    startDate: Date;
    endHour: number;
    startHour: number;
    endMinute: number;
    startMinute: number;
    isActive: number;
    testEmployees?: Array<any>;
    regions: string;
    divisions: string;
}

export interface IQuestion {
    id: number;
    testRoomId: number;
    title: string;
    type: number;
    answers: IAnswer[];
    result: string;
}

export interface IAnswer {
    id: 5;
    testingQuestionId: 6;
    title: string;
    isValidInt: number;
    score: number;
    scoreString: string;
    isActive?: boolean;
    text?: string;
}

@Component({
    selector: 'app-tabs-tests',
    templateUrl: './tabs-tests.page.html',
    styleUrls: ['./tabs-tests.page.scss'],
})
export class TabsTestsPage implements OnInit, OnDestroy, IPageTab {
    public route: PageTabType = 'tests';
    public data: ITests[] = [];

    constructor(
        public tabsService: TabsService,
        private platform: Platform,
        private navCtrl: NavController,
        private backButtonService: BackButtonService,
    ) {
    }

    ngOnInit(): void {
        this.tabsService.startTest$.subscribe(x => {
            this.getTests().then();
        })
    }

    ngOnDestroy(): void {}

    public ionViewDidEnter(): void {
        this.backButtonService.disableBackOnRoot(this.platform);
    }

    public ionViewWillLeave(): void {
        this.backButtonService.clearOnRoot();
    }

    public async openTest(test: ITests): Promise<void> {
        this.tabsService.test$.next(test);
        await this.navCtrl.navigateForward('test');
    }

    public async getTests(): Promise<void> {
        try {
            this.data = await this.tabsService.getTests();
        }
        catch (e) {
            console.error(e);
        }
    }
}
