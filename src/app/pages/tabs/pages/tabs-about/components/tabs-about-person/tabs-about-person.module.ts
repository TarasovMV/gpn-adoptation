import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsAboutPersonComponent } from './tabs-about-person.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TabsAboutPageModule } from '../../tabs-about.module';
import { TabsAboutLeadershipCardComponent } from '../tabs-about-leadership-card/tabs-about-leadership-card.component';


@NgModule({
  declarations: [TabsAboutPersonComponent, TabsAboutLeadershipCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule,
  ],
  exports: [
    TabsAboutLeadershipCardComponent
  ]
})
export class TabsAboutPersonModule { }
