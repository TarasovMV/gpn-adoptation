import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHistory } from 'src/app/pages/tabs/pages/tabs-about/components/tabs-about-history/tabs-about-history.component';
import { IMasterMind, IMasterMindCategory } from 'src/app/pages/tabs/pages/tabs-about/tabs-about.page';
import { IColleague } from 'src/app/pages/tabs/pages/tabs-chat/tabs-chat.page';
import { IPost } from 'src/app/pages/tabs/pages/tabs-news/tabs-news.page';
import { IAnswer, IQuestion, ITests } from 'src/app/pages/tabs/pages/tabs-tests/tabs-tests.page';
import {IAdaptationStage, IAdaptationSubStage, IProgress} from 'src/app/pages/tabs/tabs.interfaces';
import {AppConfigService} from '../platform/app-config.service';
import {ITestResult} from "../../../pages/tabs/pages/tabs-tests/test-question/test-question.component";

@Injectable({
    providedIn: 'root'
})

export class TabsService {
    public showMenu$: BehaviorSubject<string> = new BehaviorSubject<string>('on');
    public tabsChat$: BehaviorSubject<IColleague> = new BehaviorSubject<IColleague>(null);
    public businessStages$: BehaviorSubject<IAdaptationStage> = new BehaviorSubject<IAdaptationStage>(null);
    public person$: BehaviorSubject<IMasterMind> = new BehaviorSubject<IMasterMind>(null);
    public historyPeriod$: BehaviorSubject<IHistory> = new BehaviorSubject<IHistory>(null);
    public adaptationComponents$: BehaviorSubject<IAdaptationSubStage> = new BehaviorSubject<IAdaptationSubStage>(null);
    public test$: BehaviorSubject<ITests> = new BehaviorSubject<ITests>(null);
    public startTest$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public question$: BehaviorSubject<IQuestion> = new BehaviorSubject<IQuestion>(null);
    public answers: IAnswer[] = [];

    private readonly restUrl;

    constructor(appConfigService: AppConfigService, private http: HttpClient) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    public async getAdaptation(id: number): Promise<IProgress> {
        return await this.http.get<IProgress>(`${this.restUrl}/api/Adaptation/${id}`).toPromise();
    }
    public async getNews(): Promise<IPost[]> {
        return await this.http.get<IPost[]>(`${this.restUrl}/api/news`).toPromise();
    }
    public async getBusinessProcesses(): Promise<IProgress> {
        return await this.http.get<IProgress>(`${this.restUrl}/api/Adaptation/1`).toPromise();
    }
    public async getMasterMindCategories(): Promise<IMasterMindCategory[]> {
        return await this.http.get<IMasterMindCategory[]>(`${this.restUrl}/api/MasterMindCategories`).toPromise();
    }
    public async getHistory(): Promise<IHistory[]> {
        return await this.http.get<IHistory[]>(`${this.restUrl}/api/HistoryPeriods`).toPromise();
    }
    public async getTests(): Promise<ITests[]> {
        return await this.http.get<ITests[]>(`${this.restUrl}/api/Testing/active`).toPromise();
    }
    public async postTestResult(result: ITestResult[]): Promise<ITestResult[]> {
        return await this.http.post<ITestResult[]>(`${this.restUrl}/api/TestResults/result`, result).toPromise();
    }
}
