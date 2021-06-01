import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IStage } from '../../../tabs.interfaces';

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss'],
})
export class ProgressCardComponent implements OnInit {
  public id: string;
  public cardData: IStage

  public data: IStage

  constructor(
    private route: ActivatedRoute,
    public nav: Router,
    public tabsService: TabsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tabsService.showMenu$.next(null);
    this.getData();
  }

  public async getData(): Promise<void> {
    const data = await this.tabsService.getAdaptation();
    data.forEach(v =>  {
      v.subStages.forEach(x => {
        if (+this.id === x.id) {
          this.data = x;
        }
      })
    });
}

  public backToProgress(): void {
    this.nav.navigate(['tabs/tabs-progress/']);
    this.tabsService.showMenu$.next('on');
  }
}
