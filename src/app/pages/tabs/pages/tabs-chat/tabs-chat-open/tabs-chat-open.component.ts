import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IColleague} from '../tabs-chat.page';

@Component({
    selector: 'app-tabs-chat-open',
    templateUrl: './tabs-chat-open.component.html',
    styleUrls: ['./tabs-chat-open.component.scss'],
})
export class TabsChatOpenComponent implements OnInit {

    public id: string;
    public headerInfo: IColleague = null;

    constructor(
        public route: ActivatedRoute,
        public nav: Router,
        public tabsService: TabsService,
    ) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.tabsService.tabsChat$.subscribe(value => {
            this.headerInfo = value;
        });
    }

    public backToDialogues(): void {
        this.nav.navigate(['tabs/tabs-chat/']);
    }
}
