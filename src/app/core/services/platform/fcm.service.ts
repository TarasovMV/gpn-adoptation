import {Injectable} from '@angular/core';
import {
    ActionPerformed,
    PushNotificationSchema,
    PushNotifications,
    Token,
} from '@capacitor/push-notifications';
import {Capacitor} from "@capacitor/core";
import { Storage } from '@capacitor/storage';
import {ApiUserService} from "../api/api-user.service";

@Injectable({
    providedIn: 'root'
})
export class FcmService {
    private readonly fcmTokenRoute: string = 'fcm-token';

    constructor(private apiUserService: ApiUserService) {
    }

    public initPush(): void {
        console.log('initPush');
        if(Capacitor.getPlatform() === 'web') {
            return;
        }
        this.registerPush();
    }

    public async sendFcmToken(): Promise<void> {
        const res = await Storage.get({key: this.fcmTokenRoute});
        const token = res.value;
        if (!token) { return; }
        await this.apiUserService.fcmTokenRegister(token);
    }

    private registerPush(): void {
        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermissions().then(result => {
            if (result.receive === 'granted') {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register().then();
            } else {
                // Show some error
            }
        });

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
            (token: Token) => {
                console.log('Push registration success, token: ' + token.value);
                if (token.value) {
                    Storage.set({key: this.fcmTokenRoute, value: token.value,}).then();
                }
            }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
            (error: any) => {
                console.log('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                console.log('Push received: ' + JSON.stringify(notification));
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
                console.log('Push action performed: ' + JSON.stringify(notification));
            }
        );
    }
}
