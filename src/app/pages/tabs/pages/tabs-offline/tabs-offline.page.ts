import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IPageTab, PageTabType } from "../../tabs.interfaces";

export interface IStage {
    id: number,
    description: string,
    helpTaskLinkId: number,
    stageNumberString: string,
    taskId: number,
    title: string,
}
export interface IBusiness {
    description: string,
    iconPath: string,
    id: number,
    regionId?: number,
    stages: IStage[],
    title: string
}
@Component({
    selector: 'app-tabs-offline',
    templateUrl: './tabs-offline.page.html',
    styleUrls: ['./tabs-offline.page.scss'],
})
export class TabsOfflinePage implements OnInit, IPageTab {
    public route: PageTabType = 'offline';
    public readonly cities: string[] = ['Москва', 'Омск', 'Санкт-Петербург'];
    public city$: BehaviorSubject<string> = new BehaviorSubject<string>('Москва');
    public data: IBusiness[];

    constructor(
        public router: Router,
        public tabsService: TabsService
    ) {
    }

    ngOnInit(): void {
        this.getBusiness();
    }

    public async getBusiness(): Promise<void> {
        const data = await this.tabsService.getBusinessProcesses();
        this.data = data;
        console.log(data);
    }

    public changeCity(city: string): void {
        this.city$.next(city)
    }
    public openCard(card: IBusiness): void {
        this.router.navigate(['tabs/tabs-offline/' + card.id]);
        this.tabsService.BusinessStages$.next(card);    
    }
}
