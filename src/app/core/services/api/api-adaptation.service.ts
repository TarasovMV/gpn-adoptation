import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../platform/app-config.service";
import {IAdaptationComponentResult, IProgress} from "../../../pages/tabs/tabs.model";

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

    public async saveComponentResult(id: number, result: IAdaptationComponentResult): Promise<unknown> {
        return await this.http.post<unknown>(`${this.restUrl}/api/AdaptationComponent/${id}/save`, result).toPromise();
    }
}
