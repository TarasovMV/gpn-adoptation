import {IVersion} from "../../models/version-model";
import {Injectable} from "@angular/core";
import {CurrentUserModel} from "../../models/current-user.model";
import {HttpClient} from "@angular/common/http";
import {AppVersion} from "@ionic-native/app-version/ngx";
import {AppConfigService} from "../platform/app-config.service";

export class Versions {
    currentVersion: IVersion;
    latestVersion: IVersion;
}
@Injectable({
    providedIn: 'root'
})
export class ApiSettingsService {
    public currentUser: CurrentUserModel;
    private readonly restUrl: string;

    constructor(
        private http: HttpClient,
        private appVersion: AppVersion,
        appConfigService: AppConfigService,
    ) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    public getCurrentUser() {
        return this.http.get(`${this.restUrl}/api/User/current`);
    }

    public setAreNotificationsEnabledFlag(value: boolean) {
        return this.http.post(`${this.restUrl}/api/ApplicationSettings/notifications/set-flag`, {
            userId: this.currentUser.id,
            value: value
        });
    }
}
