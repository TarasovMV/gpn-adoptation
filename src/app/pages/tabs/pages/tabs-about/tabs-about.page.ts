import {Component, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import {IPageTab, PageTabType} from "../../tabs.interfaces";

export interface IMasterMindCategory {
    id: number,
    name: string,
    masterMinds: IMasterMind[],
    isActive?: boolean
}

export interface IMasterMind {
    id: number,
    surname: string,
    firstName: string,
    patronymic: string,
    position: string,
    image: string,
    imagePath: string,
    bullets: IBullet[]
}

export interface IBullet {
    id: number,
    title: string,
    content: string,
    masterMindId: string,
}

@Component({
    selector: 'app-tabs-about',
    templateUrl: './tabs-about.page.html',
    styleUrls: ['./tabs-about.page.scss'],
})
export class TabsAboutPage implements OnInit, IPageTab {
    public route: PageTabType = 'about';
    public readonly sections: string[] = ['География', 'История', 'Руководство'];
    public section$: BehaviorSubject<string> = new BehaviorSubject<string>('География');
    public leadership: IMasterMindCategory[] = []

    constructor(
        public tabsService: TabsService
    ) {
    }

    ngOnInit(): void {
        this.getMasterMindCategories();
    }


    public async getMasterMindCategories(): Promise<void> {
        const data = await this.tabsService.getMasterMindCategories();
        this.leadership = data;
        console.log(data);
    }

    public changeSection(section: string): void {
        this.section$.next(section)
    }
}
