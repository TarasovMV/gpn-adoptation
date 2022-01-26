import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/data/user.service';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent implements OnInit {

  constructor(
    private userService: UserService,
    public modalController: ModalController
    ) { }

  ngOnInit() {}

  public dismiss() {
    this.modalController.dismiss();
  }

  public logout(): void {
      localStorage.setItem("is-version-prompt-showed", "1");
      localStorage.setItem("tabs-progress-show", "0");
    this.userService.logout().then();
    this.dismiss();
}

}
