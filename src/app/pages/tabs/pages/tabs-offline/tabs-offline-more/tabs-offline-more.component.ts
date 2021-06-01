import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IOffline } from '../tabs-offline.page';

@Component({
  selector: 'app-tabs-offline-more',
  templateUrl: './tabs-offline-more.component.html',
  styleUrls: ['./tabs-offline-more.component.scss'],
})
export class TabsOfflineMoreComponent implements OnInit {
  public id: string;
  public stages: number[] = new Array(2);
  constructor(
    private route: ActivatedRoute,
    public nav: Router,
    public tabsService: TabsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  public backToOffline(): void {
    this.nav.navigate(['tabs/tabs-offline/'])
}
}
