import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavController, Platform} from "@ionic/angular";
import {KeyboardService} from "./core/services/platform/keyboard.service";
import {UserService} from "./core/services/data/user.service";
import {FcmService} from "./core/services/platform/fcm.service";
import {StatusBarService} from "./core/services/platform/status-bar.service";
import {BackButtonService} from "./core/services/platform/back-button.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    @ViewChild('appWindow', {static: true}) private appWindow: ElementRef;

    constructor(
        private platform: Platform,
        private keyboardService: KeyboardService,
        private userService: UserService,
        private fcmService: FcmService,
        private statusBarService: StatusBarService,
        private backButtonService: BackButtonService,
    ) {}

    public ngOnInit(): void {
        this.platform.ready().then(() => {
            this.keyboardService.setInitSettings(this.platform, this.appWindow).then();
            this.fcmService.initPush();
            this.statusBarService.init();
            this.backButtonService.init(this.platform);
        });
    }
}
