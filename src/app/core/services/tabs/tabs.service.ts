import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IMasterMind, IMasterMindCategory } from "src/app/pages/tabs/pages/tabs-about/tabs-about.page";
import { IColleague } from "src/app/pages/tabs/pages/tabs-chat/tabs-chat.page";
import { IPost } from "src/app/pages/tabs/pages/tabs-news/tabs-news.page";
import { IBusiness } from "src/app/pages/tabs/pages/tabs-offline/tabs-offline.page";
import { IProgress } from "src/app/pages/tabs/tabs.interfaces";

@Injectable({
    providedIn: 'root'
})

export class TabsService {
    public restUrl = 'admin.corporateservice.gnkdev.space';
    public showMenu$: BehaviorSubject<string> = new BehaviorSubject<string>('on');
    public tabsChat$: BehaviorSubject<IColleague> = new BehaviorSubject<IColleague>(null);
    public BusinessStages$: BehaviorSubject<IBusiness> = new BehaviorSubject<IBusiness>(null);
    public person$: BehaviorSubject<IMasterMind> = new BehaviorSubject<IMasterMind>(null);

    constructor(private http: HttpClient) {}

    public async getAdaptation(): Promise<IProgress[]> {
        return await this.http.get<IProgress[]>(`http://${this.restUrl}/api/adaptationstages`).toPromise();
    }
    public async getNews(): Promise<IPost[]> {
        return await this.http.get<IPost[]>(`http://${this.restUrl}/api/news`).toPromise();
    }
    public async getBusinessProcesses(): Promise<IBusiness[]> {
        return await this.http.get<IBusiness[]>(`http://${this.restUrl}/api/businessprocesses`).toPromise();
    }
    public async getMasterMindCategories(): Promise<IMasterMindCategory[]> {
        return await this.http.get<IMasterMindCategory[]>(`http://${this.restUrl}/api/MasterMindCategories`).toPromise();
    }
}