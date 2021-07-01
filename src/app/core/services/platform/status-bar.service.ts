import {Injectable} from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Injectable({
    providedIn: 'root'
})
export class StatusBarService {

    constructor() {
    }

    public init(): void {
        StatusBar.setOverlaysWebView({ overlay: true }).then();
        StatusBar.setStyle({ style: Style.Dark }).then();
    }
}
