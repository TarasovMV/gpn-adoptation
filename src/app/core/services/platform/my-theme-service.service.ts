import {Injectable} from "@angular/core";
import {Storage} from "@capacitor/storage";
import {NavigationBar} from "@hugotomazi/capacitor-navigation-bar";

@Injectable()
export class MyThemeService {
    public className: string = "theme-light";
    public isThemeLight: boolean = true;
    constructor() {
        this.init().then();
    }

    async init() {
        const themeValue = await Storage.get({key: "theme"});
        if (!themeValue.value) {
            await Storage.set({key: "theme", value: "theme-light"});
            this.className = "theme-light";
            await NavigationBar.setColor({ color: '#F2F2F2', darkButtons: true });
        } else {
            this.className = themeValue.value;
            this.isThemeLight = this.className === "theme-light";
            if (this.isThemeLight) {
                await NavigationBar.setColor({ color: '#F2F2F2', darkButtons: true });
            }
            else {
                await NavigationBar.setColor({ color: '#303549', darkButtons: false });
            }
        }
    }

    async switchTheme() {
        const themeValue = await Storage.get({key: "theme"});
        if (themeValue.value === "theme-light") {
            await Storage.set({key: "theme", value: "theme-dark"});
            this.className = "theme-dark";
            await NavigationBar.setColor({ color: '#303549', darkButtons: false });
        }
        else {
            await Storage.set({key: "theme", value: "theme-light"});
            this.className = "theme-light";
            await NavigationBar.setColor({ color: '#F2F2F2', darkButtons: true });
        }
        this.isThemeLight = this.className === "theme-light";
        console.log(this.className);

    }
}
