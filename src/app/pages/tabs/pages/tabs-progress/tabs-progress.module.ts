import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsProgressPageRoutingModule } from './tabs-progress-routing.module';

import { TabsProgressPage } from './tabs-progress.page';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsProgressPageRoutingModule,
    AngularSvgIconModule,
  ],
  declarations: [TabsProgressPage],
})
export class TabsProgressPageModule {}
