import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IHistory } from "src/app/pages/tabs/pages/tabs-about/components/tabs-about-history/tabs-about-history.component";
import { IMasterMind, IMasterMindCategory } from "src/app/pages/tabs/pages/tabs-about/tabs-about.page";
import { IColleague } from "src/app/pages/tabs/pages/tabs-chat/tabs-chat.page";
import { IPost } from "src/app/pages/tabs/pages/tabs-news/tabs-news.page";
import { IBusiness } from "src/app/pages/tabs/pages/tabs-offline/tabs-offline.page";
import { IProgress } from "src/app/pages/tabs/tabs.interfaces";
import {AppConfigService} from "../platform/app-config.service";

@Injectable({
    providedIn: 'root'
})

export class TabsService {
    private readonly restUrl;
    public showMenu$: BehaviorSubject<string> = new BehaviorSubject<string>('on');
    public tabsChat$: BehaviorSubject<IColleague> = new BehaviorSubject<IColleague>(null);
    public BusinessStages$: BehaviorSubject<IBusiness> = new BehaviorSubject<IBusiness>(null);
    public person$: BehaviorSubject<IMasterMind> = new BehaviorSubject<IMasterMind>(null);
    public historyPeriod$: BehaviorSubject<IHistory> = new BehaviorSubject<IHistory>(null);

    constructor(appConfigService: AppConfigService, private http: HttpClient) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    public async getAdaptation(): Promise<IProgress[]> {
        return await this.http.get<IProgress[]>(`${this.restUrl}/api/adaptationstages`).toPromise();
    }
    public async getNews(): Promise<IPost[]> {
        return await this.http.get<IPost[]>(`${this.restUrl}/api/news`).toPromise();
    }
    public async getBusinessProcesses(): Promise<IBusiness[]> {
        return await this.http.get<IBusiness[]>(`${this.restUrl}/api/businessprocesses`).toPromise();
    }
    public async getMasterMindCategories(): Promise<IMasterMindCategory[]> {
        return await this.http.get<IMasterMindCategory[]>(`${this.restUrl}/api/MasterMindCategories`).toPromise();
    }
    public async getHistory(): Promise<IHistory[]> {
        return await this.http.get<IHistory[]>(`${this.restUrl}/api/HistoryBullets`).toPromise();
    }
}
