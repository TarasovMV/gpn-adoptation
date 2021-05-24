import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsTestsPageRoutingModule } from './tabs-tests-routing.module';

import { TabsTestsPage } from './tabs-tests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsTestsPageRoutingModule
  ],
  declarations: [TabsTestsPage]
})
export class TabsTestsPageModule {}
