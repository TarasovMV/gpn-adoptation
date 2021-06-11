import {Component, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from "../../tabs.interfaces";

@Component({
    selector: 'app-tabs-notifications',
    templateUrl: './tabs-notifications.page.html',
    styleUrls: ['./tabs-notifications.page.scss'],
})
export class TabsNotificationsPage implements OnInit, IPageTab {
    public route: PageTabType = 'notifications';

    constructor() {
    }

    ngOnInit(): void {
    }

}
