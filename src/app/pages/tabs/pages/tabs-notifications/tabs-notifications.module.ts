import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsNotificationsPageRoutingModule } from './tabs-notifications-routing.module';

import { TabsNotificationsPage } from './tabs-notifications.page';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsNotificationsPageRoutingModule,
    AngularSvgIconModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  declarations: [TabsNotificationsPage]
})
export class TabsNotificationsPageModule {}
