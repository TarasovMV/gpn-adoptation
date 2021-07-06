import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';

export interface IHistory {
    id: number;
    periodBounds: string;
    imagePath: string;
    historyBullets: IHistoryBullet[];
}

export interface IHistoryBullet {
    historyPeriodId: number;
    id: number;
    text: string;
}

@Component({
    selector: 'app-tabs-about-history',
    templateUrl: './tabs-about-history.component.html',
    styleUrls: ['./tabs-about-history.component.scss'],
})
export class TabsAboutHistoryComponent implements OnInit {
    @Input() data: IHistory[];
    @ViewChild('scrollView') scrollView: ElementRef;
    public currentIdx: number = 0;

    constructor(
        public tabsService: TabsService,
        private cdRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.tabsService.historyPeriod$.subscribe(x => {
            this.currentIdx = x;
            const el = document.getElementById(`period_${x}`);
            el?.scrollIntoView({block: 'center', inline: 'center', behavior: 'auto'});
            this.cdRef.detectChanges();
        })
    }
}
