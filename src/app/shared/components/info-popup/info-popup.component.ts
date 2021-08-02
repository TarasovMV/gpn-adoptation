import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-info-popup',
    templateUrl: './info-popup.component.html',
    styleUrls: ['./info-popup.component.scss'],
})
export class InfoPopupComponent implements OnInit {

    public readonly blocks: string[] = [
        'Информационный блок', 'Блок с заданием', 'Завершение этапа'
    ];

    constructor(
        private modalController: ModalController
    ) {}

    public ngOnInit(): void {}

    public dismiss() {
        this.modalController.dismiss().then();
    }

}
