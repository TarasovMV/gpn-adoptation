import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IMasterMind, IMasterMindCategory} from '../../tabs-about.page';
import {animate, style, transition, trigger} from "@angular/animations";
import {MyThemeService} from "../../../../../../core/services/platform/my-theme-service.service";

@Component({
    selector: 'app-tabs-about-leadership',
    templateUrl: './tabs-about-leadership.component.html',
    styleUrls: ['./tabs-about-leadership.component.scss'],
    animations: [
        trigger(
            'inOutAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({ height: 0, opacity: .3 }),
                        animate('.2s ease-in',
                            style({ height: '*', opacity: 1 }))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({ height: '*', opacity: 1 }),
                        animate('.2s ease-out',
                            style({ height: 0, opacity: .3 }))
                    ]
                )
            ]
        )
    ]
})
export class TabsAboutLeadershipComponent implements OnInit {

    @Input() data: IMasterMindCategory[];

    constructor(
        public router: Router,
        public tabsService: TabsService,
        public myThemeService: MyThemeService
    ) {}

    ngOnInit(): void {}

    public switchStage(item: IMasterMindCategory): void {
        item.isActive = !item.isActive;
    }

    public openPerson(person: IMasterMind): void {
        setTimeout(() => {
            this.router.navigate(['tabs/tabs-about/' + person.id]);
            this.tabsService.person$.next(person);
        }, 50)
    }
}
