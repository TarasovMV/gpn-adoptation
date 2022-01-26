import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from "../../tabs.model";
import {INotifications} from "../../../../core/models/notification.model";
import {ApiNotificationService} from "../../../../core/services/api/api-notification.service";
import {BehaviorSubject} from "rxjs";
import {BackButtonService} from "../../../../core/services/platform/back-button.service";
import {ModalController, Platform} from "@ionic/angular";
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import {UserService} from "../../../../core/services/data/user.service";
import {IVersion} from "../../../../core/models/version-model";
import {ApiVersionService} from "../../../../core/services/api/api-version-service";

@Component({
    selector: 'app-tabs-notifications',
    templateUrl: './tabs-notifications.page.html',
    styleUrls: ['./tabs-notifications.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsNotificationsPage implements OnInit, OnDestroy, IPageTab {
    public route: PageTabType = 'notifications';
    public readonly sections: string[] = ['События', 'Настройки'];
    public section$: BehaviorSubject<string> = new BehaviorSubject<string>('События');

    public notifications$: BehaviorSubject<INotifications[]> = new BehaviorSubject<INotifications[]>([]);

    public userId: string;
    public currentVersion: IVersion;
    public areNotificationsEnabled = false;

    constructor(
        private apiNotificationService: ApiNotificationService,
        private modalController: ModalController,
        public apiVersionService: ApiVersionService
    ) {}

    public async ngOnInit(): Promise<void> {
        this.getNotifications().then();
        this.userId = localStorage.getItem("userCode");
    }

    public ngOnDestroy(): void {}

    public changeSection(section: string): void {
        this.section$.next(section);
    }

    public async changeUser(): Promise<void> {
        const modal = await this.modalController.create({
            component: ConfirmPopupComponent,
        });
        return await modal.present();
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

    public toggleNotifications(): void {
        this.areNotificationsEnabled = !this.areNotificationsEnabled;
    }
}
