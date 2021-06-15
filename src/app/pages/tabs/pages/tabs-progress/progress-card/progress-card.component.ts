import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IAdaptationComponents, IStage } from '../../../tabs.interfaces';

export enum AdaptationComponentsType {
  none, imageWithText, textWithText, headerWithText,
  term, note, textBlock, blitz, file, moreDetails,
  points, video, buttons, squareImage
}

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss'],
})
export class ProgressCardComponent implements OnInit {
  public id: string;
  public cardData: IStage;

  public data: IAdaptationComponents[];

  constructor(
    private route: ActivatedRoute,
    public nav: Router,
    public tabsService: TabsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tabsService.showMenu$.next(null);
    this.tabsService.adaptationComponents$.subscribe(value => {
      this.data = value;
    });
  }

  public backToProgress(): void {
    this.nav.navigate(['tabs/tabs-progress/']);
    this.tabsService.showMenu$.next('on');
  }

  public openFile(): void {}
  public openMore(item: IAdaptationComponents): void {
    item.isActive = !item.isActive;
  }
  public clickButton(item: IAdaptationComponents): void {
    console.log(item.body);
  }
}
