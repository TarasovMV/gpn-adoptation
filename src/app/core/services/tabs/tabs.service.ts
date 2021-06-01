import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IColleague } from "src/app/pages/tabs/pages/tabs-chat/tabs-chat.page";
import { IProgress } from "src/app/pages/tabs/tabs.interfaces";

@Injectable({
    providedIn: 'root'
})

export class TabsService {
    public restUrl = 'admin.corporateservice.gnkdev.space';
    public showMenu$: BehaviorSubject<string> = new BehaviorSubject<string>('on');
    public tabsChat$: BehaviorSubject<IColleague> = new BehaviorSubject<IColleague>(null);

    constructor(private http: HttpClient) {}

    public async getAdaptation(): Promise<IProgress[]> {
        return await this.http.get<IProgress[]>(`http://${this.restUrl}/api/adaptationstages`).toPromise();
    }
    public async getNews(): Promise<any> {
        return await this.http.get<any>(`http://${this.restUrl}/api/news`).toPromise();
    }
}