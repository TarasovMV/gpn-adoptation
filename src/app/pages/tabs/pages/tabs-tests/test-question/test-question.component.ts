import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IAnswers, IQuestions, ITests } from '../tabs-tests.page';

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
  ) { }

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

  public endTest(): void {
    this.tabsService.startTest$.next(-1);
  }
}
