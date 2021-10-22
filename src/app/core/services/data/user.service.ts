import {Injectable} from '@angular/core';
import {ApiUserService} from "../api/api-user.service";
import {TokenService} from "./token.service";
import {NavController} from "@ionic/angular";
import {FcmService} from "../platform/fcm.service";
import {StatusBarService} from "../platform/status-bar.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private apiUserService: ApiUserService,
        private tokenService: TokenService,
        private navCtrl: NavController,
        private fcmService: FcmService,
        private statusBarService: StatusBarService
    ) {}

    public async authorize(): Promise<boolean> {
        const token = await this.tokenService.loadToken();
        return !!token;
    }

    public async login(code: string): Promise<void> {
        const user = await this.apiUserService.authorize(code);
        await this.tokenService.saveToken(user.token);
        await this.navCtrl.navigateRoot('start');
        this.fcmService.sendFcmToken().then();
    }

    public async logout(): Promise<void> {
        await this.tokenService.deleteToken();
        await this.navCtrl.navigateRoot('auth');
    }
}
