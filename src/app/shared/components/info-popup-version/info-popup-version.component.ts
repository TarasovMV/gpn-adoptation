import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ApiVersionService} from "../../../core/services/api/api-version-service";
import {InfoPopupStagesComponent} from "../info-popup-stages/info-popup-stages.component";

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

    public async dismiss() {
        this.modalController.dismiss().then();

        setTimeout(async() => {
            if (this.apiVersionService.currentVersion.versionCode < this.apiVersionService.latestVersion.versionCode) {
                const modal = await this.modalController.create({
                    component: InfoPopupStagesComponent,
                });
                modal.present().then();
            }
        }, 300);
    }

    public openStore(): void {
        this.apiVersionService.openStore();
        this.modalController.dismiss().then();
    }

}
