import {Injectable} from '@angular/core';
import {NavController, Platform} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class BackButtonService {

    constructor(private navCtrl: NavController) {}

    public init(platform: Platform): void {
        // if (!platform.is('android')) {
        //     return;
        // }
        // platform.backButton.subscribeWithPriority(999, () => {
        //     this.navCtrl.back();
        // });
    }
}
