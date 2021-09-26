import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Platform} from '@ionic/angular';
import {Keyboard, KeyboardStyle, KeyboardResize} from "@capacitor/keyboard";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class KeyboardService {
    private keyboardHeight$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(private router: Router) {
    }

    public async setInitSettings(platform: Platform, appWindow: ElementRef): Promise<void> {
        try {
            this.actionListeners(platform, appWindow);
            await Keyboard.setStyle({style: KeyboardStyle.Light});
            await Keyboard.setResizeMode({mode: KeyboardResize.None});
        } catch {
        }
    }

    private actionListeners(platform: Platform, appWindow: ElementRef): void {
        platform.keyboardDidShow.subscribe((event) => this.keyboardHeight$.next(event.keyboardHeight));
        platform.keyboardDidHide.subscribe(() => this.keyboardHeight$.next(0));
        this.keyboardHeight$.subscribe((height) => {
            if (this.router.url != '/auth') {
                (appWindow as any).el.style = `height: calc(100vh - ${height}px)`;
                setTimeout(() => document.activeElement.scrollIntoView({ behavior: 'smooth' }));
            }
        });
    }
}
