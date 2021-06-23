import {Component, OnInit} from '@angular/core';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IAnswers, IQuestions, ITests} from '../tabs-tests.page';

export interface ITestResult {
    testRoomId: number;
    testingQuestionId: number;
    testingAnswerId: number;
    dateTime: Date;
}

@Component({
    selector: 'app-test-question',
    templateUrl: './test-question.component.html',
    styleUrls: ['./test-question.component.scss'],
})
export class TestQuestionComponent implements OnInit {

    public test: ITests;
    public question: IQuestions;
    public questionCount = 0;

    constructor(
        public tabsService: TabsService,
    ) {
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

    public selectAnswer(answer: IAnswers): void {
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
        const answers = this.tabsService.answers;
        const results = answers.map<ITestResult>(x => ({
            testRoomId: this.test.id,
            testingQuestionId: x.testingQuestionId,
            testingAnswerId: x.id,
            dateTime: new Date(),
        }));
        return results;
    }
}
