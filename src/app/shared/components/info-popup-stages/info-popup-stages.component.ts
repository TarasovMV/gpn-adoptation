import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-popup-stages',
  templateUrl: './info-popup-stages.component.html',
  styleUrls: ['./info-popup-stages.component.scss'],
})
export class InfoPopupStagesComponent implements OnInit {

  public readonly blocks: string[] = [
    'Информационный блок', 'Блок с заданием', 'Завершение этапа', 'Блок с видео'
];

constructor(
    private modalController: ModalController
) {}

public ngOnInit(): void {}

public dismiss() {
    this.modalController.dismiss().then();
}

}
