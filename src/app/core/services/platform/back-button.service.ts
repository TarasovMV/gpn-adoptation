import {Injectable} from '@angular/core';
import {NavController, Platform, ToastController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import { App } from '@capacitor/app';

@Injectable({
    providedIn: 'root'
})
export class BackButtonService {
    private rootSubscription: Subscription;
    private actionSubscription: Subscription;
    private backCounter: number = 0;
    private routeCounter: number = 0;

    private readonly rootPages: string[] = [
        'tabs-notifications',
        'tabs-offline',
        'tabs-progress',
        'tabs-about',
        'tabs-tests',
        'tabs',
    ];

    constructor(
        private navCtrl: NavController,
        private platform: Platform,
        private router: Router,
        private toastController: ToastController,
    ) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationStart))
            .subscribe((x: NavigationStart) => {
                if (!this.routeCounter) {
                    this.routeCounter++
                    return;
                }
                if (this.isRootPage(x.url)) {
                    this.disableBackOnRoot(this.platform);
                } else {
                    this.clearOnRoot();
                    this.default(this.platform);
                }
            });
    }

    public init(platform: Platform): void {
        this.disableBackOnRoot(platform);
    }

    public default(platform: Platform): void {
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
        this.rootSubscription = platform.backButton.subscribeWithPriority(9999, () => {
            this.backCounter++;
            if (this.backCounter === 2) {
                App.exitApp();
            } else {
                this.showBackElseMessage().then();
                setTimeout(() => this.backCounter = 0, 1500);
            }
        });
    }

    public clearOnRoot(): void {
        if (!this.rootSubscription) {
            return;
        }
        this.rootSubscription?.unsubscribe();
        this.rootSubscription = null;
    }

    public clearAction(): void {
        if (!this.actionSubscription) {
            return;
        }
        this.actionSubscription?.unsubscribe();
        this.actionSubscription = null;
    }

    private async showBackElseMessage(): Promise<void> {
        const toast = await this.toastController.create({
            message: 'Для выхода из приложения нажмите "Назад" еще раз',
            duration: 1500,
            cssClass: 'custom-toast',
        });
        await toast.present();
    }

    private isRootPage(path: string): boolean {
        const checkPath = path.split('/').slice(-1)[0];
        for(let page of this.rootPages) {
            if (checkPath === page) {
                return true;
            }
        }
        return false;
    }
}
