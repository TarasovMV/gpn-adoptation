import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class NaiveThemeServiceService {
    public className: string = "theme-light";

    constructor() {
        let theme = localStorage.getItem("theme");
        if (!theme) {
            localStorage.setItem("theme", "theme-light");
        } else {
            this.className = theme;
        }
    }
}
