import {Component, OnInit} from '@angular/core';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {ITests} from '../tabs-tests.page';
import {NavController, Platform} from "@ionic/angular";

@Component({
    selector: 'app-tests-test',
    templateUrl: './tests-test.component.html',
    styleUrls: ['./tests-test.component.scss'],
})
export class TestsTestComponent implements OnInit {
    public test: ITests;

    constructor(
        public navCtrl: NavController,
        public tabsService: TabsService,
        private platform: Platform,
    ) {
    }

    ngOnInit() {
        this.platform.backButton.subscribeWithPriority(9999, () => {
            this.backToTests();
        })
        this.tabsService.test$.subscribe(value => {
            this.test = value;
        });
    }

    public backToTests(): void {
        this.navCtrl.back();
        this.tabsService.startTest$.next(null);
    }

    public startTest(element: ITests): void {
        this.tabsService.startTest$.next(element.id);
    }
}
