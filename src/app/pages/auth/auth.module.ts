import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AuthPageRoutingModule} from './auth-routing.module';

import {AuthPage} from './auth.page';
import {AngularSvgIconModule} from "angular-svg-icon";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AuthPageRoutingModule,
        AngularSvgIconModule,
        ReactiveFormsModule,
    ],
    declarations: [AuthPage]
})
export class AuthPageModule {
}
