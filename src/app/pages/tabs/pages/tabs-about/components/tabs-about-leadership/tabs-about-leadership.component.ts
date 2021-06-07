import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IMasterMind, IMasterMindCategory } from '../../tabs-about.page';

@Component({
  selector: 'app-tabs-about-leadership',
  templateUrl: './tabs-about-leadership.component.html',
  styleUrls: ['./tabs-about-leadership.component.scss'],
})
export class TabsAboutLeadershipComponent implements OnInit {

  @Input() data: IMasterMindCategory[];
  constructor(
    public router: Router,
    public tabsService: TabsService
  ) { }

  ngOnInit() { }

  public switchStage(item: IMasterMindCategory): void {
    item.isActive = !item.isActive;
  }

  public openPerson(person: IMasterMind): void {
    this.router.navigate(['tabs/tabs-about/' + person.id]);
    this.tabsService.person$.next(person);    
  }
}
