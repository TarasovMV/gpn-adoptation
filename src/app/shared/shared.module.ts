import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from "@ionic/angular";
import { LoginComponent } from '../pages/login/login.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StartPageComponent } from '../pages/start-page/start-page.component';
import { TextLinesPipe } from './pipes/text-lines.pipe';
import {RouteFilePipe} from "./pipes/route-file.pipe";

@NgModule({
    declarations: [LoginComponent, StartPageComponent, TextLinesPipe, RouteFilePipe],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule,
    ],
    exports: [
        LoginComponent,
        StartPageComponent,
        TextLinesPipe,
        RouteFilePipe,
    ]
})
export class SharedModule {
}
