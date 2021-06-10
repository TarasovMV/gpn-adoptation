import {Component, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from "../../tabs.interfaces";

@Component({
    selector: 'app-tabs-tests',
    templateUrl: './tabs-tests.page.html',
    styleUrls: ['./tabs-tests.page.scss'],
})
export class TabsTestsPage implements OnInit, IPageTab {
    public route: PageTabType = 'tests';
    public tests: number[] = new Array(3);

    constructor() {
    }

    ngOnInit(): void {
    }

}
