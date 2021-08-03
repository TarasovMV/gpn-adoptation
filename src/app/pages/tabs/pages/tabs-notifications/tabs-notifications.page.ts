import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from "../../tabs.model";
import {INotifications} from "../../../../core/models/notification.model";
import {ApiNotificationService} from "../../../../core/services/api/api-notification.service";
import {BehaviorSubject} from "rxjs";
import {BackButtonService} from "../../../../core/services/platform/back-button.service";
import {ModalController, Platform} from "@ionic/angular";
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';

@Component({
    selector: 'app-tabs-notifications',
    templateUrl: './tabs-notifications.page.html',
    styleUrls: ['./tabs-notifications.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsNotificationsPage implements OnInit, OnDestroy, IPageTab {
    public route: PageTabType = 'notifications';
    public readonly sections: string[] = ['Уведомления', 'Настройки'];
    public section$: BehaviorSubject<string> = new BehaviorSubject<string>('Уведомления');

    public notifications$: BehaviorSubject<INotifications[]> = new BehaviorSubject<INotifications[]>([]);

    constructor(
        private apiNotificationService: ApiNotificationService,
        private backButtonService: BackButtonService,
        private platform: Platform,
        private modalController: ModalController
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

}
