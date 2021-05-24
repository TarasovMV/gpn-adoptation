import {Component, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from "../../tabs.interfaces";

@Component({
    selector: 'app-tabs-news',
    templateUrl: './tabs-news.page.html',
    styleUrls: ['./tabs-news.page.scss'],
})
export class TabsNewsPage implements OnInit, IPageTab {
    public route: PageTabType = 'news';

    constructor() {
    }

    ngOnInit(): void {
    }

}
