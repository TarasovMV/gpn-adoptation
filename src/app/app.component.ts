import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ModalController, Platform} from "@ionic/angular";
import {KeyboardService} from "./core/services/platform/keyboard.service";
import {UserService} from "./core/services/data/user.service";
import {FcmService} from "./core/services/platform/fcm.service";
import {StatusBarService} from "./core/services/platform/status-bar.service";
import {BackButtonService} from "./core/services/platform/back-button.service";
import {ThemeService} from "./core/services/platform/theme-service.service";
import {DOCUMENT} from "@angular/common";
import {StatisticService} from "./core/services/platform/statistic.service";
import {ApiVersionService} from "./core/services/api/api-version-service";
import {InfoPopupVersionComponent} from "./shared/components/info-popup-version/info-popup-version.component";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    @ViewChild('appWindow', {static: true}) private appWindow: ElementRef;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private platform: Platform,
        private keyboardService: KeyboardService,
        private userService: UserService,
        private fcmService: FcmService,
        private statusBarService: StatusBarService,
        private backButtonService: BackButtonService,
        private themeService: ThemeService,
        private statisticService: StatisticService,
        private apiVersionService: ApiVersionService,
        private modalController: ModalController
    ) {}

    public ngOnInit(): void {
        this.platform.ready().then(async () => {
            this.keyboardService.setInitSettings(this.platform, this.appWindow).then();
            this.fcmService.initPush();
            this.statusBarService.init();
            this.backButtonService.init(this.platform);
            this.themeService.setPlatformClass(this.document, this.platform);
            this.statisticService.init();
            this.apiVersionService.versions$.subscribe((value) => {
                if (value) {
                    this.showVersionPrompt();
                }
            });
            this.apiVersionService.init(this.platform);
        });
    }

    public async showVersionPrompt(): Promise<void> {
        const modal = await this.modalController.create({
            component: InfoPopupVersionComponent,
        });
        return await modal.present();
    }
}

