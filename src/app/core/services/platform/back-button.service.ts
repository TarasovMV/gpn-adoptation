import {Injectable} from '@angular/core';
import {NavController, Platform} from "@ionic/angular";
import {Subscription} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BackButtonService {
    private rootSubscription: Subscription;
    private actionSubscription: Subscription;

    constructor(private navCtrl: NavController) {}

    public init(platform: Platform): void {
        platform.backButton.subscribeWithPriority(9999, () => {
            this.navCtrl.back();
        });
    }

    public actionOnBack(platform: Platform, action: () => void, isBack: boolean = true): void {
        this.rootSubscription = platform.backButton.subscribeWithPriority(9999, () => {
            action();
            if (isBack) {
                this.navCtrl.back();
            }
        });
    }

    public disableBackOnRoot(platform: Platform): void {
        this.rootSubscription = platform.backButton.subscribeWithPriority(9999, () => {});
    }

    public clearOnRoot(): void {
        this.rootSubscription.unsubscribe();
    }

    public clearAction(): void {
        this.actionSubscription.unsubscribe();
    }
}
