import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { ITests } from '../tabs-tests.page';

@Component({
  selector: 'app-tests-test',
  templateUrl: './tests-test.component.html',
  styleUrls: ['./tests-test.component.scss'],
})
export class TestsTestComponent implements OnInit {

  public id: number;
  public test: ITests;

  constructor(
    private route: ActivatedRoute,
    public nav: Router,
    public tabsService: TabsService,
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.tabsService.test$.subscribe(value => {
      this.test = value;
    });
  }

  public backToTests(): void {
    this.nav.navigate(['tabs/tabs-tests/']);
    this.tabsService.showMenu$.next('on');
}
}
