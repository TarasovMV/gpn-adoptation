import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../platform/app-config.service";
import {IProgress} from "../../../pages/tabs/tabs.interfaces";

@Injectable({
    providedIn: 'root'
})
export class ApiAdaptationService {
    private readonly restUrl: string;

    constructor(
       private http: HttpClient,
       appConfigService: AppConfigService,
    ) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    //TODO: replace PUT
    public async setAdaptationResult(id: number): Promise<unknown> {
        return await this.http.get<unknown>(`${this.restUrl}/api/AdaptationSubStages/${id}/done`).toPromise();
    }
    public async getAdaptation(): Promise<IProgress> {
        return await this.http.get<IProgress>(`${this.restUrl}/api/Adaptation/mobile`).toPromise();
    }
}
