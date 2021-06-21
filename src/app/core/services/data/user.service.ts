import {Injectable} from '@angular/core';
import {ApiUserService} from "../api/api-user.service";
import {TokenService} from "./token.service";
import {NavController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private apiUserService: ApiUserService,
        private tokenService: TokenService,
        private navCtrl: NavController,
    ) {}

    public async authorize(): Promise<void> {
        const token = await this.tokenService.loadToken();
        if (!token) {
            await this.navCtrl.navigateRoot('auth');
        } else {
            await this.navCtrl.navigateRoot('tabs');
        }
    }

    public async login(code: string): Promise<void> {
        const user = await this.apiUserService.authorize(code);
        await this.tokenService.saveToken(user.token);
        await this.navCtrl.navigateRoot('tabs');
    }

    public async logout(): Promise<void> {
        await this.tokenService.deleteToken();
        await this.navCtrl.navigateRoot('auth');
    }
}
