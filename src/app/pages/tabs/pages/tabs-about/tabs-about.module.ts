import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsAboutPageRoutingModule } from './tabs-about-routing.module';

import { TabsAboutPage } from './tabs-about.page';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TabsAboutLeadershipComponent } from './components/tabs-about-leadership/tabs-about-leadership.component';
import { TabsAboutLeadershipCardComponent } from './components/tabs-about-leadership-card/tabs-about-leadership-card.component';
import { TabsAboutPersonModule } from './components/tabs-about-person/tabs-about-person.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule,
    TabsAboutPersonModule,
    TabsAboutPageRoutingModule
  ],
  declarations: [
    TabsAboutPage,
    TabsAboutLeadershipComponent,
  ],
  exports: [
    TabsAboutLeadershipCardComponent
  ]
})
export class TabsAboutPageModule { }
