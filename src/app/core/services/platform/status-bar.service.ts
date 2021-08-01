import {Injectable} from '@angular/core';
import {StatusBar, Style} from '@capacitor/status-bar';

@Injectable({
    providedIn: 'root'
})
export class StatusBarService {

    constructor() {}

    public init(): void {
        StatusBar.setOverlaysWebView({ overlay: true }).then();
        this.setDefaultColor();
    }

    public setDefaultColor(): void {
        StatusBar.setStyle({ style: Style.Dark }).then();
    }

    public setAlternativeColor(): void {
        StatusBar.setStyle({ style: Style.Light }).then();
    }
}
