import {Component, Inject, Input, OnInit} from '@angular/core';
import {IAdaptationComponent} from 'src/app/pages/tabs/tabs.model';

@Component({
    selector: 'app-progress-card-usual-text',
    templateUrl: './progress-card-usual-text.component.html',
    styleUrls: ['./progress-card-usual-text.component.scss'],
})
export class ProgressCardUsualTextComponent implements OnInit {

    // @Input() item: IAdaptationComponent;

    constructor(
        @Inject('item') public item: IAdaptationComponent,
    ) {
    }

    ngOnInit() {
    }

}
