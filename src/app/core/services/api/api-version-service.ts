import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../platform/app-config.service';
import {IVersion} from '../../models/version-model';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {BehaviorSubject} from "rxjs";
import {Platform} from "@ionic/angular";

export class Versions {
    currentVersion: IVersion;
    latestVersion: IVersion;
}
@Injectable({
    providedIn: 'root'
})

export class ApiVersionService {
    public versions$: BehaviorSubject<Versions> = new BehaviorSubject<Versions>(null);
    private currentVersion: IVersion;
    private latestVersion: IVersion;
    private readonly restUrl: string;
    private _storeUrl: string;

    constructor(
        private http: HttpClient,
        private appVersion: AppVersion,
        appConfigService: AppConfigService,
    ) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    public async init(platform: Platform) {
        if (platform.is("android")) {
            this.setStoreUrl("market://details?id=io.gpn.adoptation");
        }
        if (platform.is("ios")) {
            this.setStoreUrl("https://apps.apple.com/ru/app/адаптация/id1573528993");
        }
        this.currentVersion = await this.getCurrentVersion();
        this.latestVersion = await this.getLatestVersion();
        this.versions$.next({currentVersion: this.currentVersion, latestVersion: this.latestVersion});
        this.versions$.complete();
    }

    public setStoreUrl(storeUrl: string): void {
        // eslint-disable-next-line no-underscore-dangle
        this._storeUrl = storeUrl;
    }

    public openStore(): void {
        // eslint-disable-next-line no-underscore-dangle
        window.open(this._storeUrl);
    }

    private async getLatestVersion(): Promise<IVersion> {
        return this.http.get<IVersion>(`${this.restUrl}/api/ApplicationVersions/latest`).toPromise();
    }

    private async getCurrentVersion(): Promise<IVersion> {
        const versionHistory = await this.http.get<IVersion[]>(`${this.restUrl}/api/ApplicationVersions`).toPromise();
        const currentVersion = versionHistory.find(async x => x.versionCode === await this.appVersion.getVersionCode());
        if (currentVersion) {
            return currentVersion;
        }
        else {
            return {
                versionName: await this.appVersion.getVersionNumber(), versionCode: await this.appVersion.getVersionCode(),
                versionDescription: null, dateTime: ""};
        }
    }
}
