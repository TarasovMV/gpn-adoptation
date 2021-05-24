import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsNewsPageRoutingModule } from './tabs-news-routing.module';

import { TabsNewsPage } from './tabs-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsNewsPageRoutingModule
  ],
  declarations: [TabsNewsPage]
})
export class TabsNewsPageModule {}
