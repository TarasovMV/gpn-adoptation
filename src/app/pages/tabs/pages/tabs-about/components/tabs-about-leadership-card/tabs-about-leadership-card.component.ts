import {Component, Input, OnInit} from '@angular/core';
import {IMasterMind} from '../../tabs-about.page';
import {AppConfigService} from "../../../../../../core/services/platform/app-config.service";

@Component({
    selector: 'app-tabs-about-leadership-card',
    templateUrl: './tabs-about-leadership-card.component.html',
    styleUrls: ['./tabs-about-leadership-card.component.scss'],
})
export class TabsAboutLeadershipCardComponent implements OnInit {
    public readonly restUrl: string;

    @Input() element: IMasterMind;

    constructor(appConfigService: AppConfigService) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    ngOnInit() {
    }

}
