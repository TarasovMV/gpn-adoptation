import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {LoginComponent} from '../pages/login/login.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {TextLinesPipe} from './pipes/text-lines.pipe';
import {RouteFilePipe} from "./pipes/route-file.pipe";
import {CashedImgComponent} from "./components/cashed-img/cashed-img.component";

@NgModule({
    declarations: [
        LoginComponent,
        TextLinesPipe,
        RouteFilePipe,
        CashedImgComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule,
    ],
    exports: [
        LoginComponent,
        TextLinesPipe,
        RouteFilePipe,
        CashedImgComponent,
    ]
})
export class SharedModule {
}
