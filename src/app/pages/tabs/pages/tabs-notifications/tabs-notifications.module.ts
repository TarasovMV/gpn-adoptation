import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsNotificationsPageRoutingModule } from './tabs-notifications-routing.module';

import { TabsNotificationsPage } from './tabs-notifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsNotificationsPageRoutingModule
  ],
  declarations: [TabsNotificationsPage]
})
export class TabsNotificationsPageModule {}
