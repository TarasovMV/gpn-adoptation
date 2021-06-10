import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsNewsPageRoutingModule } from './tabs-news-routing.module';

import { TabsNewsPage } from './tabs-news.page';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsNewsPageRoutingModule,
    AngularSvgIconModule
  ],
  declarations: [TabsNewsPage]
})
export class TabsNewsPageModule {}
