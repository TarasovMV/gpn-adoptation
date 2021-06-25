import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsOfflinePageRoutingModule } from './tabs-offline-routing.module';

import { TabsOfflinePage } from './tabs-offline.page';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TabsOfflineSearchComponent } from './tabs-offline-search/tabs-offline-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsOfflinePageRoutingModule,
    AngularSvgIconModule,
    ReactiveFormsModule
  ],
  declarations: [TabsOfflinePage, TabsOfflineSearchComponent],
  exports: [TabsOfflineSearchComponent]
})
export class TabsOfflinePageModule {}
