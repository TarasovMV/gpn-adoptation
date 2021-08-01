import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Storage } from '@capacitor/storage';
import {Platform} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
    private readonly renderer: Renderer2;
    private themeConfigurator: ThemeConfigurator;
    public isDarkTheme: Observable<boolean>;

    constructor(
        private rendererFactory: RendererFactory2,
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    public async setThemeConfiguratorRoot(document: Document): Promise<void> {
        const theme = await Storage.get({key: 'theme'});
        this.themeConfigurator = new ThemeConfigurator(document, this.renderer, theme.value);
        this.isDarkTheme = this.themeConfigurator.isDarkThemeObservable;
    }

    public changeTheme(): void {
        this.themeConfigurator.switchTheme();
    }

    public setPlatformClass(document: Document, platform: Platform): void {
        if (platform.is('ios')) {
            this.renderer.setAttribute(document.body, 'class', 'ios');
        }
    }
}

export class ThemeConfigurator {
    private isDarkTheme$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isDarkThemeObservable: Observable<boolean> = this.isDarkTheme$.asObservable();

    constructor(
        private document: Document,
        private renderer: Renderer2,
        themeStorage: string,
    ) {
        this.isDarkThemeObservable.subscribe((ref) => this.setTheme(ref));
        if (!themeStorage) {
            this.theme = true;
        } else {
            this.theme = themeStorage === 'true';
        }
    }

    public set theme(value: boolean) {
        // this.storage.set('theme', value.toString()).then();
        this.isDarkTheme$.next(value);
    }

    public get theme(): boolean {
        return this.isDarkTheme$.getValue();
    }

    public switchTheme(): void {
        this.theme = !this.theme;
    }

    public setTheme(isDarkMode: boolean): void {
        if (!this.document) {
            return;
        }
        const hostClass = isDarkMode ? 'theme-dark' : 'theme-light';
        this.renderer.setAttribute(this.document.body, 'class', hostClass);
    }
}
