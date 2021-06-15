import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from "@ionic/angular";
import { LoginComponent } from '../pages/login/login.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthPageComponent } from '../pages/auth-page/auth-page.component';
import { StartPageComponent } from '../pages/start-page/start-page.component';
import { TextLinesPipe } from './pipes/text-lines.pipe';

@NgModule({
    declarations: [LoginComponent, AuthPageComponent, StartPageComponent, TextLinesPipe],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule,
    ],
    exports: [
        LoginComponent,
        AuthPageComponent,
        StartPageComponent,
        TextLinesPipe
    ]
})
export class SharedModule {
}
