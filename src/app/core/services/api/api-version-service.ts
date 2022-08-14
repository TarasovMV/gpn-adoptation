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
    public currentVersion: IVersion;
    public latestVersion: IVersion;
    private readonly restUrl: string;
    private _storeUrl: string;
    private _platform: Platform;
    private _init: boolean = false;

    constructor(
        private http: HttpClient,
        private appVersion: AppVersion,
        appConfigService: AppConfigService,
    ) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    public setPlatform(platform: Platform) {
        // eslint-disable-next-line no-underscore-dangle
        this._platform = platform;
        // eslint-disable-next-line no-underscore-dangle
        if (this._platform.is("android")) {
            this.setStoreUrl("market://details?id=io.avsv.adaptation");
        }
        // eslint-disable-next-line no-underscore-dangle
        if (this._platform.is("ios")) {
            this.setStoreUrl("https://apps.apple.com/ru/app/адаптация/id1573528993");
        }
    }

    public async init() {
        this.currentVersion = await this.getCurrentVersion();
        this.latestVersion = await this.getLatestVersion();
        this.versions$.next({currentVersion: this.currentVersion, latestVersion: this.latestVersion});
        this.versions$.complete();
        // eslint-disable-next-line no-underscore-dangle
        this._init = true;
    }

    public isInit(): boolean {
        // eslint-disable-next-line no-underscore-dangle
        return this._init;
    }

    public openStore(): void {
        // eslint-disable-next-line no-underscore-dangle
        window.open(this._storeUrl);
    }

    private setStoreUrl(storeUrl: string): void {
        // eslint-disable-next-line no-underscore-dangle
        this._storeUrl = storeUrl;
    }

    private async getLatestVersion(): Promise<IVersion> {
        return this.http.get<IVersion>(`${this.restUrl}/api/ApplicationVersions/latest`).toPromise();
    }

    private async getCurrentVersion(): Promise<IVersion> {
        const versionHistory = await this.http.get<IVersion[]>(`${this.restUrl}/api/ApplicationVersions`).toPromise();
        const buildNumber = await this.appVersion.getVersionCode();
        const currentVersion = versionHistory.find(x => Number(x.versionCode) === Number(buildNumber));
        if (currentVersion) {
            console.log("Current version");
            console.log(await this.appVersion.getVersionCode());
            return currentVersion;
        }
        else {
            return {
                versionName: await this.appVersion.getVersionNumber(), versionCode: await this.appVersion.getVersionCode(),
                versionDescription: null, dateTime: Date()};
        }
    }
}
