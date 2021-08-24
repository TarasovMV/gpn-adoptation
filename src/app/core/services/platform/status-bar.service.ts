import {Injectable} from '@angular/core';
import {StatusBar, Style} from '@capacitor/status-bar';
import {filter} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class StatusBarService {
    private routeCounter: number = 0;
    private readonly alternativePages: string[] = [
        'tabs-offline',
        'tabs-progress',
        'auth',
        'tabs',
    ];

    constructor(private router: Router) {}

    public async init(): Promise<void> {
        try {
            await StatusBar.setOverlaysWebView({ overlay: true });
        } catch (e) {
            console.warn('Status bar not supported');
        }
        await this.setAlternativeColor();
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((x: NavigationEnd) => this.stateChecker(x.url));
    }

    public async setDefaultColor(): Promise<void> {
        try {
            await StatusBar.setStyle({ style: Style.Dark });
        } catch (e) {
            console.warn('Status bar not supported', 'DEFAULT');
        }
    }

    public async setAlternativeColor(): Promise<void> {
        try {
            await StatusBar.setStyle({ style: Style.Light });
        } catch (e) {
            console.warn('Status bar not supported', 'ALTER');
        }
    }

    private stateChecker(path: string): void {
        if (!this.routeCounter) {
            this.routeCounter++;
            return;
        }
        if (this.isAlternativePage(path)) {
            this.setAlternativeColor().then();
        } else {
            this.setDefaultColor().then();
        }
    }

    private isAlternativePage(path: string): boolean {
        const checkPath = path.split('/').slice(-1)[0];
        for(let page of this.alternativePages) {
            if (checkPath === page) {
                return true;
            }
        }
        return false;
    }
}
