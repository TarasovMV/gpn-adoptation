import {Injectable} from '@angular/core';
import {StatusBar, Style} from '@capacitor/status-bar';
import {filter} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class StatusBarService {

    private readonly alternativePages: string[] = [
        'tabs-offline',
        'tabs-progress',
        'auth',
    ];

    constructor(private router: Router) {}

    public async init(): Promise<void> {
        StatusBar.setOverlaysWebView({ overlay: true }).then();
        // await this.setDefaultColor();
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((x: NavigationEnd) => this.stateChecker(x.url));
    }

    public async setDefaultColor(): Promise<void> {
        StatusBar.setStyle({ style: Style.Dark }).then();
    }

    public async setAlternativeColor(): Promise<void> {
        StatusBar.setStyle({ style: Style.Light }).then();
    }

    private stateChecker(path: string): void {
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
