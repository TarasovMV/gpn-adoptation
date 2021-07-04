import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {appConfigInit, AppConfigService} from "./services/platform/app-config.service";
import {AuthenticationInterceptor} from "./interceptors/authentication.interceptor";
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {AngularSvgIconModule} from "angular-svg-icon";
import {CacheInterceptor} from "./interceptors/cache.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        AngularSvgIconModule.forRoot(),
        BrowserAnimationsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor,  multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor,  multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: APP_INITIALIZER, useFactory: appConfigInit, deps: [AppConfigService], multi: true },
        BrowserAnimationsModule,
    ]
})
export class CoreModule {
}
