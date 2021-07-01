import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../platform/app-config.service";
import {INotification} from "../../models/notification.model";

@Injectable({
    providedIn: 'root'
})
export class ApiNotificationService {
    private readonly restUrl: string;

    constructor(private http: HttpClient, appConfigService: AppConfigService) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    public async getNotifications(): Promise<INotification[]> {
        return await this.http.get<INotification[]>(`${this.restUrl}/api/MobileUserNotification`).toPromise();
    }
}
