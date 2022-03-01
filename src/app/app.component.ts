import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import {KeyboardService} from "./core/services/platform/keyboard.service";
import {UserService} from "./core/services/data/user.service";
import {FcmService} from "./core/services/platform/fcm.service";
import {StatusBarService} from "./core/services/platform/status-bar.service";
import {BackButtonService} from "./core/services/platform/back-button.service";
import {ThemeService} from "./core/services/platform/theme-service.service";
import {DOCUMENT} from "@angular/common";
import {StatisticService} from "./core/services/platform/statistic.service";
import {ApiVersionService} from "./core/services/api/api-version-service";
import {TabsPage} from "./pages/tabs/tabs.page";
import {Storage} from "@capacitor/storage";
import {Router} from "@angular/router";
import {MyThemeService} from "./core/services/platform/my-theme-service.service";

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
        public nav: Router,
        public myThemeService: MyThemeService
    ) {}

    public ngOnInit(): void {
        this.platform.ready().then(async () => {
            this.keyboardService.setInitSettings(this.platform, this.appWindow).then();
            this.fcmService.initPush();
            this.statusBarService.init();
            this.backButtonService.init(this.platform);
            this.themeService.setPlatformClass(this.document, this.platform);
            this.statisticService.init();
            this.apiVersionService.setPlatform(this.platform);
            localStorage.setItem("is-version-prompt-showed", "1");
            const firstTime = localStorage.getItem("tabs-progress-show");
            if (!firstTime) {
                localStorage.setItem("tabs-progress-show", "0");
            }
            window.screen.orientation.lock("portrait");
        });

        this.platform.resume.subscribe(async ()=> {
           /* if (!this.nav.url.startsWith("/info")) {
                window.location.reload();
            }*/
           /* const currentTabResult = await Storage.get({key: "current-tab"});
            let currentTab = "";
            if (!currentTabResult.value) {
                currentTab = 'tabs/tabs-progress';
                await this.navCtrl.navigateRoot("tabs/tabs-offline");
            }
            else {
                currentTab = currentTabResult.value;
                await this.navCtrl.navigateRoot("tabs/tabs-progress");
            }

            await this.navCtrl.navigateRoot(currentTab, {replaceUrl: true});*/
            //window.location.reload();
        });
    }
}

