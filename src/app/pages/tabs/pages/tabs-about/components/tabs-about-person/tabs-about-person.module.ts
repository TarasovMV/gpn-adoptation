import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsAboutPersonComponent } from './tabs-about-person.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TabsAboutPageModule } from '../../tabs-about.module';
import { TabsAboutLeadershipCardComponent } from '../tabs-about-leadership-card/tabs-about-leadership-card.component';
import {SharedModule} from "../../../../../../shared/shared.module";


@NgModule({
  declarations: [TabsAboutPersonComponent, TabsAboutLeadershipCardComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AngularSvgIconModule,
        SharedModule,
    ],
  exports: [
    TabsAboutLeadershipCardComponent
  ]
})
export class TabsAboutPersonModule { }
