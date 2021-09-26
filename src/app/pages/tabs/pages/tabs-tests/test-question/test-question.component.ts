import {Component, OnInit} from '@angular/core';
import { AppConfigService } from 'src/app/core/services/platform/app-config.service';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IAnswer, IQuestion, ITests} from '../tabs-tests.page';

export interface ITestResult {
    testRoomId: number;
    testingQuestionId: number;
    testingAnswerId: number;
    dateTime: Date;
    text: string;
}

@Component({
    selector: 'app-test-question',
    templateUrl: './test-question.component.html',
    styleUrls: ['./test-question.component.scss'],
})
export class TestQuestionComponent implements OnInit {

    public test: ITests;
    public question: IQuestion;
    public questionCount = 0;
    public readonly restUrl: string;

    constructor(
        appConfigService: AppConfigService,
        public tabsService: TabsService,
    ) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    ngOnInit() {
        this.tabsService.test$.subscribe(value => {
            this.test = value;
            this.tabsService.question$.next(value.questions[this.questionCount]);
            console.log(this.test);
        });
        this.tabsService.question$.subscribe(value => {
            this.question = value;
        });
    }

    public selectAnswer(answer: IAnswer): void {
        answer.isActive = !answer.isActive;
        if (answer.isActive) {
            this.tabsService.answers.push(answer);
        } else if (!answer.isActive) {
            const index = this.tabsService.answers.indexOf(answer);
            this.tabsService.answers.splice(index, 1);
        }
        this.tabsService.answers.filter(value => value.isActive);
        console.log(this.tabsService.answers);
    }

    // TODO: костыль
    public inputTextAnswer(event: any, question: IQuestion): void {
        question.answers = [{text: event.detail.value, testingQuestionId: question.id, isActive: true} as any];
    }

    public selectOneAnswer(answer: IAnswer, question: IQuestion): void {
        question.answers.forEach(x => x.isActive = false);
        answer.isActive = !answer.isActive;
        if (answer.isActive) {
            this.tabsService.answers.push(answer);
        } else if (!answer.isActive) {
            const index = this.tabsService.answers.indexOf(answer);
            this.tabsService.answers.splice(index, 1);
        }
        this.tabsService.answers.filter(value => value.isActive);
    }

    public nextQuestion(): void {
        if (true) {
            this.questionCount++;
            this.tabsService.question$.next(this.tabsService.test$.getValue()?.questions[this.questionCount]);
            console.log(this.tabsService.test$.getValue().questions[this.questionCount]);
        }
    }

    public previousQuestion(): void {
        if (this.questionCount > 0) {
            this.questionCount--;
            this.tabsService.question$.next(this.tabsService.test$.getValue()?.questions[this.questionCount]);
        }
    }

    public async postAnswers(results: ITestResult[]): Promise<void> {
        await this.tabsService.postTestResult(results);
    }

    public endTest(): void {
        console.log(this.tabsService.answers);
        const res = this.createRequest();
        this.postAnswers(res).then();

        this.tabsService.answers = [];
        this.tabsService.startTest$.next(-1);
    }

    createRequest(): ITestResult[] {
        const answers = this.test.questions.flatMap(x => x.answers).filter(x => !!x.isActive);
        const results = answers.map<ITestResult>(x => ({
            testRoomId: this.test.id,
            testingQuestionId: x.testingQuestionId,
            testingAnswerId: x.id ?? null,
            dateTime: new Date(),
            text: x.text,
        }));
        return results;
    }
}


