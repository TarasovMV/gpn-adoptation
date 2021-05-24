import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Platform} from "@ionic/angular";
import {KeyboardService} from "./core/services/platform/keyboard.service";

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
    ) {}

    public ngOnInit(): void {
        this.platform.ready().then(() => {
            this.keyboardService.setInitSettings(this.platform, this.appWindow).then();
        });
    }
}
