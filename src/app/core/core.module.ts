import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {appConfigInit, AppConfigService} from "./services/platform/app-config.service";
import {AuthenticationInterceptor} from "./interceptors/authentication.interceptor";
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {AngularSvgIconModule} from "angular-svg-icon";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        AngularSvgIconModule.forRoot(),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor,  multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: APP_INITIALIZER, useFactory: appConfigInit, deps: [AppConfigService], multi: true },
    ]
})
export class CoreModule {
}
