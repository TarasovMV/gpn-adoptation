import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Platform} from '@ionic/angular';
import {Keyboard, KeyboardStyle, KeyboardResize} from '@capacitor/keyboard';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class KeyboardService {
    private keyboardHeight$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private readonly routesWithCoveredKeyboard = ['/auth', '/test'];

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

        Keyboard.addListener('keyboardWillShow', (event) => {
            this.keyboardHeight$.next(event.keyboardHeight);
            const logo = document.getElementById("logo-with-text-auth");
            if (logo) {
                logo.style.display = "none";
            }
        });
        Keyboard.addListener('keyboardWillHide',() => {
            this.keyboardHeight$.next(0);
        });
        Keyboard.addListener('keyboardDidHide',() => {
            setTimeout(() => {
                const logo = document.getElementById("logo-with-text-auth");
                if (logo) {
                    logo.style.display = "block";
                }
            }, 150);
        });
        this.keyboardHeight$.subscribe((height) => {
            (appWindow as any).el.style = `height: calc(100vh - ${height}px)`;
            if (!this.routesWithCoveredKeyboard.includes(this.router.url)) {
                setTimeout(() => document.activeElement.scrollIntoView({ behavior: 'smooth' }), 300);
            }
        });
    }
}
