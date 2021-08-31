import {Injectable} from '@angular/core';
import { App } from '@capacitor/app';
import {ApiStatisticService} from "../api/api-statistic.service";

@Injectable({
    providedIn: 'root'
})
export class StatisticService {
    private timer: ReturnType<typeof setInterval>;
    private timeCountSeconds: number = 0;

    constructor(private apiStatisticService: ApiStatisticService) {}

    public init(): void {
        App.addListener('appStateChange', ({isActive}) => {
            if (isActive) {
                this.startCount();
            } else {
                this.stopCount();
            }
        });
    }

    private startCount(): void {
        this.timer = setInterval(() => {
            // this.timeCountSeconds += 60;
            this.apiStatisticService.sendTimerStat(new Date(), 60);
        }, 60 * 1000);
    }

    private stopCount(): void {
        clearInterval(this.timer);
        this.timer = null;
    }
}
