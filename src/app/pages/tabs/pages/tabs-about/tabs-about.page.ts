import {Component, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {IPageTab, PageTabType} from "../../tabs.interfaces";

@Component({
    selector: 'app-tabs-about',
    templateUrl: './tabs-about.page.html',
    styleUrls: ['./tabs-about.page.scss'],
})
export class TabsAboutPage implements OnInit, IPageTab {
    public route: PageTabType = 'about';
    public readonly sections: string[] = ['География', 'История', 'Руководство'];
    public section$: BehaviorSubject<string> = new BehaviorSubject<string>('География')

    constructor() {
    }

    ngOnInit(): void {
    }

    public changeSection(section: string): void {
        this.section$.next(section)
    }
}
