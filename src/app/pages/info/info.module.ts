import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {InfoPageRoutingModule} from './info-routing.module';
import {InfoPage} from './info.page';
import {AngularSvgIconModule} from "angular-svg-icon";
import {SharedModule} from "../../shared/shared.module";
import {YouTubePlayerModule} from "@angular/youtube-player";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InfoPageRoutingModule,
        AngularSvgIconModule,
        SharedModule,
        YouTubePlayerModule
    ],
    declarations: [InfoPage]
})
export class InfoPageModule {
}
