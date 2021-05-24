import {Component, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from "../../tabs.interfaces";

@Component({
    selector: 'app-tabs-offline',
    templateUrl: './tabs-offline.page.html',
    styleUrls: ['./tabs-offline.page.scss'],
})
export class TabsOfflinePage implements OnInit, IPageTab {
    public route: PageTabType = 'offline';

    constructor() {
    }

    ngOnInit(): void {
    }
}
