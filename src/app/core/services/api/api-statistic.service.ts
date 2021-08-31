import {Injectable} from '@angular/core';
import {AppConfigService} from "../platform/app-config.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiStatisticService {
    private readonly restUrl: string;

    constructor(
        private http: HttpClient,
        appConfigService: AppConfigService,
    ) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    public async sendTimerStat(timestamp: Date, seconds: number): Promise<unknown> {
        return await this.http.post('', {}).toPromise();
    }
}
