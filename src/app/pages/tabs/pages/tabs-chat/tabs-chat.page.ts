import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IPageTab, PageTabType } from "../../tabs.model";

export interface IColleague {
    id: number,
    surname: string,
    name: string,
    photo?: string,
    position: string,
    unreadMessage?: number
}

@Component({
    selector: 'app-tabs-chat',
    templateUrl: './tabs-chat.page.html',
    styleUrls: ['./tabs-chat.page.scss'],
})
export class TabsChatPage implements OnInit, IPageTab {
    public route: PageTabType = 'chat';
    public dialogs: IColleague[] = [
        {
            id: 0,
            surname: 'Андреева',
            name: 'Анна',
            photo: '',
            position: 'Ваш HR-менеджер',
            unreadMessage: 2
        },
        {
            id: 1,
            surname: 'Карпачев',
            name: 'Виталий',
            photo: '',
            position: 'Ваш Руководитель',
            unreadMessage: 1
        },
        {
            id: 2,
            surname: 'Долганов',
            name: 'Андрей',
            photo: '',
            position: 'Ваш Наставник',
            unreadMessage: 3
        },
    ];

    constructor(
        public router: Router,
        public tabsService: TabsService
    ) {
    }

    ngOnInit(): void {
    }

    public openChat(chat: IColleague): void {
        this.router.navigate(['tabs/tabs-chat/' + chat.id]);
        this.tabsService.tabsChat$.next(chat);
    }
}
