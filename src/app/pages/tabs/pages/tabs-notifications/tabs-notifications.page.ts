import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from "../../tabs.model";
import {INotifications} from "../../../../core/models/notification.model";
import {ApiNotificationService} from "../../../../core/services/api/api-notification.service";
import {BehaviorSubject} from "rxjs";
import {BackButtonService} from "../../../../core/services/platform/back-button.service";
import {Platform} from "@ionic/angular";

@Component({
    selector: 'app-tabs-notifications',
    templateUrl: './tabs-notifications.page.html',
    styleUrls: ['./tabs-notifications.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsNotificationsPage implements OnInit, OnDestroy, IPageTab {
    public route: PageTabType = 'notifications';

    public notifications$: BehaviorSubject<INotifications[]> = new BehaviorSubject<INotifications[]>([]);

    constructor(
        private apiNotificationService: ApiNotificationService,
        private backButtonService: BackButtonService,
        private platform: Platform,
    ) {}

    public ngOnInit(): void {
        this.getNotifications().then();
    }

    public ngOnDestroy(): void {}

    public ionViewDidEnter(): void {
        this.backButtonService.disableBackOnRoot(this.platform);
    }

    public ionViewWillLeave(): void {
        this.backButtonService.clearOnRoot();
    }

    private async getNotifications(): Promise<void> {
        const getOnlyDate = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const notifications = await this.apiNotificationService.getNotifications();
        notifications.forEach(x => x.createdAt = new Date(x.createdAt));
        const mapNotifications: INotifications[] = [];
        notifications.forEach(x => {
            const date = getOnlyDate(x.createdAt);
            const arr = mapNotifications.find(n => n.date.getTime() === date.getTime());
            if (!arr) {
                mapNotifications.push({date, notifications: [x]});
            } else {
                arr.notifications.push(x);
            }
        });
        mapNotifications.forEach(x => {
            x.notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        });
        mapNotifications.sort((a, b) => b.date.getTime() - a.date.getTime());
        this.notifications$.next(mapNotifications);
    }
}
