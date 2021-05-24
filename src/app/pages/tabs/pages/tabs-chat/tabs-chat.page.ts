import {Component, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from "../../tabs.interfaces";

@Component({
    selector: 'app-tabs-chat',
    templateUrl: './tabs-chat.page.html',
    styleUrls: ['./tabs-chat.page.scss'],
})
export class TabsChatPage implements OnInit, IPageTab {
    public route: PageTabType = 'chat';

    constructor() {
    }

    ngOnInit(): void {
    }

}
