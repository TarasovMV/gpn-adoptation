import {Injectable} from '@angular/core';
import {NavController, Platform} from "@ionic/angular";
import {Subscription} from "rxjs";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class BackButtonService {
    private rootSubscription: Subscription;
    private actionSubscription: Subscription;

    private readonly rootPages: string[] = [
        'tabs-notifications',
        'tabs-offline',
        'tabs-progress',
        'tabs-about',
        'tabs-tests',
    ]

    constructor(private navCtrl: NavController, private platform: Platform, private router: Router) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationStart))
            .subscribe((x: NavigationStart) => {
                if (this.isRootPage(x.url)) {
                    this.disableBackOnRoot(this.platform);
                } else {
                    this.clearOnRoot();
                    this.init(this.platform);
                }
            });
    }

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
