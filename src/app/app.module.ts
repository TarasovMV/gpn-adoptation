import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from "./core/core.module";
import {HttpClientModule} from "@angular/common/http";
import {AppVersion} from "@ionic-native/app-version/ngx";
import {TabsPage} from "./pages/tabs/tabs.page";
import {MyThemeService} from "./core/services/platform/my-theme-service.service";


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CoreModule, HttpClientModule],
    providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, AppVersion, TabsPage, MyThemeService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
