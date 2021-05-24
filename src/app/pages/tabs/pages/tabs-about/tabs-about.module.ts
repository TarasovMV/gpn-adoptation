import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsAboutPageRoutingModule } from './tabs-about-routing.module';

import { TabsAboutPage } from './tabs-about.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsAboutPageRoutingModule
  ],
  declarations: [TabsAboutPage]
})
export class TabsAboutPageModule {}
