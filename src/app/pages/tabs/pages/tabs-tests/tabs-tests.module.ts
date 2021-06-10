import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsTestsPageRoutingModule } from './tabs-tests-routing.module';

import { TabsTestsPage } from './tabs-tests.page';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule,
    TabsTestsPageRoutingModule
  ],
  declarations: [TabsTestsPage]
})
export class TabsTestsPageModule {}
