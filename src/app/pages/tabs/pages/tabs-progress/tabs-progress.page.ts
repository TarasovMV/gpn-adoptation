import {Component, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from "../../tabs.interfaces";

@Component({
    selector: 'app-tabs-progress',
    templateUrl: './tabs-progress.page.html',
    styleUrls: ['./tabs-progress.page.scss'],
})
export class TabsProgressPage implements OnInit, IPageTab {
    public route: PageTabType = 'progress';

    constructor() {
    }

    ngOnInit(): void {
    }

}
