import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {TokenService} from "../services/data/token.service";
import {NavController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class StartScreenGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private navCtrl: NavController,
    ) {}

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        const isLoadStart = !(await this.tokenService.loadSystemToken());
        if (isLoadStart) {
            return true;
        } else {
            this.navCtrl.navigateRoot('tabs');
            return false;
        }
    }

}
