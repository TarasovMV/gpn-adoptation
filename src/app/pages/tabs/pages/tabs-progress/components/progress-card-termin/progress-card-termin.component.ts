import {Component, Inject, Input, OnInit} from '@angular/core';
import {IAdaptationComponent} from 'src/app/pages/tabs/tabs.model';

@Component({
    selector: 'app-progress-card-termin',
    templateUrl: './progress-card-termin.component.html',
    styleUrls: ['./progress-card-termin.component.scss'],
})
export class ProgressCardTerminComponent implements OnInit {
    // @Input() item: IAdaptationComponent;

    constructor(@Inject('item') public item: IAdaptationComponent) {
    }

    ngOnInit() {
    }

}
