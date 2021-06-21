import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import {IPageTab, PageTabType} from '../../tabs.interfaces';

export interface ITests {
    id: number;
    testName: string;
    isShuffleQuestionsInt: number;
    questionsCount: number;
    questions: IQuestions[];
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

export interface IQuestions {
    id: number;
    testRoomId: number;
    title: string;
    type: number;
    answers: IAnswers[];
    result: string;
}

export interface IAnswers {
    id: 5;
    testingQuestionId: 6;
    title: string;
    isValidInt: number;
    score: number;
    scoreString: string;
}

@Component({
    selector: 'app-tabs-tests',
    templateUrl: './tabs-tests.page.html',
    styleUrls: ['./tabs-tests.page.scss'],
})
export class TabsTestsPage implements OnInit, IPageTab {
    public route: PageTabType = 'tests';
    public tests: number[] = new Array(3);
    public data: ITests[] = [];

    constructor(
        public tabsService: TabsService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.getTests();
    }

    public openTest(test: ITests) {
        this.router.navigate(['tabs/tabs-tests/' + test.id]);
        this.tabsService.test$.next(test);
    }

    public async getTests(): Promise<void> {
        try {
            this.data = await this.tabsService.getTests();
            console.log(this.data);
        }
        catch (e) {
            console.error(e);
        }
    }
}
