import { Component, Input, OnInit } from '@angular/core';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';

export interface IHistory {
  id: number,
  text: string,
  historyPeriodId: number,
  historyPeriod: string
}

@Component({
  selector: 'app-tabs-about-history',
  templateUrl: './tabs-about-history.component.html',
  styleUrls: ['./tabs-about-history.component.scss'],
})
export class TabsAboutHistoryComponent implements OnInit {
  @Input() data: IHistory[];
  constructor(
    public tabsService: TabsService,
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  public selectPeriod(period: IHistory): void {
    this.tabsService.historyPeriod$.next(period)
}
}
