import { Component, OnInit } from '@angular/core';
import { IPageTab, PageTabType } from "../../tabs.interfaces";

export interface INotifications {
    date: Date;
    notification: string[];
}

@Component({
    selector: 'app-tabs-notifications',
    templateUrl: './tabs-notifications.page.html',
    styleUrls: ['./tabs-notifications.page.scss'],
})
export class TabsNotificationsPage implements OnInit, IPageTab {
    public route: PageTabType = 'notifications';

    public notifications: INotifications[] = [
        {
            date: new Date('Jun 14, 2015'),
            notification: ['Вы выполнили не все назначенные на сегодня мероприятия']
        },
        {
            date: new Date(),
            notification: ['Вы выполнили не все назначенные на сегодня мероприятия']
        },
    ];
    constructor() {
    }

    ngOnInit(): void {
    }

}
