import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IBullet} from '../../tabs-about.page';
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-tabs-about-person',
    templateUrl: './tabs-about-person.component.html',
    styleUrls: ['./tabs-about-person.component.scss'],
})
export class TabsAboutPersonComponent implements OnInit {

    public id: string;
    public data: IBullet[];

    constructor(
        private route: ActivatedRoute,
        public navCtrl: NavController,
        public tabsService: TabsService
    ) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.tabsService.person$.subscribe(value => {
            this.data = value.bullets;
        });
    }

    public backToPersonal(): void {
        this.navCtrl.back();
    }
}
