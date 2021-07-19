import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsProgressPageRoutingModule } from './tabs-progress-routing.module';

import { TabsProgressPage } from './tabs-progress.page';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { InfoPopupComponent } from 'src/app/shared/components/info-popup/info-popup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsProgressPageRoutingModule,
    AngularSvgIconModule,
  ],
  declarations: [TabsProgressPage, InfoPopupComponent],
})
export class TabsProgressPageModule {}
