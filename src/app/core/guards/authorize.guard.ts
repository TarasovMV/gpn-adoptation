import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {NavController} from "@ionic/angular";
import {UserService} from "../services/data/user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private navCtrl: NavController,
    ) {}

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        const isLoadStart = await this.userService.authorize();
        if (isLoadStart) {
            return true;
        } else {
            this.navCtrl.navigateRoot('auth');
            return false;
        }
    }

}

