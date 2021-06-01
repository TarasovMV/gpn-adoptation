import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IPageTab, PageTabType } from "../../tabs.interfaces";

export interface IOffline {
    id: number,
    logo: string
    title: string,
    description?: string
    stages?: IStage[]
}
export interface IStage {
    id: number,
    stage: string,
    task: string,
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
    public cards: IOffline[] = [
        {
            id: 0,
            logo: 'home',
            title: `Оформление трудовых отношений`,
        },
        {
            id: 1,
            logo: 'work',
            title: `Приём на работу (Оформление)`,
        },
        {
            id: 2,
            logo: 'wallet',
            title: `Оформление банковской карты`,
        },
        {
            id: 3,
            logo: 'profile',
            title: `Спецодежда и СИЗ`,
        },
        {
            id: 4,
            logo: 'heart',
            title: `Информация о ДМС`,
        },
        {
            id: 5,
            logo: 'shield',
            title: `ОСтрахование от несчастных случаев`,
        },
        {
            id: 6,
            logo: 'star',
            title: `Внешний вид`,
        },
        {
            id: 7,
            logo: 'calling',
            title: `ИТ-поддержка`,
        },
    ];

    constructor(
        public router: Router
    ) {
    }

    ngOnInit(): void {
    }

    public changeCity(city: string): void {
        this.city$.next(city)
    }
    public openCard(card: IOffline): void {
        this.router.navigate(['tabs/tabs-offline/' + card.id]);
    }
}
