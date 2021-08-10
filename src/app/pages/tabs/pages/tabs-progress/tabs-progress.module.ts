import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsProgressPageRoutingModule } from './tabs-progress-routing.module';

import { TabsProgressPage } from './tabs-progress.page';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { InfoPopupComponent } from 'src/app/shared/components/info-popup/info-popup.component';
import { InfoPopupStagesComponent } from 'src/app/shared/components/info-popup-stages/info-popup-stages.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsProgressPageRoutingModule,
    AngularSvgIconModule,
    SharedModule
  ],
  declarations: [TabsProgressPage, InfoPopupComponent, InfoPopupStagesComponent],
})
export class TabsProgressPageModule {}
