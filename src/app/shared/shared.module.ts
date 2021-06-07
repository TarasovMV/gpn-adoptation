import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from "@ionic/angular";
import { LoginComponent } from '../pages/login/login.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthPageComponent } from '../pages/auth-page/auth-page.component';
import { StartPageComponent } from '../pages/start-page/start-page.component';

@NgModule({
    declarations: [LoginComponent, AuthPageComponent, StartPageComponent],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule,
    ],
    exports: [
        LoginComponent,
        AuthPageComponent,
        StartPageComponent
    ]
})
export class SharedModule {
}
