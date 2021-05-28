import {Component, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {IPageTab, PageTabType} from "../../tabs.interfaces";

@Component({
    selector: 'app-tabs-offline',
    templateUrl: './tabs-offline.page.html',
    styleUrls: ['./tabs-offline.page.scss'],
})
export class TabsOfflinePage implements OnInit, IPageTab {
    public route: PageTabType = 'offline';
    public readonly cities: string[] = ['Москва', 'Омск', 'Санкт-Петербург'];
    public city$: BehaviorSubject<string> = new BehaviorSubject<string>('Москва')

    constructor() {
    }

    ngOnInit(): void {
    }

    public changeCity(city: string): void {
        console.log(city);
        
        this.city$.next(city)
    }
}
