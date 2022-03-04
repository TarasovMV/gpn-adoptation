import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {AngularSvgIconModule} from 'angular-svg-icon';
import {TextLinesPipe} from './pipes/text-lines.pipe';
import {RouteFilePipe} from "./pipes/route-file.pipe";
import {CashedImgComponent} from "./components/cashed-img/cashed-img.component";
import {SafeUrlPipe} from "./pipes/safe-url.pipe";
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { InfoPopupComponent } from './components/info-popup/info-popup.component';
import { BrowserModule } from '@angular/platform-browser';
import {InfoPopupVersionComponent} from "./components/info-popup-version/info-popup-version.component";
import {TrimPipe} from "./pipes/trim.pipe";
import {YtNoFullscreenPipe} from "./pipes/yt-no-fullscreen.pipe";

@NgModule({
    declarations: [
        TextLinesPipe,
        RouteFilePipe,
        SafeUrlPipe,
        CashedImgComponent,
        ConfirmPopupComponent,
        InfoPopupVersionComponent,
        TrimPipe,
        YtNoFullscreenPipe
    ],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule,
    ],
    exports: [
        TextLinesPipe,
        RouteFilePipe,
        SafeUrlPipe,
        CashedImgComponent,
        ConfirmPopupComponent,
        YtNoFullscreenPipe,
    ],
})
export class SharedModule {
}
