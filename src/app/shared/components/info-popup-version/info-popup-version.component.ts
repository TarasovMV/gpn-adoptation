import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ApiVersionService} from "../../../core/services/api/api-version-service";

@Component({
  selector: 'app-info-popup-version',
  templateUrl: './info-popup-version.component.html',
  styleUrls: ['./info-popup-version.component.scss'],
})
export class InfoPopupVersionComponent implements OnInit {

    constructor(
        private modalController: ModalController,
        private apiVersionService: ApiVersionService
    ) {}

    public ngOnInit(): void {}

    public dismiss() {
        this.modalController.dismiss().then();
    }

    public openStore(): void {
        this.apiVersionService.openStore();
        this.modalController.dismiss().then();
    }

}
