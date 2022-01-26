import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from "../../tabs.model";
import {INotifications} from "../../../../core/models/notification.model";
import {ApiNotificationService} from "../../../../core/services/api/api-notification.service";
import {BehaviorSubject} from "rxjs";
import {BackButtonService} from "../../../../core/services/platform/back-button.service";
import {ModalController, Platform, ToastController} from "@ionic/angular";
import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import {UserService} from "../../../../core/services/data/user.service";
import {IVersion} from "../../../../core/models/version-model";
import {ApiVersionService} from "../../../../core/services/api/api-version-service";
import {ApiSettingsService} from "../../../../core/services/api/api-settings-service";
import {CurrentUserModel} from "../../../../core/models/current-user.model";

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

    constructor(
        private apiNotificationService: ApiNotificationService,
        private modalController: ModalController,
        public apiVersionService: ApiVersionService,
        private toastController: ToastController,
        public apiSettingsService: ApiSettingsService
    ) {}

    public async ngOnInit(): Promise<void> {
        this.getNotifications().then();
        this.userId = localStorage.getItem("userCode");
        this.apiSettingsService.getCurrentUser().subscribe((data: CurrentUserModel) => {
            this.apiSettingsService.currentUser = data;
        });
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

    public async toggleNotifications(value): Promise<void> {
        this.apiSettingsService.setAreNotificationsEnabledFlag(value).subscribe(async () => {
            if (!value) {
                const toast = await this.toastController.create({
                    message: 'Push-уведомления отключены. Возможно, Вы не сможете своевременно получать информацию о новых событиях',
                    duration: 2000,
                    cssClass: 'custom-toast-2'
                });
                toast.present().then();
            }
        });
    }

    public async toggleTheme(): Promise<void> {
        const toast = await this.toastController.create({
            message: 'Изменение темы приложения не реализовано',
            duration: 2000,
            cssClass: 'custom-toast-2'
        });
        toast.present().then();
    }


}
