import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsOfflinePageRoutingModule } from './tabs-offline-routing.module';

import { TabsOfflinePage } from './tabs-offline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsOfflinePageRoutingModule
  ],
  declarations: [TabsOfflinePage]
})
export class TabsOfflinePageModule {}
